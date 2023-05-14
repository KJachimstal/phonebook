import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/actions';

export const FindContacts = () => {
  const dispatch = useDispatch();
  const filteredValue = useSelector(state => state.contacts.filters);

  const handleChange = event => {
    const searchValue = event.target.value;
    dispatch(setFilter(searchValue));
  };

  return (
    <label htmlFor="find" className="form-label">
      Search by name:
      <input
        className="form-input"
        type="text"
        id="find"
        name="filter"
        value={filteredValue}
        onChange={handleChange}
      />
    </label>
  );
};
