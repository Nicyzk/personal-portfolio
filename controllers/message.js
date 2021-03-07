const nodemailer = require('nodemailer')
const ejs = require('ejs')
const path = require('path')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nicyzk2@gmail.com',
        pass: 'Duckling123!'
    }
});

// 2 problems : 1) Error not becoming red. 2) no message on server error 

exports.sendMessage = (req, res, next) => {
    const msg = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        description: req.body.description
    }

    ejs.renderFile(path.join(__dirname, '..', 'views', 'email.ejs'), { msg }, (err, str) => {
        if (err) throw new Error("Oops...Server-side error. Please email me manually and I'll fix this ASAP :(")
        const mailOptions = {
            from: 'nicyzk2@gmail.com',
            to: ['nicyzk@gmail.com', msg.email],
            subject: 'Reference mail from portfolio website',
            text: 'Message',
            html: str
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) throw new Error("Oops...Server-side error. Please email me manually and I'll fix this ASAP :(")
            console.log('Email sent: ' + info.response);
            res.status(200).json({
                response: info.response
            })
        });
    })
}

