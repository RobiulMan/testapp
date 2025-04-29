import Link from 'next/link';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  onPageChange?: (page: number) => void;
}

export default function PaginationComponent({ currentPage, totalPages, baseUrl }: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    // Calculate range around current page
    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      pages.push(-1); // Use -1 as a marker for ellipsis
    }
    
    // Add pages in the calculated range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (rangeEnd < totalPages - 1) {
      pages.push(-2); // Use -2 as another marker for ellipsis
    }
    
    // Always show last page if it's not the first page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-2 my-8">
      {/* Previous Button */}
      <Link
        href={currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : "#"}
        className={`px-4 py-2 border rounded-md ${
          currentPage > 1
            ? "bg-white text-gray-700 hover:bg-gray-100"
            : "bg-gray-200 text-gray-400 pointer-events-none"
        }`}
      >
        Previous
      </Link>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => (
        <div key={index}>
          {page === -1 || page === -2 ? (
            <span className="px-4 py-2 text-gray-500">...</span>
          ) : (
            <Link
              href={`${baseUrl}?page=${page}`}
              className={`px-4 py-2 border rounded-md ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </Link>
          )}
        </div>
      ))}

      {/* Next Button */}
      <Link
        href={currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : "#"}
        className={`px-4 py-2 border rounded-md ${
          currentPage < totalPages
            ? "bg-white text-gray-700 hover:bg-gray-100"
            : "bg-gray-200 text-gray-400 pointer-events-none"
        }`}
      >
        Next
      </Link>
    </div>
  );
}