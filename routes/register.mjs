import express from 'express';
const signup = express.Router();

import cryptoJs from 'crypto-js';

// Secret key used for AES encryption (must match the client-side key)
const secretKey = 'your-secret-key'; // Use the same key as in client-side encryption

function decryptData(encryptedData) {
    try {
        // Decrypt the data using CryptoJS
        const bytes = cryptoJs.AES.decrypt(encryptedData, secretKey);
        const decrypted = bytes.toString(cryptoJs.enc.Utf8);
        return JSON.parse(decrypted); // Parse JSON after decryption
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Failed to decrypt data');
    }
}

signup.post('/', async (req, res) => {
    try {
        // Log the incoming request body for debugging
        console.log('Received request body:', req.body);

        // Assuming the encrypted data is sent as a JSON object with an "encryptedData" field
        const encryptedData = req.body.encryptedData;
        
        // Check if the encrypted data is valid
        if (!encryptedData) {
            return res.status(400).send('No encrypted data provided');
        }

        const decryptedData = decryptData(encryptedData);
        console.log('Decrypted data:', decryptedData);

        // Handle the decrypted data as needed
        res.send('Data processed successfully');
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default signup;
