import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiHeart } from 'react-icons/fi';
import useSEO from '../hooks/useSEO';

const TEAM = [
  { name: 'Kingsley Agbedun', role: 'Founder & CEO', initials: 'KA', bio: '15+ years in renewable energy across West Africa.' },
];

const STATS = [
  { value: '2020', label: 'Founded' },
  { value: '5,000+', label: 'Happy Customers' },
  { value: '36', label: 'States Covered' },
  { value: '98%', label: 'Satisfaction Rate' },
];

const VALUES = [
  { icon: FiTarget, title: 'Mission',   desc: 'To make clean solar energy accessible and affordable for every Nigerian home and business, reducing dependence on fossil fuels.' },
  { icon: FiEye,    title: 'Vision',    desc: 'A Nigeria powered entirely by renewable energy — where no family or business is left in the dark.' },
  { icon: FiHeart,  title: 'Values',    desc: 'Integrity in every deal. Quality in every product. Excellence in every installation. Community in every customer.' },
];

export default function About() {
  useSEO({
    title: 'About Us – Our Story, Mission & Team | GreenPaWa Nigeria',
    description: 'Learn about GreenPaWa, Nigeria\'s leading solar energy company. Founded in 2020, we\'ve served 5,000+ customers across all 36 states with clean, reliable solar power.',
  });
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-green-dark py-16 text-center px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">About GreenPaWa</h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          Powering a greener, brighter Nigeria — one solar panel at a time.
        </p>
      </div>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            GreenPaWa was founded in 2025 with a simple mission: to give every Nigerian reliable power. We started in a small office in Lagos with just three engineers and a big dream. Today, we are Nigeria's fastest-growing solar energy company, having installed systems in over 5,000 homes and 500+ businesses across all 36 states.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            We understand the frustration of generator noise, diesel costs, and NEPA's unreliability. That's why we built GreenPaWa — to offer a clean, silent, and cost-effective alternative. Our platform brings together the best solar products in the world and delivers them to your doorstep with professional installation.
          </p>
          <p className="text-gray-600 leading-relaxed">
            From a Lagos family home to a Port Harcourt factory floor, GreenPaWa has the right solar solution for every load size and budget. Join the solar revolution today.
          </p>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">What Drives Us</h2>
          <p className="text-gray-500 mb-12">The principles behind everything we do</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v) => (
              <motion.div
                key={v.title}
                whileHover={{ y: -4 }}
                className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100"
              >
                <div className="w-14 h-14 bg-green-dark rounded-xl flex items-center justify-center mx-auto mb-4">
                  <v.icon className="text-yellow-accent text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-dark py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-extrabold text-yellow-accent">{s.value}</p>
                <p className="text-white/70 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Meet the Team</h2>
          <p className="text-gray-500 mb-12">The people behind Nigeria's solar revolution</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((m) => (
              <motion.div
                key={m.name}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-green-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-yellow-accent font-bold text-lg">{m.initials}</span>
                </div>
                <h3 className="font-bold text-gray-800">{m.name}</h3>
                <p className="text-green-mid text-sm font-medium mb-2">{m.role}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{m.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug mb-4">
            "Solar energy isn't just about electricity. It's about freedom — freedom from NEPA, freedom from diesel, freedom to grow."
          </blockquote>
          <p className="text-green-mid font-semibold">— Kingsley Agbedun, Founder & CEO, GreenPaWa</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-yellow-accent text-center">
        <h2 className="text-3xl font-bold text-green-dark mb-3">Join the GreenPaWa Family</h2>
        <p className="text-green-dark/70 mb-8">Thousands of Nigerians already enjoy stable power. Your turn.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/products" className="bg-green-dark text-white font-bold px-8 py-4 rounded-xl hover:bg-green-mid transition-colors">
            Shop Products
          </Link>
          <Link to="/contact" className="bg-white text-green-dark font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
