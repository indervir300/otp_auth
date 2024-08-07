import { mailer } from './mailer.mjs'

export default async function otp_api() {
    const numericChars = '0123456789';
    const alphaChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let otp = '';

    // Generate random numerical numbers of length 3
    for (let i = 0; i < 3; i++) {
        otp += numericChars.charAt(Math.floor(Math.random() * numericChars.length));
    }

    // Generate random Alphabet Characters of length 3
    for (let i = 0; i < 3; i++) {
        otp += alphaChars.charAt(Math.floor(Math.random() * alphaChars.length));
    }

    // Calling the function of Shuffling the OTP String
    otp = await shuffleOtpString(otp);

    return otp;
}

async function shuffleOtpString(string) {
    // Split the String in Array
    let array = string.split('');
    let n = array.length;

    // Logic to shuffle the Array index
    for (let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }
    return array.join('');
}


// Calling the otp_api() function using Error Handling
(async () => {
    try {
        const security_code = await otp_api();

        // OTP Design for Email 
        const otpEmailHtml = `<!DOCTYPE html>
<html lang="en">
<head>              
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; background-color: #f5f5f5; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        h2 { color: #333; text-align: center; }
        p { color: #666; font-size: 16px; margin-bottom: 20px; }
        .otp { background-color: #007bff; color: #fff; text-align: center; font-size: 24px; padding: 10px; border-radius: 5px; margin-top: 20px; letter-spacing: 15px}
    </style>
</head>
<body>
    <div class="container">
        <h2> OTP Verification </h2>
        <p>Dear User,</p> <!--  <p>Your OTP for verification is </p> -->
        <div class="otp">${security_code}</div>
        <p>Please use this OTP to complete your Verification.</p>
        <p>If you did not request this OTP, please ignore this email.</p>
        <p>Regards,<br>Coder Bhaji</p>
    </div>
</body>
</html>`;

        await mailer(otpEmailHtml);

    } catch (error) {
        console.log(`An Error occured ${error}`);
    }
})();

// exports = otp_api;