import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const NewsTable = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSource, setSelectedSource] = useState("All"); // Initial value for the source filter
  const rowsPerPage = 5;
  const pagesToShow = 3;

  useEffect(() => {
    axios
      .get("/news")
      .then((response) => {
        setNewsData(response.data.data.news);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const filteredData =
    selectedSource === "All"
      ? newsData
      : newsData.filter((newsItem) => newsItem.source === selectedSource);

  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPageRange = () => {
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    let startPage = Math.max(1, currentPage - halfPagesToShow);
    let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    if (endPage - startPage < pagesToShow - 1) {
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  const handleSourceChange = (event) => {
    setSelectedSource(event.target.value);
    setCurrentPage(1);
  };

  const uniqueSources = [...new Set(newsData.map((item) => item.source))];
  uniqueSources.unshift("All");

  return (
    <div className="news-table tablechart" style={{}}>
      <h5>Source & Insight</h5>
      <div className="source-filter">
        <label
          htmlFor="countrySelect"
          style={{ opacity: "0.6", fontSize: "14px" }}
        >
          Filter by Source:
        </label>
        <select
          id="sourceSelect"
          className="form-control"
          style={{ backgroundColor: "#f9f8f9" }}
          value={selectedSource}
          onChange={handleSourceChange}
          // size={2}
        >
          {uniqueSources.map((source, index) => (
            <option key={index} value={source}>
              {source}
            </option>
          ))}
        </select>
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Source</th>
            <th>Insight</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((newsItem, index) => (
            <tr key={index}>
              <td>{newsItem.source}</td>
              <td>{newsItem.insight}</td>
              <td>
                <a
                  href={newsItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination justify-content-center mt-4">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {getPageRange().map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${
                currentPage === pageNumber ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NewsTable;
