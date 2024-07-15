import React from "react";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="flex justify-center space-x-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            title="Go to page"
            onClick={() => paginate(number)}
            className="px-4 py-2 text-gray-800 transition bg-gray-200 rounded-lg shadow-md hover:bg-gray-300"
          >
            {number}
          </button>
        ))}
      </ul>
    </nav>
  );
};
