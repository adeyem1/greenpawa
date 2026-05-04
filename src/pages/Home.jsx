import { useState, useEffect, useRef } from 'react';
import useSEO from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSun, FiZap, FiBattery, FiShield, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

function Counter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const FEATURES = [
  { icon: FiSun,    title: 'Premium Quality',    desc: 'Only certified, tier-1 solar products from globally recognized manufacturers.' },
  { icon: FiZap,    title: 'Expert Installation', desc: 'Our certified engineers handle every installation with precision and care.' },
  { icon: FiBattery,title: 'After-Sales Support', desc: '24/7 technical support and maintenance service for all products.' },
  { icon: FiShield, title: 'Warranty Assured',    desc: 'Comprehensive warranty coverage on all products and installation work.' },
];

const STEPS = [
  { step: '01', title: 'Consultation',   desc: 'We assess your energy needs and recommend the right system size.' },
  { step: '02', title: 'Proposal',       desc: 'Receive a detailed quote with product specs and installation timeline.' },
  { step: '03', title: 'Installation',   desc: 'Our team installs your system professionally within 1–3 days.' },
];

const TESTIMONIALS = [
  { name: 'Chukwuemeka Obi',    role: 'Business Owner, Ikeja',      text: 'GreenPaWa transformed my business. I now run 24/7 with zero NEPA dependency. Best investment I ever made.', rating: 5 },
  { name: 'Fatima Abubakar',    role: 'Homeowner, Abuja',           text: 'Excellent service from consultation to installation. My electricity bill dropped by 90%. Highly recommend!', rating: 5 },
  { name: 'Tunde Adeyemi',      role: 'Factory Manager, Ibadan',    text: 'We installed a 50kW system and our production never stops. GreenPaWa team is professional and responsive.', rating: 5 },
];

export default function Home() {
  useSEO({
    title: 'GreenPaWa – Nigeria\'s #1 Solar Energy Solutions | Inverters, Batteries & Panels',
    description: 'GreenPaWa delivers premium solar inverters, lithium batteries, and solar panels with expert installation across Nigeria. Get a free consultation today.',
  });
  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="hero-bg min-h-screen flex items-center relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-1/4 right-10 w-80 h-80 bg-yellow-accent/10 rounded-full solar-ray" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-green-light/10 rounded-full solar-ray" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-10 left-1/3 w-40 h-40 bg-white/5 rounded-full solar-ray" style={{ animationDelay: '0.7s' }} />

        {/* Animated sun */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-20 pointer-events-none hidden lg:block">
          <div className="w-[500px] h-[500px] border-4 border-yellow-accent/40 rounded-full animate-rotateSun flex items-center justify-center">
            <div className="w-80 h-80 border-4 border-yellow-accent/30 rounded-full flex items-center justify-center">
              <div className="w-48 h-48 bg-yellow-accent/20 rounded-full animate-pulseGlow" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
<h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                Power Your World With{' '}
                <span className="gradient-text">Clean Solar</span>{' '}
                Energy
              </h1>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10">
                Say goodbye to NEPA interruptions. GreenPaWa delivers premium inverters, batteries and solar panels with expert installation across Nigeria.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary flex items-center gap-2">
                  Get a Free Quote <FiArrowRight />
                </Link>
                <Link to="/calculator" className="btn-outline">
                  Calculate Savings
                </Link>
              </div>
            </motion.div>

            {/* Checklist */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12 flex flex-wrap gap-x-8 gap-y-3"
            >
              {['Free consultation', '1-year installation warranty', '24/7 support', 'Nationwide delivery'].map((t) => (
                <div key={t} className="flex items-center gap-2 text-white/70 text-sm">
                  <FiCheckCircle className="text-green-light shrink-0" /> {t}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 2500,  suffix: '+', label: 'Installations' },
              { value: 15,    suffix: '+', label: 'Years Experience' },
              { value: 98,    suffix: '%', label: 'Customer Satisfaction' },
              { value: 5000,  suffix: '+', label: 'Happy Customers' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-extrabold text-green-light">
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-gray-500 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY GREENPAWA ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="section-title">Why Choose GreenPaWa?</h2>
          <p className="section-subtitle">We are committed to delivering the best solar experience in Nigeria</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                whileHover={{ y: -4 }}
                className="card p-6 text-center"
              >
                <div className="w-14 h-14 bg-green-dark rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <f.icon className="text-2xl text-yellow-accent" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Get solar in 3 simple steps</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {STEPS.map((s, i) => (
              <div key={s.step} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200" />
                )}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-dark text-yellow-accent text-xl font-extrabold rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-green-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">What Our Customers Say</h2>
          <p className="text-white/60 text-lg mb-12">Trusted by thousands across Nigeria</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <motion.div key={t.name} whileHover={{ y: -4 }} className="glass rounded-2xl p-6 text-left">
                <div className="flex mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-accent text-lg">★</span>
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/50 text-xs">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-yellow-accent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-dark mb-4">
            Ready to Go Solar?
          </h2>
          <p className="text-green-dark/70 text-lg mb-8">
            Join 5,000+ Nigerians who are saving money and living free from power outages.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="bg-green-dark text-white font-bold px-8 py-4 rounded-xl hover:bg-green-mid transition-colors shadow-lg">
              Get a Free Quote
            </Link>
            <Link to="/services" className="bg-white text-green-dark font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors shadow">
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
