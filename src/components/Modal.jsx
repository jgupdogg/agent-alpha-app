// src/components/Modal.jsx
import React, { useEffect } from 'react';
import DOMPurify from 'dompurify'; // Ensure DOMPurify is installed and imported

const Modal = ({ item, onClose }) => {
  // Close the modal when the Escape key is pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleClickOutside = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  const processSummary = (summary, articleIds) => {
    // Remove 'Summary: ' prefix if present
    let processed = summary.replace(/^Summary:\s*/, '');
  
    // Split into sentences ending with '(Source: ID)'
    const regex = /-\s.*?\(Source:\s*(\w+)\)/gs;
    const matches = processed.match(regex) || [];
  
    // Process each match
    const items = matches.map((summaryItem) => {
      // Extract the article ID from the source
      const match = /\(Source:\s*(\w+)\)/.exec(summaryItem);
      const articleId = match ? match[1] : null;
  
      // Replace '(Source: ID)' with site name and hyperlink
      if (articleId && articleIds && articleIds[articleId]) {
        const { url, site } = articleIds[articleId];
        summaryItem = summaryItem.replace(
          `(Source: ${articleId})`,
          `(Source: <a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">${site}</a>)`
        );
      } else {
        // Handle unmatched IDs if necessary
        summaryItem = summaryItem.replace(`(Source: ${articleId})`, '(Source: Unknown)');
      }
  
      // Remove the leading '- ' and sanitize the HTML
      return DOMPurify.sanitize(summaryItem.trim().substring(2));
    });
  
    return items;
  };
  // Ensure that the item has the necessary data
  if (!item || !item.metadata) {
    return null;
  }

  const {
    metadata: {
      headline,
      date,
      category,
      symbol,
      name: companyName,
      quote: { price, changesPercentage } = {},
      sentiment_score,
      sentiment_text,
      significance_score,
      significance_text,
      summary,
      article_ids,
    },
    imageUrl,
  } = item;

  // Format the date as 'Dec 12 2:14 PM'
  const formattedDate = date
    ? new Date(date).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
    : 'N/A';

  // Function to format price
  const formatPrice = (price) => {
    if (price == null) return 'N/A';
    if (price >= 1000) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumSignificantDigits: 3,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price);
    }
  };

  // Function to format change percentage
  const formatChangePercentage = (changePercentage) => {
    if (changePercentage == null) return 'N/A';
    const formatted = `${changePercentage.toFixed(2)}%`;
    return formatted;
  };

  const formattedPrice = formatPrice(price);
  const formattedChangePercentage = formatChangePercentage(changesPercentage);

  // Determine color based on change percentage
  const isNegativeChange = changesPercentage != null && changesPercentage < 0;
  const priceColorClass = isNegativeChange ? 'text-red-500' : 'text-green-500';

  // Process summary into bullet points with hyperlinks
  const summaryItems = processSummary(summary, article_ids);

  return (
    <div
      id="modal-overlay"
      onClick={handleClickOutside}
      className="
        fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center
        z-50
      "
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="
          bg-white dark:bg-gray-800 rounded-lg overflow-y-auto max-h-full
          w-full max-w-2xl mx-2 p-6
        "
      >
        {/* Top Row */}
        <div className="flex items-start justify-between mb-6">
          {/* Left Column - Logo and Price */}
          <div className="flex flex-col items-start">
            {/* Logo Image */}
            <img
              src={imageUrl}
              alt={`${symbol} logo`}
              className="w-16 h-16 object-contain"
              onError={(e) => {
                e.target.onerror = null;
              }}
            />
            {/* Symbol */}
            <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              {symbol}
            </p>
            {/* Price */}
            <p className={`text-2xl font-semibold ${priceColorClass}`}>
              {formattedPrice}
            </p>
            {/* Change Percentage */}
            <p className={`text-sm font-medium ${priceColorClass}`}>
              {formattedChangePercentage}
            </p>
          </div>
          {/* Right Column - Company Name and Title */}
          <div className="flex-1 ml-6">
            {/* Company Name */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {companyName}
            </p>
            {/* Title */}
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">
              {headline}
            </h3>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6">
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
            {summaryItems.map((item, index) => (
              <li key={index}>
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4">
          {/* Sentiment Analysis */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-semibold text-gray-900 dark:text-gray-100">
              Sentiment Analysis
            </summary>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {sentiment_text}
            </p>
          </details>

          {/* Significance Analysis */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-semibold text-gray-900 dark:text-gray-100">
              Significance Analysis
            </summary>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {significance_text}
            </p>
          </details>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
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
    </div>
  );
};

export default Modal;
