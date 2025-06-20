const express = require('express');
const cors = require('cors');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
const { Event, Team, People } = require('./models/Event');

// this is a router file
const emailRouter = express.Router();

// sends signup email to user for ANYTHING
emailRouter.post('/send', async (req, res) => { 
    try {
        const {to, subject, htmlContent} = req.body;
        console.log('Sending email to:', to);
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                sender: {
                    name: 'Peared Team',
                    email: 'pearedco@gmail.com'
                },
                to: [
                    {
                        email: to,
                        name: 'Recipient'
                    }
                ],
                subject: subject,
                htmlContent: htmlContent
            })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }
        const data = await response.json();
        console.log('Email sent successfully:', data);
        res.status(200).json({ message: 'Email sent successfully', data });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
})