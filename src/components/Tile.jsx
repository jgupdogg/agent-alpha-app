// src/components/Tile.jsx
import React, { useState } from 'react';
import Tooltip from './Tooltip';
import DOMPurify from 'dompurify';

const Tile = ({ item, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Function to process summary text
  const processSummary = (summary, articleIds) => {
    // Remove 'Summary: ' prefix if present
    let processed = summary.replace(/^Summary:\s*/, '');

    // Split into sentences starting with '-' and ending with '(Source: ID)'
    const regex = /-\s.*?\(Source:\s*(\w+)\)/gs;
    const matches = processed.match(regex) || [];

    // Process each match
    const items = matches.map((item) => {
      // Replace '(Source: ID)' with site name and hyperlink
      const match = /\(Source:\s*(\w+)\)/.exec(item);
      const articleId = match ? match[1] : null;

      if (articleId && articleIds && articleIds[articleId]) {
        const { url, site } = articleIds[articleId];
        item = item.replace(
          `(Source: ${articleId})`,
          `(Source: <a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">${site}</a>)`
        );
      }

      // Remove the leading '- ' and sanitize
      return DOMPurify.sanitize(item.trim().substring(2));
    });

    // Truncate each item to 300 characters if necessary
    const truncatedItems = items.map((item) => (item.length > 300 ? `${item.substring(0, 300)}..` : item));

    return truncatedItems;
  };

  const summaryItems = processSummary(item.metadata.summary, item.metadata.article_ids);

  // Get sites from article_ids for display on the tile
  const sites = Object.values(item.metadata.article_ids || {})
    .map((article) => article.site)
    .join(', ');

  // Extract symbol and company name
  const symbol = item.metadata.symbol;
  const companyName = item.metadata.name || item.metadata.company_name || symbol;

  // Construct the image URL based on the symbol
  const imageUrl = `https://raw.githubusercontent.com/jgupdogg/public/main/logos/logo_${symbol}.png`;

  // Format the date
  const formattedDate = item.metadata.date
    ? new Date(item.metadata.date).toLocaleString('en-US', {
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

  const price = item.metadata.quote?.price != null ? item.metadata.quote.price : null;
  const changePercentage = item.metadata.quote?.changesPercentage != null ? item.metadata.quote.changesPercentage : null;

  const formattedPrice = formatPrice(price);
  const formattedChangePercentage = formatChangePercentage(changePercentage);

  // Determine color based on change percentage
  const isNegativeChange = changePercentage != null && changePercentage < 0;
  const priceColorClass = isNegativeChange ? 'text-red-500' : 'text-green-500';

  // Prepare the item with all necessary data for the modal
  const itemWithProcessedSummary = {
    ...item,
    summaryItems,
    sites,
    formattedDate,
    formattedPrice,
    formattedChangePercentage,
    priceColorClass,
    symbol,
    companyName,
    imageUrl,
  };

  return (
    <div
      className="
        relative p-4 mb-4 rounded-lg cursor-pointer
        bg-white dark:bg-gray-800
        shadow-md hover:shadow-lg
        transition-shadow duration-200
        group
      "
      onClick={() => onClick(itemWithProcessedSummary)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(itemWithProcessedSummary);
        }
      }}
    >
      {/* Top Row */}
      <div className="flex">
        {/* Left Column */}
        <div className="flex flex-col items-center mr-4" style={{ minWidth: '80px' }}>
          <img
            src={imageUrl}
            alt={`${symbol} logo`}
            className="w-12 h-12 object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/path/to/default/image.png'; // Replace with your default image path
            }}
          />
          <p className="mt-2 text-base font-medium text-gray-900 dark:text-gray-100">
            {symbol}
          </p>
          <p className={`text-sm font-medium ${priceColorClass}`}>{formattedPrice}</p>
          <p className={`text-sm font-medium ${priceColorClass}`}>{formattedChangePercentage}</p>
        </div>
        {/* Right Column */}
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {item.metadata.headline}
          </p>
        </div>
      </div>

      {/* Second Row */}
      <div className="flex justify-between items-center mt-2">
        {/* Left Side */}
        <p className="text-sm text-gray-700 dark:text-gray-300">Sources - {sites}</p>
        {/* Right Side */}
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">{formattedDate}</p>
      </div>

      {/* Tooltip */}
      {isHovered && (
        <Tooltip
          summary={summaryItems}
          sentimentScore={item.metadata.sentiment_score}
          significanceScore={item.metadata.significance_score}
        />
      )}
    </div>
  );
};

export default Tile;
