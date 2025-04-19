import clsx from 'clsx';
import css from './Pagination.module.css';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const visiblePages = 5; // Скільки сторінок показувати до крапок

  const getPages = () => {
    const pages = [];
    pages.push(1); // Перша сторінка

    if (currentPage > visiblePages) {
      pages.push('...'); // Крапки перед поточними сторінками
    }

    const startPage = Math.max(2, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages - 1, currentPage + Math.floor(visiblePages / 2));

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - visiblePages) {
      pages.push('...'); // Крапки після поточних сторінок
    }

    pages.push(totalPages); // Остання сторінка
    return pages;
  };

  const pages = getPages();

  return (
    <div className={css.pagination}>
      {pages.map((page, index) => (
        <span
          key={index}
          className={clsx(css.pageNumber, currentPage === page ? css.active : '')}
          onClick={() => typeof page === 'number' && onPageChange(page)}
        >
          {page}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
