import Slider from '@mui/material/Slider';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import './styles.scss';
import { IFiltersProps } from './types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { categories, setFilters, filters } from '../../features/cart/cartSlice';

const Filters = (props: IFiltersProps) => {
  const categoryItems = useAppSelector(categories);
  const activeFilters = useAppSelector(filters);
  const dispatch = useAppDispatch();

  // type SelectedCategory = { selectedCategories: string };
  const handleCatSelection = (cat: string) => {
    dispatch(setFilters({ selectedCategories: cat }));
  };

  const handleRateChange = (
    event: Event | React.SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    dispatch(setFilters({ rating: value as number }));
  };

  const handlePriceChange = (
    event: Event | React.SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    dispatch(setFilters({ price: value as number }));
  };

  //TODO: make the filter title an accordion

  return (
    <div className="filters">
      <div className="filters__title">
        <span>Filters</span>
        <FilterAltIcon className="filters__title__icon" />
      </div>
      <div className="filters__slider">
        <span>Price</span>
        <Slider
          className="filters__slider__input"
          size="small"
          aria-label="Filter-by-price"
          valueLabelDisplay="auto"
          onChangeCommitted={handlePriceChange}
        />
      </div>
      <div className="filters__slider">
        <span>Rating</span>
        <Slider
          className="filters__slider__input"
          size="small"
          aria-label="Filter-by-rating"
          valueLabelDisplay="auto"
          onChangeCommitted={handleRateChange}
        />
      </div>
      <div className="filters__gender__options">
        {categoryItems.map((category) => {
          return (
            <button
              key={category}
              onClick={() => handleCatSelection(category)}
              className={`filters__gender__options__button ${
                activeFilters.selectedCategories?.includes(category)
                  ? '--active'
                  : ''
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
