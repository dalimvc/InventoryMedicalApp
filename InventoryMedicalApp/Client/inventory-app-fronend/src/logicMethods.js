//methods used in multiple components to avoid code duplication
export const handleQuantityChange = (id, value, setQuantities, setValidities) => {
  const cleaned = value.replace(/[^0-9]/g, "");
  if (cleaned === "") {
    setQuantities(prev => ({ ...prev, [id]: "" }));
    setValidities(prev => ({ ...prev, [id]: true }));
    return;
  }

  const numValue = Number(cleaned);
  if (numValue < 0) {
    setValidities(prev => ({ ...prev, [id]: false }));
  } else {
    setValidities(prev => ({ ...prev, [id]: true }));
    setQuantities(prev => ({ ...prev, [id]: cleaned }));
  }
};

export const handleUpdate = async (article, quantities, updateArticle, setQuantities, setArticles) => {
  const newAmount = quantities[article.id];
  if (newAmount === "" || Number(newAmount) < 0) {
    alert("Antal måste vara 0 eller positivt!");
    return;
  }

  try {
    const updatedArticle = await updateArticle(article.id, Number(newAmount));

    if (updatedArticle) {
      setArticles(prev =>
        prev.map(a => (a.id === updatedArticle.id ? updatedArticle : a))
      );
      setQuantities(prev => ({ ...prev, [article.id]: "" }));
    } else {
      alert("Det gick inte att uppdatera artikeln");
    }
  } catch (err) {
    alert(err.message);
  }
};
