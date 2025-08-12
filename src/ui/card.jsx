
import React from 'react';
import PropTypes from 'prop-types'
import './Card.css';

const Card = ({
  children,
  title,
  subtitle,
  imageUrl,
  imageAlt,
  footer,
  className,
  onClick,
  hoverEffect,
  elevation,
  rounded,
}) => {
  const cardClasses = [
    'card',
    className,
    hoverEffect && 'card--hover',
    elevation && `card--elevation-${elevation}`,
    rounded && 'card--rounded',
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick}>
      {imageUrl && (
        <div className="card__image-container">
          <img src={imageUrl} alt={imageAlt || 'Card image'} className="card__image" />
        </div>
      )}
      
      {(title || subtitle) && (
        <div className="card__header">
          {title && <h3 className="card__title">{title}</h3>}
          {subtitle && <p className="card__subtitle">{subtitle}</p>}
        </div>
      )}
      
      
      
      {footer && (
        <div className="card__footer">
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  footer: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  hoverEffect: PropTypes.bool,
  elevation: PropTypes.oneOf([0, 1, 2, 3, 4]),
  rounded: PropTypes.bool,
};

Card.defaultProps = {
  hoverEffect: false,
  elevation: 1,
  rounded: true,
};

export default Card;