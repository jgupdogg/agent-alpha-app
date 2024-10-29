// src/components/Results.jsx
import React, { useState } from 'react';
import Tile from './Tile';
import Modal from './Modal';

const Results = ({ data, loading, error }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  if (loading) {
    return <p className="mt-4 text-gray-700 dark:text-gray-300">Loading results...</p>;
  }

  if (error) {
    return <p className="text-red-500 mt-4">{error}</p>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <p className="mt-4 text-gray-700 dark:text-gray-300">No results found.</p>;
  }

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="w-full max-w-3xl mt-8">
      {data.map((item, index) => (
        <Tile key={index} item={item} onClick={handleItemClick} />
      ))}

      {selectedItem && <Modal item={selectedItem} onClose={closeModal} />}
    </div>
  );
};

export default Results;
