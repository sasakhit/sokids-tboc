const mongoose = require('mongoose');
const env = require('../env/tboc_db_env'); 
mongoose.Promise = global.Promise;

//const mongoUri = `mongodb://${env.dbName}:${env.key}@${env.dbName}.documents.azure.com:${env.cosmosPort}/?ssl=true`;
//uri: 'mongodb://<cosmosdb-name>:<primary_master_key>@<cosmosdb-name>.documents.azure.com:10255/mean-dev?ssl=true&sslverifycertificate=false'
const mongoUri = `mongodb://127.0.0.1/${env.dbName}`;

function connect() {
  return mongoose.connect(mongoUri, { useMongoClient: true });
}

const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
  registrationdate: Date, //new
  challengename: String,
  challengedate: Date,
  paymentmethod: String,
  receipt: String,
  receiptdate: Date,
  receiptuser: String, //new
  //receiptmethod: String,
  amount: Number, //new
  deliverydate: Date,
  deliverymethod: String,
  deliveryuser: String,
  collectiondate: Date, //new
  collectionuser: String, //new
  strapdeliverydate: Date, //new
  strapdeliveryuser: String, //new
  certno: String, //new
  certdeliverydate: Date, //new
  certdeliveryuser: String, //new
  comment: String,
  comment_sok: String //new
}, {minimize: false})

const UserSchema = new Schema({
  userid: String,
  hash: String,
  token: String,
  lastname: String,
  firstname: String,
  lastname_kana: String,
  firstname_kana: String,
  phone: String,
  postal: String,
  address: String,
  //comment: String,
  signupdate: Date, //new
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
}

function getUserById (_id, callback) {
  User.findOne({_id}, (err, user) => {
    if (err || user === null) return callback(null)
    callback(user)
  })
}

function addUser (userid, passwd, lastname, firstname, lastname_kana, firstname_kana, phone, postal, address, signupdate, callback) {
  const hash = getHash(passwd)
  const token = getAuthToken(userid)

  const user = new User({userid, hash, token, lastname, firstname, lastname_kana, firstname_kana, phone, postal, address, signupdate})
  user.save((err) => {
    if (err) return callback(null)
    callback(token)
  })
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
      return callback(new Error('Authentication Error'), null)
    }
    callback(null, user)
  })
}

function updateUser (user, callback) {
  if (user.passwd) user.hash = getHash(user.passwd)

  User.update({_id: user._id}, user, {}, (err, n) => {
    if (err) return callback(err, null)
    callback(null)
  })
}

module.exports = {
  User, connect, getUser, getUserById, getAllUsers, addUser, login, checkToken, updateUser
}
