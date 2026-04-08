import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTool, FiRefreshCw, FiPhone, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import useSEO from '../hooks/useSEO';

const SERVICES = [
  {
    icon: FiTool,
    title: 'Solar Installation',
    price: 'From ₦50,000',
    gradient: 'from-green-dark to-green-mid',
    features: [
      'On-site energy audit',
      'System design & sizing',
      'Professional installation',
      'Grid connection & commissioning',
      '1-year installation warranty',
      'Post-install testing & training',
    ],
    desc: 'End-to-end installation of residential and commercial solar systems across Nigeria.',
  },
  {
    icon: FiRefreshCw,
    title: 'Maintenance & Repair',
    price: 'From ₦15,000',
    gradient: 'from-blue-600 to-blue-400',
    features: [
      'Quarterly system inspection',
      'Panel cleaning & optimization',
      'Battery health checks',
      'Inverter firmware updates',
      'Fault diagnosis & repair',
      'Performance reporting',
    ],
    desc: 'Keep your solar system running at peak performance with our scheduled maintenance plans.',
  },
  {
    icon: FiPhone,
    title: 'Free Consultation',
    price: 'No charge',
    gradient: 'from-yellow-500 to-orange-400',
    features: [
      'Energy needs assessment',
      'Budget planning',
      'ROI calculation',
      'Product recommendations',
      'Financing options',
      'Site visit (Lagos & Abuja)',
    ],
    desc: 'Not sure where to start? Our experts will guide you to the perfect solar solution.',
  },
];

const WHY = [
  { icon: '🏆', title: 'Certified Engineers',    desc: 'All our technicians are NAFDAC and NEMSA certified professionals.' },
  { icon: '⚡', title: 'Fast Turnaround',         desc: 'Most residential installations are completed within 1–3 business days.' },
  { icon: '🛡️', title: 'Quality Guarantee',       desc: 'Every installation backed by our 1-year workmanship warranty.' },
  { icon: '📍', title: 'Nationwide Coverage',     desc: 'We operate in Lagos, Abuja, Port Harcourt, Kano, and 30+ cities.' },
];

const PROCESS = [
  { num: '1', title: 'Book Consultation',  desc: 'Contact us online or by phone to schedule a free consultation.' },
  { num: '2', title: 'Site Assessment',    desc: 'Our engineer visits your property to assess roof space and load.' },
  { num: '3', title: 'Receive Proposal',   desc: 'Get a detailed quote with system specs, timeline, and pricing.' },
  { num: '4', title: 'Installation Day',   desc: 'Our team arrives on time and completes the job professionally.' },
  { num: '5', title: 'Commissioning',      desc: 'We test everything, hand over manuals, and provide user training.' },
];

export default function Services() {
  useSEO({
    title: 'Solar Installation Services – Consultation, Installation & Maintenance | GreenPaWa',
    description: 'Expert solar installation, maintenance and consultation services across Nigeria. NEMSA-certified engineers, 1-year warranty, nationwide coverage in 30+ cities.',
  });
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-green-dark py-16 text-center px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Our Services</h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          From consultation to installation and beyond — we are with you every step of the way.
        </p>
      </div>

      {/* Services Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((s) => (
            <motion.div
              key={s.title}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className={`bg-gradient-to-br ${s.gradient} p-8 text-white text-center`}>
                <s.icon className="text-5xl mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-1">{s.title}</h3>
                <span className="text-white/80 text-sm font-medium">{s.price}</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-gray-500 text-sm mb-5">{s.desc}</p>
                <ul className="space-y-2.5 flex-1">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                      <FiCheckCircle className="text-green-light shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-6 w-full py-3 bg-green-dark hover:bg-green-mid text-white font-semibold rounded-xl text-sm text-center transition-colors flex items-center justify-center gap-2"
                >
                  Get Started <FiArrowRight />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Why Choose Us</h2>
          <p className="text-gray-500 mb-12">What sets GreenPaWa apart from the rest</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.map((w) => (
              <div key={w.title} className="p-6 bg-gray-50 rounded-2xl text-center">
                <div className="text-4xl mb-3">{w.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{w.title}</h3>
                <p className="text-gray-500 text-sm">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">Installation Process</h2>
          <p className="text-gray-500 text-center mb-12">Simple and transparent — no surprises</p>
          <div className="space-y-4">
            {PROCESS.map((p) => (
              <div key={p.num} className="flex items-start gap-5 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-green-dark text-yellow-accent font-extrabold text-lg rounded-xl flex items-center justify-center shrink-0">
                  {p.num}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{p.title}</h4>
                  <p className="text-gray-500 text-sm mt-1">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-green-dark text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Ready to Get Started?</h2>
        <p className="text-white/60 mb-8">Book a free consultation with our solar experts today.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/contact" className="btn-primary">Get Free Consultation</Link>
          <Link to="/calculator" className="btn-outline">Calculate Savings</Link>
        </div>
      </section>
    </div>
  );
}
