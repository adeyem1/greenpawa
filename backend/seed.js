const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
  // ── Inverters ──────────────────────────────────────────────────────────
  {
    name: 'SolarEdge 5kW Hybrid Inverter',
    category: 'inverter',
    price: 285000,
    description: 'Advanced hybrid inverter with built-in optimizers for maximum energy harvest. Works with or without battery storage.',
    specs: { power: '5kW', warranty: '12 years', efficiency: '97.6%' },
    featured: true,
    stock: 15,
    rating: 4.8,
    reviewCount: 42,
  },
  {
    name: 'Victron MultiPlus-II 3kW',
    category: 'inverter',
    price: 195000,
    description: 'Powerful inverter/charger combo ideal for home backup and off-grid applications. True sine wave output.',
    specs: { power: '3kW', warranty: '5 years', efficiency: '96%' },
    featured: false,
    stock: 20,
    rating: 4.7,
    reviewCount: 28,
  },
  {
    name: 'Growatt 10kW Three-Phase Inverter',
    category: 'inverter',
    price: 420000,
    description: 'Commercial-grade three-phase inverter suitable for businesses and large residential installations.',
    specs: { power: '10kW', warranty: '10 years', efficiency: '98.4%' },
    featured: true,
    stock: 8,
    rating: 4.6,
    reviewCount: 19,
  },

  // ── Batteries ──────────────────────────────────────────────────────────
  {
    name: 'LG Chem RESU 10H Lithium Battery',
    category: 'battery',
    price: 520000,
    description: 'Premium lithium-ion battery with 10kWh usable capacity. Compact wall-mount design with high cycle life.',
    specs: { power: '10kWh', warranty: '10 years', efficiency: '95%' },
    featured: true,
    stock: 12,
    rating: 4.9,
    reviewCount: 67,
  },
  {
    name: 'BYD Battery-Box Premium HVS 7.7',
    category: 'battery',
    price: 390000,
    description: 'High-voltage modular battery system. Scalable from 2.56kWh to 66.56kWh to match any energy need.',
    specs: { power: '7.7kWh', warranty: '10 years', efficiency: '96%' },
    featured: false,
    stock: 10,
    rating: 4.7,
    reviewCount: 34,
  },
  {
    name: 'Felicity 200Ah AGM Deep Cycle Battery',
    category: 'battery',
    price: 145000,
    description: 'Reliable AGM deep cycle battery for off-grid and backup systems. Maintenance-free with low self-discharge.',
    specs: { power: '200Ah/2.4kWh', warranty: '3 years', efficiency: '85%' },
    featured: false,
    stock: 30,
    rating: 4.4,
    reviewCount: 51,
  },

  // ── Solar Panels ────────────────────────────────────────────────────────
  {
    name: 'Canadian Solar 550W Mono PERC Panel',
    category: 'solar-panel',
    price: 92000,
    description: 'High-efficiency monocrystalline PERC panel with excellent low-light performance. Anti-reflective glass coating.',
    specs: { power: '550W', warranty: '25 years', efficiency: '21.1%' },
    featured: true,
    stock: 200,
    rating: 4.8,
    reviewCount: 89,
  },
  {
    name: 'JA Solar 400W Bifacial Panel',
    category: 'solar-panel',
    price: 68000,
    description: 'Bifacial design captures light from both sides, increasing output by up to 30%. Great for flat roofs.',
    specs: { power: '400W', warranty: '25 years', efficiency: '19.8%' },
    featured: false,
    stock: 150,
    rating: 4.6,
    reviewCount: 44,
  },
  {
    name: 'Jinko Tiger Neo 470W N-Type Panel',
    category: 'solar-panel',
    price: 78000,
    description: 'N-type cell technology delivers superior performance with lower degradation over 25 years.',
    specs: { power: '470W', warranty: '25 years', efficiency: '20.6%' },
    featured: false,
    stock: 120,
    rating: 4.7,
    reviewCount: 37,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({ role: 'admin' });
    console.log('🗑️  Cleared existing products and admin users');

    // Insert products
    await Product.insertMany(products);
    console.log(`📦 Inserted ${products.length} products`);

    // Create admin user
    const admin = await User.create({
      name: 'GreenPaWa Admin',
      email: 'admin@greenpawa.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log(`👤 Admin user created: ${admin.email} / admin123`);

    console.log('\n✅ Seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
