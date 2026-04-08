const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name:     String,
  price:    Number,
  quantity: { type: Number, default: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, unique: true },
    customerInfo: {
      name:    { type: String, required: true },
      email:   { type: String, required: true },
      phone:   String,
      address: String,
    },
    orderItems:  [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    notes: String,
  },
  { timestamps: true }
);

// Auto-generate order number before save
orderSchema.pre('save', function (next) {
  if (!this.orderNumber) {
    const rand = Math.random().toString(36).substring(2, 10).toUpperCase();
    this.orderNumber = `GP-${rand}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
