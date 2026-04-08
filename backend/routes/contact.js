const express = require('express');
const router = express.Router();

// POST /api/contact
router.post('/', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ message: 'Name, email and message are required' });

  // Log to console — swap with nodemailer / SendGrid in production
  console.log('📩 New contact form submission:', { name, email, phone, subject, message });

  res.json({ message: 'Message received! We will get back to you within 24 hours.' });
});

module.exports = router;
