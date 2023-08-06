const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('StoreItem', storeItemSchema);
