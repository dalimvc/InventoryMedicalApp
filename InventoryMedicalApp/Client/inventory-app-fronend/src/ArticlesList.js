import { useState } from "react";
import { Table } from "react-bootstrap";

//this componewnt will be used in Home.js to display the articles in a table
const ArticlesList = ({ articles }) => {
  //used to sort articles 
  const [sortConfig, setSortConfig] = useState({ key: "null", direction: "asc" });
  const sortedArticles = [...articles];
  if (sortConfig.key) {
    sortedArticles.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  return (
    <div className="articles-list table-responsive">
      <Table striped bordered hover>
          <thead className="table-primary">
            <tr>
              <th onClick={() => requestSort("namn")}>
                Artikel{" "}
                <span>
                  <span className="sortButtons">▲</span>
                  <span className="sortButtons">▼</span>
                </span>
              </th>
              <th onClick={() => requestSort("antal")}>
                Antal i lager{" "}
                <span>
                  <span className="sortButtons">▲</span>
                  <span className="sortButtons">▼</span>
                </span>
              </th>
              <th>Enhet</th>
              <th onClick={() => requestSort("antal")}>Varning{" "}
                <span>
                  <span className="sortButtons">▲</span>
                  <span className="sortButtons">▼</span>
                </span>
              </th>
            </tr>
          </thead>

        <tbody>
          {sortedArticles.map((article) => (
            <tr key={article.id}>
              <td>{article.namn}</td>
              <td>{article.antal}</td>
              <td>{article.enhet}</td>
              <td>
                {article.isLowStock && <span className="badge bg-danger">Låg på lager</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ArticlesList;
