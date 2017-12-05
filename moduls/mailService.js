/**
 * Created by haialaluf on 05/12/2017.
 */
const nodemailer = require('nodemailer');
const Settings = require('../config/settings.js');

module.exports = {
    send: (message, address) => {
        return new Promise((resolve, reject) => {

            if (Settings.env === 'prod') {
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: account.user, // generated ethereal user
                        pass: account.pass  // generated ethereal password
                    }
                });

                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"Server Service" <hai.alaluf@gmail.com>', // sender address
                    to: address, // list of receivers
                    subject: message.subject, // Subject line
                    text: message.message, // plain text body
                    html: message.html // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return reject(error)
                    }
                    resolve(info)
                });
            } else  {
                resolve('Success')
            }
        });
    }
}