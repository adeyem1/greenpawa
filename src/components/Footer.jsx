import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP = 'https://wa.me/2349036089491';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src="/logo.png" alt="GreenPaWa" className="h-10 w-auto brightness-0 invert" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Nigeria's premier solar energy platform. Powering homes and businesses with clean, reliable solar solutions since 2020.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FiFacebook,  href: '#' },
                { icon: FiInstagram, href: '#' },
                { icon: FiTwitter,   href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 bg-white/10 hover:bg-yellow-accent hover:text-green-dark rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-white/40 mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/',           label: 'Home' },
                { to: '/products',   label: 'Products' },
                { to: '/services',   label: 'Services' },
                { to: '/calculator', label: 'Solar Calculator' },
                { to: '/about',      label: 'About Us' },
                { to: '/contact',    label: 'Contact' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/60 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-white/40 mb-4">Products</h3>
            <ul className="space-y-2.5">
              {['Hybrid Inverters', 'Lithium Batteries', 'Solar Panels', 'AGM Batteries', 'Three-Phase Inverters', 'Bifacial Panels'].map((p) => (
                <li key={p}>
                  <Link to="/products" className="text-white/60 hover:text-white text-sm transition-colors">
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-white/40 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <FiMapPin className="mt-0.5 shrink-0 text-yellow-accent" />
                <span>123 Solar Avenue, Victoria Island, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <FiPhone className="shrink-0 text-yellow-accent" />
                <span>+234 903 608 9491</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <FiMail className="shrink-0 text-yellow-accent" />
                <span>Contact@greenpawa.com</span>
              </li>
            </ul>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-[#128C7E] hover:bg-[#0f7669] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              <FaWhatsapp className="text-lg" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">© {year} GreenPaWa. All rights reserved.</p>
          <p className="text-white/40 text-sm">Go green, get power ☀️</p>
        </div>
      </div>
    </footer>
  );
}
