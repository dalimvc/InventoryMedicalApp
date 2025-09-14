import { useState } from "react";
import ArticlesList from "./ArticlesList";
import useFetch from "./useFetch";
import SearchBox from "./SearchBox";

//home page displays articles in table
//it uses useFetch to get articles from the API and SearchBox for searching articles and ArticlesList for displaying articles in a table
const Home = () => {
  const { error, isPending, data: articles } = useFetch("https://localhost:7075/api/articles");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = articles
    ? articles.filter(article =>
        article.namn.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="home container mt-4">

      <h2 className="secondH text-center mb-4">Artiklar i lager</h2>
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {error && <div>{error}</div>}
      {isPending && <div>Laddar...</div>}

      {articles && filteredArticles.length > 0 && (
        <ArticlesList articles={filteredArticles} />
      )}

      {articles && filteredArticles.length === 0 && (
        <div className="text-center mt-3 text-muted">Inga resultat hittades</div>
      )}
    </div>
  );
};

export default Home;
