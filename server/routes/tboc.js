var express = require('express');
var router = express.Router();

const db = require('../utils/tboc_db')
db.connect()

const mail = require('../utils/mail')

router.get('/api/signup', (req, res) => {
    const userid = req.query.userid
    const passwd = req.query.passwd
    const lastname = req.query.lastname
    const firstname = req.query.firstname
    const lastname_kana = req.query.lastname_kana
    const firstname_kana = req.query.firstname_kana
    const phone = req.query.phone
    const postal = req.query.postal
    const address = req.query.address
    const comment = req.query.comment
    const signupdate = req.query.signupdate

    if (userid === '' || passwd === '' || lastname === '' || firstname === '' || lastname_kana === '' || firstname_kana === ''
        || phone === '' || postal === '' || address === '') {
      return res.json({status: false, msg: 'Please input all the required fields'})
    }

    db.getUser(userid, (user) => {
      if (user) {
        return res.json({status: false, msg: 'The userid already exists'})
      }

      db.addUser(userid, passwd, lastname, firstname, lastname_kana, firstname_kana, phone, postal, address, comment, signupdate, (token) => {
        if (!token) {
          res.json({status: false, msg: 'DB Error'})
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
        res.json({status: false, msg: 'Authentication Error'})
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

    if (challenge.challengename === '' || challenge.challengedate === '' || challenge.paymentmethod === '' || challenge.receipt === '') {
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

  router.get('/api/update_user_challenge', (req, res) => {
    //const userid = req.query.userid
    //const token = req.query.token
    const _user = req.query.user
    const _challenge = req.query.challenge
    const _keys = req.query.keys
    let exists = false

    /*
    if (userid === '' || passwd === '' || fullname === '' || kananame === '' || phone === '' || postal === '' || address === '') {
      return res.json({status: false, msg: 'Please input all the required fields'})
    }
    */

  // ToDo: Need to support password change

   //db.checkToken(userid, token, (err, user) => {
   // if (err) {
   //   res.json({status: false, msg: 'Authentication Error'})
   //   return
   // }
    db.getUserById(_user._id, (user) => { 
      db.getUser(_user.userid, (newuser) => {
        if ((_user.userid !== user.userid) && (newuser)) return res.json({status: false, msg: 'The userid already exists'})
   
        if (_keys.user) _keys.user.forEach(key =>
          user[key] = _user[key]
        )

        if (_keys.challenge) _keys.challenge.forEach(key =>
          user.challenges.filter(challenge => challenge._id == _challenge._id)[0][key] = _challenge[key]
        )
        db.updateUser(user, (err) => {
          if (err) {
            res.json({status: false, msg: 'DB Error'})
            return
          }
          res.json({status: true, user: user})
        })
      })
    })
  })

module.exports = router