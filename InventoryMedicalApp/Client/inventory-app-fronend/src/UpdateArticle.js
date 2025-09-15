//update article component for updating the quantity of an article in the inventory
//it uses useFetch to get the articles from the API and searchbox for searching articles and ArticlesTableUpdate for displaying articles 
import SearchBox from "./SearchBox";
import ArticlesTableUpdate from "./ArticlesTableUpdate";
import { handleQuantityChange, handleUpdate } from "./logicMethods";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";

const UpdateArticle = () => {
  const { data: fetchedArticles, isPending, error, updateArticle } = useFetch(
    "https://localhost:7075/api/articles"
  );

  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const [validities, setValidities] = useState({});

  useEffect(() => {
    if (fetchedArticles) setArticles(fetchedArticles);
  }, [fetchedArticles]);

  const filteredArticles = articles.filter(a =>
    a.namn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home container mt-4">
      <h2 className="secondH text-center mb-4">Artiklar i lager</h2>
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {error && <div>{error}</div>}
      {isPending && <div>Laddar...</div>}
      <ArticlesTableUpdate 
        articles={filteredArticles}
        quantities={quantities}
        validities={validities}
        handleQuantityChange={(id, value) => handleQuantityChange(id, value, setQuantities, setValidities)}
        handleUpdate={(article) => handleUpdate(article, quantities, updateArticle, setQuantities, setArticles)}
      />
    </div>
  );
};

export default UpdateArticle;