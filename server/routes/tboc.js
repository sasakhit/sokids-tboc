var express = require('express');
var router = express.Router();

const db = require('../utils/tboc_db')
db.connect()

const mail = require('../utils/mail')

router.get('/api/signup', (req, res) => {
    const userid = req.query.userid
    const passwd = req.query.passwd
    const fullname = req.query.fullname
    const kananame = req.query.kananame
    const phone = req.query.phone
    const postal = req.query.postal
    const address = req.query.address
    const comment = req.query.comment

    if (userid === '' || passwd === '' || fullname === '' || kananame === '' || phone === '' || postal === '' || address === '') {
      return res.json({status: false, msg: 'Please input all the required fields'})
    }

    db.getUser(userid, (user) => {
      if (user) {
        return res.json({status: false, msg: 'The userid already exists'})
      }

      db.addUser(userid, passwd, fullname, kananame, phone, postal, address, comment, (token) => {
        if (!token) {
          res.json({status: false, msg: 'DB error'})
        }
        mail.sendMail()
        res.json({status: true, token})
      })
    })
  })

  router.get('/api/login', (req, res) => {
    const userid = req.query.userid
    const passwd = req.query.passwd
    db.login(userid, passwd, (err, token) => {
      if (err) {
        res.json({status: false, msg: 'Authentication error'})
        return
      }

      res.json({status: true, token})
    })
  })

  router.get('/api/get_user', (req, res) => {
    const userid = req.query.userid
    db.getUser(userid, (user) => {
      if (!user) return res.json({status: false})
      res.json({status: true, user: user})
    })
  })

  router.get('/api/get_allusers', (req, res) => {
    db.getAllUsers((users) => {
      if (!users) return res.json({status: false})
      res.json({status: true, users: users})
    })
  })

  router.get('/api/add_challenge', (req, res) => {
    const userid = req.query.userid
    const token = req.query.token
    const challenge = req.query.challenge

    if (challenge.nameofchallenge === '' || challenge.dateofchallenge === '' || challenge.paymentmethod === '' || challenge.receipt === '') {
      return res.json({status: false, msg: 'Please input all the required fields'})
    }

    db.checkToken(userid, token, (err, user) => {
      if (err) {
        res.json({status: false, msg: 'Authentication Error'})
        return
      }

      user.challenges.push(challenge)
      db.updateUser(user, (err) => {
        if (err) {
          res.json({status: false, msg: 'DB Error'})
          return
        }
        res.json({status: true})
      })
    })
  })

module.exports = router;