require('dotenv').config({ path: '../.env' });
const express    = require('express');
const cors       = require('cors');
const nodemailer = require('nodemailer');

const app  = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// ── Email transporter ──────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',   // true for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ── POST /api/contact ──────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message are required.' });
  }

  try {
    await transporter.sendMail({
      from:    `"GreenPaWa Contact" <${process.env.SMTP_USER}>`,
      to:      'Contact@greenpawa.com',
      replyTo: email,
      subject: subject || `New enquiry from ${name}`,
      html: `
        <h2 style="color:#1a5c38">New Contact Form Submission</h2>
        <table cellpadding="8" style="font-family:sans-serif;font-size:14px">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone || '—'}</td></tr>
          <tr><td><strong>Subject</strong></td><td>${subject || '—'}</td></tr>
        </table>
        <h3 style="color:#1a5c38;margin-top:16px">Message</h3>
        <p style="font-family:sans-serif;font-size:14px;white-space:pre-line">${message}</p>
      `,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('Mail error:', err.message);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
