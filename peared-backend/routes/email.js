const express = require('express');
const cors = require('cors');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
const { Event, Team, People } = require('../models/Event');

// this is a router file
const emailRouter = express.Router();



// sends signup email to user for ANYTHING
async function sendEmail(to, subject, htmlContent) {
    try {
        console.log('Sending email to:', to);
        //console.log("API Key:", process.env.BREVO_API_KEY);  // security risk so...
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
        return { success: true, data };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}
emailRouter.post('/cancelSignup', async (req, res) => {
    try {
        const {eventId, personId} = req.body;
        console.log('Cancelling signup for event:', eventId, 'and person:', personId);
        const event = await Event.findById(eventId);
        if (!event) {
            console.log("Event not found for ID:", eventId);
            return res.status(404).json({ error: 'Event not found' });
        }
        if (!event.teams || event.teams.length === 0) {
            console.log("No teams found for event ID:", eventId);
            return res.status(404).json({ error: 'Team not found' });
        }
        const team = event.teams.find(t => t.people.some(p => p._id.toString() === personId));
        if (!team) {
            console.log("Team not found for person ID:", personId);
            return res.status(404).json({ error: 'Team not found' });
        }
        const person = team.people.find(p => p._id.toString() === personId);
        team.people = team.people.filter(p => p._id.toString() !== personId);
        await event.save();
        console.log("Signup cancelled for person ID:", personId);
        
        const emailResult = await sendEmail(
            person.email,
            'Signup Cancelled',
            `<p>Dear ${person.firstName},</p>
            <p>Your signup for the event has been successfully cancelled.</p>
            <p>Thank you for your understanding.</p>
            <p>Best regards,</p>
            <p>Peared Team</p>`
        );
        
        if (!emailResult.success) {
            console.error('Error sending cancellation email:', emailResult.error);
        }
        
        res.status(200).json({ message: 'Signup cancelled successfully' });
    } catch (error) {
        console.error('Error sending cancel email', error);
        res.status(500).json({ error: 'Failed to cancel signup' });
    }
});


// Export the email router
module.exports = emailRouter;