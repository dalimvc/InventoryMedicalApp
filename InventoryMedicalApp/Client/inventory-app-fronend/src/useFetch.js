import { useState, useEffect } from "react";

//custom hook for fetching data from an API
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsPending(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Could not fetch data for that resource");
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const updateArticle = async (id, antal) => {
    try {
      const res = await fetch(`${url}/${id}/saldo`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ antal: Number(antal) }),
      });
      if (!res.ok) throw new Error("Failed to update article");
      // Update local state
      setData(prev => prev.map(a => a.id === id ? { ...a, antal: Number(antal) } : a));
      return true;
    } catch (err) {
      console.error(err.message);
      return false;
    }
  };

  return { data, isPending, error, updateArticle, refetch: fetchData };
};

export default useFetch;