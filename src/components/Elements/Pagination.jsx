import { MdArrowForwardIos } from "react-icons/md"; 
import { MdArrowBackIos } from "react-icons/md"; 
import Button from "./Button.jsx";

const Pagination = ({ useAt = "product", currentPage, lastPage }) => {
  const handlePageClick = (page) => {
    window.location.href = `/${useAt}/page/${page}`;
  };

  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show around the current page
    const range = [];
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(lastPage - 1, currentPage + delta);

    // Always show first page and last page
    range.push(1);
    if (start > 2) {
      range.push("...");
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < lastPage - 1) {
      range.push("...");
    }
    range.push(lastPage);

    return range;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center mt-8 gap-2 w-full">
      <Button
        onClick={() => handlePageClick(currentPage - 1)}
        className={`btn text-center bg-[#0093dd] text-[#fff] ${
          currentPage === 1 ? "active " : ""
        }`}
        disabled={currentPage === 1}
      >
        <MdArrowBackIos />
      </Button>
      {pages.map((page, index) =>
        typeof page === "number" ? (
          <Button
            key={page}
            disabled={currentPage === page}
            onClick={() => handlePageClick(page)}
            className={`btn bg-[#0093dd] text-[#fff] ${
              currentPage === page
                ? "active"
                : ""
            }`}
          >
            {page}
          </Button>
        ) : (
          <span key={index} className="btn">
            {page}
          </span>
        )
      )}
      <Button
        onClick={() => handlePageClick(currentPage + 1)}
        className={`btn bg-[#0093dd] text-[#fff] text-center ${
          currentPage === lastPage
            ? "active bg-slate-400 hover:bg-slate-400"
            : ""
        }`}
        disabled={currentPage === lastPage}
      >
        <MdArrowForwardIos />
      </Button>
    </div>
  );
};

export default Pagination;
