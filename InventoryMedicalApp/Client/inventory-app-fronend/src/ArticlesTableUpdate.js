// ArticlesTableUpdate.js
import { useState } from "react";
import { Table, FormControl, Button, Badge } from "react-bootstrap";

//this component will display articles in a table for the update article page
const ArticlesTableUpdate = ({
  articles,
  quantities,
  validities,
  handleQuantityChange,
  handleUpdate
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  if (!articles.length) return <div className="text-center mt-3 text-muted">Inga resultat hittades</div>;

  const sortedArticles = [...articles];
  if (sortConfig.key) {
    sortedArticles.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (typeof aValue === "string") aValue = aValue.toLowerCase();
      if (typeof bValue === "string") bValue = bValue.toLowerCase();

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  return (
    <Table striped bordered hover responsive>
      <thead className="table-primary">
        <tr>
          <th onClick={() => requestSort("namn")} style={{ cursor: "pointer" }}>Artikel <span>▲▼</span></th>
          <th onClick={() => requestSort("antal")} style={{ cursor: "pointer" }}>Nuvorande antal i lager <span>▲▼</span></th>
          <th>Ny antal i lager</th>
          <th onClick={() => requestSort("enhet")} style={{ cursor: "pointer" }}>Enhet <span>▲▼</span></th>
          <th>Varning</th>
          <th>Uppdatera</th>
        </tr>
      </thead>
      <tbody>
        {sortedArticles.map(article => (
          <tr key={article.id}>
            <td>{article.namn}</td>
            <td>{article.antal}</td>
            <td>
              {quantities[article.id] !== "" && validities[article.id] === false && (
                <span className="text-danger d-block mb-1">Antal måste vara ett positivt värde!</span>
              )}
              <FormControl
                type="text"
                value={quantities[article.id] || ""}
                onChange={e => handleQuantityChange(article.id, e.target.value)}
                placeholder="Ny antal..."
                className="large-input"
              />
            </td>
            <td>{article.enhet}</td>
            <td>
              {article.antal < 10 && <Badge bg="danger">Låg på lager</Badge>}
            </td>

            <td>
              <Button onClick={() => handleUpdate(article)}>Uppdatera</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ArticlesTableUpdate;
