const mongoose = require('mongoose');
const env = require('../env/tboc_db_env'); 
mongoose.Promise = global.Promise;

//const mongoUri = `mongodb://${env.dbName}:${env.key}@${env.dbName}.documents.azure.com:${env.cosmosPort}/?ssl=true`;
const mongoUri = `mongodb://127.0.0.1/${env.dbName}`;

function connect() {
  return mongoose.connect(mongoUri, { useMongoClient: true });
}

const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
  nameofchallenge: String,
  dateofchallenge: Date,
  paymentmethod: String,
  receipt: String,
  comment: String
}, {minimize: false})

const UserSchema = new Schema({
  userid: String,
  hash: String,
  token: String,
  fullname: String,
  kananame: String,
  phone: String,
  postal: String,
  address: String,
  comment: String,
  challenges: [ChallengeSchema]
}, {minimize: false});
const User = mongoose.model('User', UserSchema);

function getHash (pw) {
  const salt = '2DSdsLoJoypDjO:7!'
  const crypto = require('crypto')
  const hashsum = crypto.createHash('sha512')
  hashsum.update(pw + salt)
  return hashsum.digest('hex')
}

function getAuthToken (userid) {
  const time = (new Date()).getTime()
  return getHash(`${userid}:${time}`)
}

function getAllUsers (callback) {
  User.find({}, (err, users) => {
    if (err || users === null) return callback(null)
    callback(users)
  })
}

function getUser (userid, callback) {
  User.findOne({userid}, (err, user) => {
    if (err || user === null) return callback(null)
    callback(user)
  })

  /*
  User.findOne({userid})
    .then(user => {
      if (user === null) return callback(null)
      callback(user)
    })
    .catch(err => {
      callback(null)
    });
  */
}

function addUser (userid, passwd, fullname, kananame, phone, postal, address, comment, callback) {
  const hash = getHash(passwd)
  const token = getAuthToken(userid)
  const challenges = {}

  const user = new User({userid, hash, token, fullname, kananame, phone, postal, address, comment, challenges})
  user.save((err) => {
    if (err) return callback(null)
    callback(token)
  })

  /*
  user
    .save()
    .then(() => {
      callback(token)
    })
    .catch(err => {
      callback(null)
    });
  */
}

function login (userid, passwd, callback) {
  const hash = getHash(passwd)
  const token = getAuthToken(userid)

  getUser(userid, (user) => {
    if (!user || user.hash !== hash) {
      return callback(new Error('Authentication Error'), null)
    }

    user.token = token
    updateUser(user, (err) => {
      if (err) return callback(err, null)
      callback(null, token)
    })
  })
}

function checkToken (userid, token, callback) {
  getUser(userid, (user) => {
    if (!user || user.token !== token) {
      return callback(new Error('Authentication Failure'), null)
    }
    callback(null, user)
  })
}

function updateUser (user, callback) {
  User.update({userid: user.userid}, user, {}, (err, n) => {
    if (err) return callback(err, null)
    callback(null)
  })

  /*
  const userid = user.userid
  const hash = user.hash
  const token = user.token
  const friends = user.friends

  User.findOne({userid})
    .then(user => {
      user.hash = hash;
      user.token = token;
      user.friends = friends;
      user.save().then(callback(null));
    })
    .catch(err => {
      callback(err, null)
    });
  */
}

module.exports = {
  User, connect, getUser, getAllUsers, addUser, login, checkToken, updateUser
}
