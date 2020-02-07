import React  from 'react';

const AdvancedFilter = ({ searchValue, handleChangeValue }) => {
  return (
  <div>
    <form className="filter-container">
      <input
        type="text"
        name="profession"
        value={searchValue.profession}
        onChange={e => handleChangeValue(e)}
        placeholder="profession"
        className="filter-input"
      />
      <input
        type="text"
        name="language"
        value={searchValue.language}
        onChange={e => handleChangeValue(e)}
        placeholder="language"
        className="filter-input"
      />
      <input
        type="number"
        min="0"
        name="rating"
        className="filter-input"
        placeholder="rating"
        value={searchValue.rating}
        onChange={e => handleChangeValue(e)}
      />
    </form>
  </div>
  );
};

export default AdvancedFilter;