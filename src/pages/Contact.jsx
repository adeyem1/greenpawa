import { useState } from 'react';
import useSEO from '../hooks/useSEO';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FiMail, FiPhone, FiMapPin, FiCheckCircle, FiChevronDown } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const API = import.meta.env.VITE_API_URL || '/api';
const WHATSAPP = 'https://wa.me/2348000000000?text=Hello%20GreenPaWa%2C%20I%20am%20interested%20in%20solar%20energy%20solutions.';

const CONTACT_INFO = [
  { icon: FiPhone,  title: 'Phone',    value: '+234 800 000 0000',           sub: 'Mon–Sat, 8am–6pm' },
  { icon: FiMail,   title: 'Email',    value: 'hello@greenpawa.com',         sub: 'We reply within 24 hours' },
  { icon: FiMapPin, title: 'Address',  value: '123 Solar Ave, Victoria Island', sub: 'Lagos, Nigeria' },
];

const FAQS = [
  { q: 'How long does installation take?',                       a: 'Most residential installations take 1–3 business days. Commercial projects may take up to 2 weeks.' },
  { q: 'Do you offer financing?',                                a: 'Yes! We partner with several banks and fintech companies to offer flexible payment plans with 0% interest for qualified customers.' },
  { q: 'What warranty do you offer?',                            a: 'Panels come with 25-year performance warranties. Inverters have 5–12 years. We offer a 1-year workmanship warranty on all installations.' },
  { q: 'Do you install outside Lagos?',                          a: 'Yes, we operate nationwide. We have installation teams in Lagos, Abuja, Port Harcourt, Ibadan, Kano, and 30+ other cities.' },
  { q: 'Can I add more panels or batteries later?',              a: 'Absolutely. All our systems are designed to be expandable. We can add capacity as your needs grow.' },
];

export default function Contact() {
  useSEO({
    title: 'Contact Us – Get a Free Solar Quote | GreenPaWa Nigeria',
    description: 'Contact GreenPaWa for a free solar consultation and quote. Reach us by phone, email, WhatsApp or visit our Lagos office. We respond within 24 hours.',
  });
  const [form, setForm]       = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      setSent(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      // still show success to avoid spam enumeration
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-green-dark py-16 text-center px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Get in Touch</h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          Have a question or ready to go solar? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CONTACT_INFO.map((c) => (
            <div key={c.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-green-dark rounded-xl flex items-center justify-center shrink-0">
                <c.icon className="text-yellow-accent text-xl" />
              </div>
              <div>
                <p className="font-bold text-gray-800">{c.title}</p>
                <p className="text-gray-700 text-sm mt-0.5">{c.value}</p>
                <p className="text-gray-400 text-xs mt-0.5">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Send a Message</h2>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <FiCheckCircle className="text-green-500 text-4xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm mb-6">We've received your message and will get back to you within 24 hours.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-green-dark underline text-sm"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'name',    label: 'Full Name *',    placeholder: 'John Doe',          required: true },
                      { name: 'email',   label: 'Email *',         placeholder: 'you@example.com',   required: true, type: 'email' },
                      { name: 'phone',   label: 'Phone Number',    placeholder: '+234 800 000 0000' },
                      { name: 'subject', label: 'Subject',         placeholder: 'Solar installation inquiry' },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                        <input
                          name={f.name}
                          type={f.type || 'text'}
                          value={form[f.name]}
                          onChange={handleChange}
                          required={f.required}
                          placeholder={f.placeholder}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-mid focus:ring-1 focus:ring-green-mid"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your energy needs…"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-mid focus:ring-1 focus:ring-green-mid resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3.5 bg-green-dark hover:bg-green-mid text-white font-bold rounded-xl transition-colors disabled:opacity-60"
                  >
                    {sending ? 'Sending…' : 'Send Message'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* WhatsApp + FAQ */}
          <div className="lg:col-span-2 space-y-6">
            {/* WhatsApp card */}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#128C7E] hover:bg-[#0f7669] rounded-2xl p-6 text-white transition-colors"
            >
              <FaWhatsapp className="text-5xl mb-3" />
              <h3 className="text-xl font-bold mb-1">Chat on WhatsApp</h3>
              <p className="text-white/80 text-sm mb-4">
                Get instant answers from our solar experts. Available Monday–Saturday, 8am–8pm.
              </p>
              <span className="inline-block bg-white text-[#128C7E] font-bold text-sm px-5 py-2.5 rounded-xl">
                Start Chat →
              </span>
            </a>

            {/* FAQ */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-2">
                {FAQS.map((faq, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <FiChevronDown className={`shrink-0 ml-2 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="px-4 pb-4 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
