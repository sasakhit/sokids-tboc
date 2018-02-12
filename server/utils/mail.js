const sgMail = require('@sendgrid/mail');
const env = require('../env/mail_env'); 

sgMail.setApiKey(`${env.apiKey}`);

function sendMail() {
  const msg = {
    to: 'hitoshi.1227.sasaki@gmail.com',
    from: 'hitoshi@ss.em-net.ne.jp',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail.send(msg);
}

module.exports = {
  sendMail
}
