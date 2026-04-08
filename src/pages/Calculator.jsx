import { useState } from 'react';
import useSEO from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiZap, FiDollarSign, FiWind, FiArrowRight } from 'react-icons/fi';

const LOCATIONS = [
  { label: 'Lagos',         sunHours: 4.5 },
  { label: 'Abuja',         sunHours: 5.5 },
  { label: 'Kano',          sunHours: 6.5 },
  { label: 'Port Harcourt', sunHours: 4.0 },
  { label: 'Ibadan',        sunHours: 5.0 },
  { label: 'Enugu',         sunHours: 4.8 },
  { label: 'Kaduna',        sunHours: 6.0 },
  { label: 'Benin City',    sunHours: 4.2 },
];

const TARIFF = 225; // NGN per kWh (average Nigerian tariff)
const COST_PER_KW = 280_000; // NGN per kW installed
const PANEL_WATTAGE = 0.45; // kW per panel
const EFFICIENCY = 0.80;
const CO2_KG_PER_KWH = 0.43;

export default function Calculator() {
  useSEO({
    title: 'Solar Savings Calculator – How Much Can You Save? | GreenPaWa',
    description: 'Calculate your solar savings in Nigeria. Enter your monthly electricity bill and location to see your recommended system size, cost, payback period and CO₂ savings.',
  });
  const [form, setForm] = useState({
    monthlyBill: '',
    location: 'Lagos',
    roofType: 'pitched',
    systemType: 'hybrid',
  });
  const [result, setResult] = useState(null);
  const [calculating, setCalculating] = useState(false);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const calculate = async (e) => {
    e.preventDefault();
    setCalculating(true);
    // Simulated async delay for UX
    await new Promise((r) => setTimeout(r, 800));

    const monthlyBill  = parseFloat(form.monthlyBill);
    const location     = LOCATIONS.find((l) => l.label === form.location);
    const sunHours     = location?.sunHours || 5;

    const dailyKwh     = monthlyBill / TARIFF / 30;
    const systemKw     = dailyKwh / (sunHours * EFFICIENCY);
    const panels       = Math.ceil(systemKw / PANEL_WATTAGE);
    const systemCost   = Math.round(systemKw * COST_PER_KW);
    const annualSaving = monthlyBill * 12;
    const payback      = systemCost / annualSaving;
    const co2Annual    = dailyKwh * 365 * CO2_KG_PER_KWH;
    const profit25yr   = annualSaving * 25 - systemCost;

    setResult({ systemKw: systemKw.toFixed(2), panels, systemCost, annualSaving, payback: payback.toFixed(1), co2Annual: co2Annual.toFixed(0), profit25yr: Math.round(profit25yr) });
    setCalculating(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-green-dark py-16 text-center px-4">
        <div className="w-16 h-16 bg-yellow-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FiSun className="text-green-dark text-3xl" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Solar Savings Calculator</h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          Find out exactly how much you can save by switching to solar energy.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Enter Your Details</h2>
            <form onSubmit={calculate} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Monthly Electricity Bill (₦) *
                </label>
                <input
                  type="number"
                  min="1000"
                  required
                  value={form.monthlyBill}
                  onChange={(e) => set('monthlyBill', e.target.value)}
                  placeholder="e.g. 50000"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-mid focus:ring-1 focus:ring-green-mid"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                <select
                  value={form.location}
                  onChange={(e) => set('location', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-mid bg-white"
                >
                  {LOCATIONS.map((l) => (
                    <option key={l.label} value={l.label}>{l.label} ({l.sunHours} peak sun hrs/day)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Roof Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {[['pitched', 'Pitched/Sloped'], ['flat', 'Flat Roof']].map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => set('roofType', val)}
                      className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                        form.roofType === val
                          ? 'border-green-dark bg-green-dark text-white'
                          : 'border-gray-200 text-gray-600 hover:border-green-mid'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">System Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {[['hybrid', 'Hybrid (Grid + Battery)'], ['offgrid', 'Off-Grid (Full Solar)']].map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => set('systemType', val)}
                      className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                        form.systemType === val
                          ? 'border-green-dark bg-green-dark text-white'
                          : 'border-gray-200 text-gray-600 hover:border-green-mid'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={calculating}
                className="w-full py-4 bg-yellow-accent hover:bg-yellow-dark text-green-dark font-bold rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {calculating ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Calculating…
                  </>
                ) : (
                  <>Calculate Savings <FiArrowRight /></>
                )}
              </button>
            </form>
          </div>

          {/* Results */}
          <div>
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-green-dark rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center min-h-[400px]"
                >
                  <div className="w-20 h-20 bg-yellow-accent/20 rounded-full flex items-center justify-center mb-4 solar-ray">
                    <FiSun className="text-yellow-accent text-4xl" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Your Results Will Appear Here</h3>
                  <p className="text-white/50 text-sm">Fill in your details and click "Calculate Savings" to see your solar potential.</p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="bg-green-dark rounded-2xl p-6 text-white">
                    <p className="text-white/60 text-sm mb-1">Recommended System Size</p>
                    <p className="text-4xl font-extrabold text-yellow-accent">{result.systemKw} kW</p>
                    <p className="text-white/70 text-sm mt-1">{result.panels} solar panels needed</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: FiDollarSign, label: 'System Cost',     value: `₦${result.systemCost.toLocaleString()}`, color: 'text-blue-600',   bg: 'bg-blue-50' },
                      { icon: FiZap,        label: 'Annual Savings',  value: `₦${result.annualSaving.toLocaleString()}`, color: 'text-green-600',  bg: 'bg-green-50' },
                      { icon: FiSun,        label: 'Payback Period',  value: `${result.payback} years`, color: 'text-yellow-600',  bg: 'bg-yellow-50' },
                      { icon: FiWind,       label: 'CO₂ Saved/Year',  value: `${result.co2Annual} kg`, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    ].map((r) => (
                      <div key={r.label} className={`${r.bg} rounded-2xl p-4`}>
                        <r.icon className={`${r.color} text-xl mb-2`} />
                        <p className="text-gray-500 text-xs">{r.label}</p>
                        <p className={`${r.color} font-bold text-lg`}>{r.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-green-dark to-green-mid rounded-2xl p-5 text-white">
                    <p className="text-white/70 text-sm">25-Year Net Profit</p>
                    <p className="text-3xl font-extrabold text-yellow-accent">
                      ₦{result.profit25yr.toLocaleString()}
                    </p>
                    <p className="text-white/60 text-xs mt-1">After recovering system cost</p>
                  </div>

                  <div className="flex gap-3">
                    <Link to="/products" className="flex-1 py-3 bg-yellow-accent hover:bg-yellow-dark text-green-dark font-bold rounded-xl text-sm text-center transition-colors">
                      Shop Products
                    </Link>
                    <Link to="/contact" className="flex-1 py-3 border-2 border-green-dark text-green-dark hover:bg-green-dark hover:text-white font-bold rounded-xl text-sm text-center transition-colors">
                      Get a Quote
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
