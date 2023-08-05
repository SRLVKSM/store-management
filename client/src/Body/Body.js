import React from 'react';
import "./Body.css";

const Body = () => {
  const storeItems = [
    'Apples',
    'Bananas',
    'Bread',
    'Milk',
    'Eggs',
    'Cereal',
    'Chicken',
    'Rice',
    'Tomatoes',
    'Potatoes',
    'Onions',
    'Carrots',
    'Spinach',
    'Pasta',
    'Cheese',
  ];

  return (
    <div className="store-content">
      <h2>Popular Store Items</h2>
      <div className="store-box">
        {storeItems.map((item, index) => (
          <div key={index} className="store-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;
