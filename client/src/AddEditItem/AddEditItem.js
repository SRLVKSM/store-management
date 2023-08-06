import React, { useState } from 'react';
import Modal from 'react-modal';
import "./AddEditItem.css";

const AddEditItem = ({ isOpen, onClose, onSave, editMode, initialItem }) => {
  const [itemName, setItemName] = useState(initialItem ? initialItem.name : '');
  const [itemQuantity, setItemQuantity] = useState(
    initialItem ? initialItem.quantity : ''
  );
  const [itemPrice, setItemPrice] = useState(initialItem ? initialItem.price : '');
  
  const handleSubmit = () => {
    const updatedItem = {
      name: itemName,
      quantity: itemQuantity,
      price: itemPrice,
    };
    onSave(updatedItem);
  };

  const handleClose = () => {
    onClose();
    setItemName("");
    setItemQuantity("");
    setItemPrice("");
  }

  return (
    <Modal className="modal" isOpen={isOpen} onRequestClose={handleClose} contentLabel="Store Item Modal">
      <h2>{editMode ? 'Edit Item' : 'Add New Item'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="itemName">Name:</label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="itemQuantity">Quantity:</label>
          <input
            type="text"
            id="itemQuantity"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="itemPrice">Price:</label>
          <input
            type="text"
            id="itemPrice"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            required
          />
        </div>
        <div className='action'>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">{editMode ? 'Update' : 'Save'}</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditItem;
