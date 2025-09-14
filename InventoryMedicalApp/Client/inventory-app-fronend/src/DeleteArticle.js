import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import useFetch from "./useFetch";
import SearchBox from "./SearchBox";

//component for deleting articles
//it uses useFetch to get the articles from the API and searchbox for searching articles
const DeleteArticle = () => {
  const { error, isPending, data: initialArticles } = useFetch(
    "https://localhost:7075/api/articles"
  );
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    if (initialArticles) setArticles(initialArticles);
  }, [initialArticles]);

  if (isPending) return <div>Laddar...</div>;
  if (error) return <div>{error}</div>;

  const filteredArticles = articles.filter(article =>
    article.namn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedArticles = [...filteredArticles];
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

  const requestSort = key => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const handleDelete = async id => {
    try {
      const response = await fetch(`https://localhost:7075/api/articles/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Det gick inte att radera artikeln");
      setArticles(prev => prev.filter(article => article.id !== id));
      setConfirmDeleteId(null); 
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="delete-article container mt-4">
      <h2 className="text-center mb-4">Ta bort artikel</h2>
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Table striped bordered hover responsive>
        <thead className="table-primary">
          <tr>
            <th onClick={() => requestSort("namn")} style={{ cursor: "pointer" }}>Artikel ▲▼</th>
            <th onClick={() => requestSort("antal")} style={{ cursor: "pointer" }}>Antal i lager ▲▼</th>
            <th onClick={() => requestSort("enhet")} style={{ cursor: "pointer" }}>Enhet ▲▼</th>
            <th>Varning</th>
            <th>Radera</th>
          </tr>
        </thead>
        <tbody>
          {sortedArticles.map(article => (
            <tr key={article.id}>
              <td>{article.namn}</td>
              <td>{article.antal}</td>
              <td>{article.enhet}</td>
              <td>
                {article.isLowStock && <span className="badge bg-danger">Låg på lager</span>}
              </td>
              <td className="confirmBox">
                {confirmDeleteId === article.id ? (
                  <>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(article.id)}>Bekräfta</Button>
                    <Button variant="secondary" size="sm" onClick={() => setConfirmDeleteId(null)}>Avbryt</Button>
                  </>
                ) : (
                  <Button variant="danger" size="sm" onClick={() => setConfirmDeleteId(article.id)}>Radera</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DeleteArticle;
