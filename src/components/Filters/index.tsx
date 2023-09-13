import { useState } from 'react';
import './styles.scss';
import { IFiltersProps } from './types';
import Slider from '@mui/material/Slider';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Filters = (props: IFiltersProps) => {
  const [isMen, setIsMen] = useState(false);
  const [isWomen, setIsWomen] = useState(false);

  const toggleState = (state: boolean) => !state;

  const handleGenderSelection = (gender: string) => {
    if (gender === 'men') {
      setIsMen(toggleState(isMen));

      if (isWomen) {
        setIsWomen(toggleState(isWomen));
      }
    } else {
      setIsWomen((prevState) => !prevState);

      if (isMen) {
        setIsMen(toggleState(isMen));
      }
    }
  };

  //TODO: make the filter title an accordion

  return (
    <div className="filters">
      <div className="filters__title">
        <span>Filters</span>
        <FilterAltIcon className="filters__title__icon" />
      </div>
      <div className="filters__gender">
        <span>Gender </span>
        <div className="filters__gender__options">
          <button
            onClick={() => handleGenderSelection('men')}
            className={`filters__gender__options__button ${
              isMen ? '--active' : ''
            }`}
          >
            Men
          </button>
          <button
            onClick={() => handleGenderSelection('women')}
            className={`filters__gender__options__button ${
              isWomen ? '--active' : ''
            }`}
          >
            Women
          </button>
        </div>
      </div>
      <div className="filters__slider">
        <span>Price</span>
        <Slider
          className="filters__slider__input"
          size="small"
          aria-label="Filter-by-price"
          valueLabelDisplay="auto"
        />
      </div>
      <div className="filters__slider">
        <span>Rating</span>
        <Slider
          className="filters__slider__input"
          size="small"
          aria-label="Filter-by-rating"
          valueLabelDisplay="auto"
        />
      </div>
    </div>
  );
};

export default Filters;
