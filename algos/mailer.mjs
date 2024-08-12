import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: '',
    port: 587,
    // secure: true,
    auth: {
        user: '',
        pass: ''
    }
});

export async function mailer(html) {
    let mailOptions = {
        from: '', // Sender address
        to: '',
        subject: 'One Time Password',
        html: html
    };

    // Send email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            // console.log('Email sent: ' + info.response);
            console.log(`Message Sent : ${info.messageId}`);

            // Preview Only when sending through an Ethereal account
            // console.log(`Preview URL ${nodemailer.getTestMessageUrl(info)}`);
        }
    });
};
