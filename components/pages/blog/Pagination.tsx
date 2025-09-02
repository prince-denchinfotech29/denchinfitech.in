import React from "react"
import { Button } from "../../ui/button" // Adjust the path if needed

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null

  const pages: number[] = []

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i)
    }
  }

  const paginationItems = pages.map((page, index) => {
    const prevPage = index > 0 ? pages[index - 1] : null
    const gap = prevPage !== null && page - prevPage > 1

    return (
      <React.Fragment key={page}>
        {gap && (
          <span key={`ellipsis-${page}`} className="px-2 select-none">
            ...
          </span>
        )}
        <Button
          key={`page-${page}`}
          variant={currentPage === page ? "default" : "outline"}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 ${
            currentPage === page
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "hover:bg-gray-100"
          }`}
        >
          {page}
        </Button>
      </React.Fragment>
    )
  })

  return (
    <nav className="mt-8">
      <div className="flex justify-center items-center space-x-2 flex-wrap">
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2"
        >
          &laquo; Previous
        </Button>

        {paginationItems}

        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2"
        >
          Next &raquo;
        </Button>

        <Button
          variant="outline"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-4 py-2"
        >
          Last
        </Button>
      </div>
    </nav>
  )
}

export default Pagination
