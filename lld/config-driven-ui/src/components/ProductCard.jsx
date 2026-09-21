import React from 'react';

/**
 * ProductCard Component
 * Configurable props from JSON:
 * - title: string
 * - price: string
 * - rating: string
 * - image: string (image URL)
 * - tag: string (badge like 'Best Seller')
 */
export const ProductCard = ({ title, price, rating, image, tag }) => {
  return (
    <div className="cdui-card cdui-product-card">
      <div className="cdui-card-image-wrap">
        {tag && <span className="cdui-card-tag">{tag}</span>}
        <img src={image} alt={title} className="cdui-card-img" loading="lazy" />
      </div>
      <div className="cdui-card-content">
        <div className="cdui-card-header">
          <h3 className="cdui-card-title">{title}</h3>
          {rating && <span className="cdui-rating-pill">{rating}</span>}
        </div>
        <div className="cdui-card-footer">
          <span className="cdui-card-price">{price}</span>
          <button
            className="cdui-btn cdui-btn-sm"
            onClick={() => alert(`Added "${title}" to cart!`)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
