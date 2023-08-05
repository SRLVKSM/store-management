const express = require('express');
const router = express.Router();
const storeItemController = require('../controllers/storeController');

// Create a new store item
router.post('/', storeItemController.createStoreItem);
router.get('/:id', storeItemController.getStoreItemById);
router.get('/', storeItemController.getAllStoreItems);
router.put('/:id', storeItemController.updateStoreItemById);
router.delete('/:id', storeItemController.deleteStoreItemById);

module.exports = router;
