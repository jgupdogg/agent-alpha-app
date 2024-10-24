// src/components/Results.jsx
import React, { useState } from 'react';
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
        <div
          key={index}
          className="
            p-4 mb-4 rounded-lg cursor-pointer
            bg-white dark:bg-gray-800
            shadow-md hover:shadow-lg
            transition-shadow duration-200
          "
          onClick={() => handleItemClick(item)}
        >
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Symbol: {item.metadata.symbol}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Sentiment Score: {item.metadata.sentiment_score}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Significance Score: {item.metadata.significance_score}
          </p>
        </div>
      ))}

      {selectedItem && (
        <Modal onClose={closeModal}>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {selectedItem.metadata.headline}
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Date:</strong> {selectedItem.metadata.date}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Category:</strong> {selectedItem.metadata.category}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Symbol:</strong> {selectedItem.metadata.symbol}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Sentiment Score:</strong> {selectedItem.metadata.sentiment_score}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Sentiment Text:</strong> {selectedItem.metadata.sentiment_text}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Significance Score:</strong> {selectedItem.metadata.significance_score}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Significance Text:</strong> {selectedItem.metadata.significance_text}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Summary:</strong> {selectedItem.metadata.summary}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="
                mt-6 px-4 py-2 bg-primary dark:bg-secondary
                text-white dark:text-gray-100 font-semibold rounded-md
                hover:bg-secondary dark:hover:bg-primary
                focus:outline-none focus:ring-2 focus:ring-primary
              "
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Results;
