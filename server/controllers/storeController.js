const StoreItem = require('../models/storeModel');

exports.createStoreItem = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const userId = req.user; // Access the userId from the req.user (set by authMiddleware)

  try {
    // Create a new store item with the userId
    const storeItem = new StoreItem({
      name,
      description,
      price,
      quantity,
      userId, // Set the userId for the store item
    });

    // Save the store item to the database
    await storeItem.save();

    res.json({ message: 'Store item created successfully', storeItem });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create store item', error: error.message });
  }
};

exports.getStoreItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const storeItem = await StoreItem.findById(id);
    if (!storeItem) {
      return res.status(404).json({ message: 'Store item not found' });
    }

    res.json(storeItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get store item', error: error.message });
  }
};

exports.getAllStoreItems = async (req, res) => {
  try {
    const storeItems = await StoreItem.find();
    res.json(storeItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get all store items', error: error.message });
  }
};

exports.updateStoreItemById = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;

  try {
    const storeItem = await StoreItem.findByIdAndUpdate(
      id,
      { name, description, price, quantity },
      { new: true }
    );

    if (!storeItem) {
      return res.status(404).json({ message: 'Store item not found' });
    }

    res.json({ message: 'Store item updated successfully', storeItem });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update store item', error: error.message });
  }
};

exports.deleteStoreItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const storeItem = await StoreItem.findByIdAndDelete(id);

    if (!storeItem) {
      return res.status(404).json({ message: 'Store item not found' });
    }

    res.json({ message: 'Store item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete store item', error: error.message });
  }
};
