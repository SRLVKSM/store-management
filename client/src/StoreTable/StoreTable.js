import { useEffect, useState } from 'react';
import { addItem, deleteItem, getItems, updateItem } from '../actions';
import "./StoreTable.css";
import AddEditItem from '../AddEditItem';

const StoreTable = () => {
  const [storeItems, setStoreItems] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    getItems(localStorage.getItem("jwt"))
      .then(({ data }) => {
        setStoreItems(data);
      })
  }, []);

  const handleAddNewItem = () => {
    setModalOpen(true);
    setEditItemId(null);
  };

  const handleEditItem = (itemId) => () => {
    setModalOpen(true);
    setEditItemId(itemId);
  };

  const handleDelete = (itemId) => () => {
    const deleteConfirm = window.confirm("Are you sure you wanna delete?");
    if (!deleteConfirm) return;
    deleteItem(itemId, localStorage.getItem('jwt'))
      .then(() => {
        const updatedStoreItems = storeItems.filter((storeInfo) => {
          return storeInfo._id !== itemId;
        });
        setStoreItems(updatedStoreItems);
      })
      .catch((err) => {
        alert(`Unable to delete item, ${err?.response?.data?.message}`);
      })
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditItemId(null);
  };

  const handleSaveItem = (item) => {
    if (editItemId !== null) {
      updateItem(editItemId, item, localStorage.getItem("jwt"))
        .then(({ data }) => {
          const updatedStoreItems = storeItems.map((storeInfo) => {
            if (storeInfo._id === editItemId) return data.storeItem;
            return storeInfo;
          });
          setStoreItems(updatedStoreItems);
        })
        .catch((err) => {
          alert(`Unable to update item, ${err?.response?.data?.message}`);
        });
    } else {
      addItem(item, localStorage.getItem("jwt"))
        .then(({ data }) => {
          setStoreItems([
            ...storeItems,
            data.storeItem,
          ]);
        })
        .catch((err) => {
          alert(`Unable to add item, ${err?.response?.data?.message}`);
        });
    }
  };

  return (
    <>
      <div className="title-container">
        <h2>Items List</h2>
        <button className="add-button" onClick={handleAddNewItem}>Add New Item</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            !storeItems.length ? (
            <tr className='empty-row'>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No rows found
              </td>
            </tr>
          ) :
            storeItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>
                  <button className="edit-button" onClick={handleEditItem(item._id)}>Edit</button>
                </td>
                <td>
                  <button className="delete-button" onClick={handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {
        isModalOpen && (
          <AddEditItem
            isOpen
            onClose={handleCloseModal}
            onSave={handleSaveItem}
            editMode={editItemId !== null}
            initialItem={editItemId !== null ? storeItems.find((item) => item._id === editItemId) : null}
          />
        )
      }
    </>
  );
};

export default StoreTable;
