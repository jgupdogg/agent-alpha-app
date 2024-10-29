// src/components/Tooltip.jsx
import React from 'react';

const Tooltip = ({ summary, sentimentScore, significanceScore }) => {
  return (
    <div
      className="
        absolute left-1/2 transform -translate-x-1/2
        bottom-full mb-2
        bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700
        shadow-lg rounded-lg p-3 w-64
        z-20
        opacity-0 group-hover:opacity-100
        transition-opacity duration-200
      "
    >
      <div className="text-sm text-gray-800 dark:text-gray-200">
        <p>
          <strong>Sentiment:</strong> {sentimentScore}
        </p>
        <p>
          <strong>Significance:</strong> {significanceScore}
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          {summary.map((item, index) => (
            <li key={index}>
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      </div>
      {/* Arrow */}
      <div
        className="
          absolute top-full left-1/2 transform -translate-x-1/2
          w-3 h-3 bg-white dark:bg-gray-900
          border-l border-t border-gray-300 dark:border-gray-700
          rotate-45
          -mt-1.5
        "
      ></div>
    </div>
  );
};

export default Tooltip;
