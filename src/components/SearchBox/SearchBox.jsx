import { HiSearch } from 'react-icons/hi';
import css from './SearchBox.module.css';
import { useState } from 'react';

export const SearchBox = ({ onChange }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setQuery(e.target.value);

    if (query === '') return;

    onChange(query.trim());
    setQuery('');
  };
  return (
    <div className={css.wrapper}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          type='text'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className={css.button} type='submit'>
          Search
          <HiSearch className={css.icon} />
        </button>
      </form>
    </div>
  );
};
