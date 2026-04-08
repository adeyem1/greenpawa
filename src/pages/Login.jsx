import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiSun } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const { user, login, register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(form.email, form.password);
        toast.success('Welcome back!');
      } else {
        if (!form.name.trim()) {
          toast.error('Name is required');
          setLoading(false);
          return;
        }
        await register(form.name, form.email, form.password);
        toast.success('Account created! Welcome to GreenPaWa.');
      }
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-dark via-green-mid to-green-dark flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-light/10 rounded-full -translate-x-1/2 -translate-y-1/2 solar-ray" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-accent/10 rounded-full translate-x-1/3 translate-y-1/3 solar-ray" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-10 w-40 h-40 bg-green-light/5 rounded-full solar-ray" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="glass rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-yellow-accent rounded-xl flex items-center justify-center shadow-lg">
                <FiSun className="text-green-dark text-2xl" />
              </div>
              <span className="text-white text-2xl font-bold">GreenPaWa</span>
            </Link>
            <p className="text-white/60 text-sm">
              {isLogin ? 'Sign in to your account' : 'Create your free account'}
            </p>
          </div>

          {/* Toggle */}
          <div className="flex bg-white/10 rounded-xl p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isLogin
                  ? 'bg-yellow-accent text-green-dark shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                !isLogin
                  ? 'bg-yellow-accent text-green-dark shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name — register only */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-white/80 text-sm font-medium mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-lg" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required={!isLogin}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-yellow-accent focus:ring-1 focus:ring-yellow-accent transition-colors"
                  />
                </div>
              </motion.div>
            )}

            {/* Email */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-lg" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-yellow-accent focus:ring-1 focus:ring-yellow-accent transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-1.5">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-lg" />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl pl-11 pr-11 py-3 text-sm focus:outline-none focus:border-yellow-accent focus:ring-1 focus:ring-yellow-accent transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                >
                  {showPass ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-accent hover:bg-yellow-dark text-green-dark font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-yellow-accent/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  {isLogin ? 'Signing in…' : 'Creating account…'}
                </span>
              ) : isLogin ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="text-center text-white/50 text-xs mt-6">
            By continuing, you agree to our{' '}
            <span className="text-yellow-accent/80 cursor-pointer hover:text-yellow-accent">
              Terms of Service
            </span>{' '}
            and{' '}
            <span className="text-yellow-accent/80 cursor-pointer hover:text-yellow-accent">
              Privacy Policy
            </span>
            .
          </p>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-white/50 hover:text-white text-sm transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
