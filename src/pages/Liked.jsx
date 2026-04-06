import { useEffect, useState } from "react";

function Liked() {
  const [likedQuotes, setLikedQuotes] = useState([]);
  const [quotes, setQuotes] = useState([]);

  // Load liked IDs
  useEffect(() => {
    const data = localStorage.getItem("likedQuotes");
    const ids = data ? JSON.parse(data) : [];
    setLikedQuotes(ids);
    fetchQuotes(ids);
  }, []);

  // Fetch quotes by ID (IMPORTANT FIX)
  const fetchQuotes = async (ids) => {
    if (ids.length === 0) return;

    try {
      const promises = ids.map((id) =>
        fetch(`https://dummyjson.com/quotes/${id}`).then((res) => res.json()),
      );

      const results = await Promise.all(promises);
      setQuotes(results);
    } catch (error) {
      console.log(error);
    }
  };

  // Unlike
  const handleUnlike = (id) => {
    const updated = likedQuotes.filter((q) => q !== id);

    setLikedQuotes(updated);
    setQuotes(quotes.filter((q) => q.id !== id));

    localStorage.setItem("likedQuotes", JSON.stringify(updated));
  };

  // Empty state
  if (likedQuotes.length === 0) {
    return <h2>No liked quotes yet 😢</h2>;
  }

  return (
    <div>
      <h1>Liked Quotes</h1>

      {quotes.map((q) => (
        <div
          key={q.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
          }}
        >
          <p>"{q.quote}"</p>
          <p>- {q.author}</p>

          <button onClick={() => handleUnlike(q.id)}>❌ Unlike</button>
        </div>
      ))}
    </div>
  );
}

export default Liked;
