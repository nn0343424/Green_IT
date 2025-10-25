// server/routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
// ✅ IMPORT THE NEW MODEL
const ContactMessage = require('../models/ContactMessage'); 

// --- Configuration ---
// IMPORTANT: Keep your Nodemailer setup here.
const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'nn0343424@gmail.com', 
        pass: 'xnngjksbxvghtiwd'
    }
});

// POST route for saving and sending contact form messages
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Variable to hold the newly created document
    let newContact;

    try {
        // 1. ✅ DATABASE SAVE OPERATION (Must succeed)
        newContact = new ContactMessage({ name, email, message });
        await newContact.save();
        
        console.log("Contact message saved to DB:", newContact);

    } catch (dbError) {
        // Handle database saving failure
        console.error("Error saving contact message to DB:", dbError);
        return res.status(500).json({ message: 'Failed to save message to database.', error: dbError.message });
    }

    // 2. EMAIL SENDING OPERATION (Separate try/catch)
    try {
        const mailOptions = {
            from: `"E-Waste Exchange Contact Form" <${email}>`, 
            
            // 🎯 THE FIX IS HERE: YOU MUST PROVIDE A RECIPIENT EMAIL ADDRESS
            to: 'nn0343424@gmail.com', // <--- REPLACE THIS WITH THE EMAIL YOU WANT TO RECEIVE MESSAGES
            
            subject: `New Contact Message from ${name} via E-Waste Exchange`,
            html: `
                <p><strong>Sender Name:</strong> ${name}</p>
                <p><strong>Sender Email:</strong> ${email}</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap; background-color: #f4f4f4; padding: 10px; border-radius: 5px;">${message}</p>
            `
        };
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully.");
    } catch (emailError) {
        // Log the failure but continue to success response
        console.error("❌ Warning: Email failed to send after successful DB save:", emailError);
    }
    
    // 3. SEND SUCCESS RESPONSE (If DB save succeeded)
    res.status(200).json({ 
        message: 'Message saved successfully! Email sending status: OK/Warning.',
        data: newContact
    });
});

module.exports = router;