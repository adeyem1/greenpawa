const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    category:    { type: String, required: true, enum: ['inverter', 'battery', 'solar-panel'] },
    price:       { type: Number, required: true, min: 0 },
    description: { type: String, trim: true },
    image:       { type: String },
    specs: {
      power:      String,
      warranty:   String,
      efficiency: String,
    },
    featured:    { type: Boolean, default: false },
    stock:       { type: Number, default: 10, min: 0 },
    rating:      { type: Number, default: 4.5, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
