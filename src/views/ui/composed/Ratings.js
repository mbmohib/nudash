import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

import { StarIcon, StarHalfIcon, StarOutlineIcon } from 'views/ui/icons';

const Ratings = ({ editing, totalStar, rating, onStarClick }) => (
  <StarRatingComponent
    name="rating"
    editing={editing || false}
    starCount={totalStar || 5}
    value={+rating || 0}
    onStarClick={onStarClick}
    renderStarIcon={(index, value) => {
      return <span>{index <= value ? <StarIcon /> : <StarOutlineIcon />}</span>;
    }}
    renderStarIconHalf={() => {
      return (
        <span>
          <StarHalfIcon />
        </span>
      );
    }}
  />
);

export default Ratings;
