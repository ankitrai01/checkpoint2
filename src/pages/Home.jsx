import { useEffect, useState } from "react";
import Quotecard from "../components/Quotecard";

function Home() {
  const [quote, setQuote] = useState(null);
  const [likedQuotes, setLikedQuotes] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("likedQuotes");
    setLikedQuotes(data ? JSON.parse(data) : []);
  }, []);

  const fetchQuote = async () => {
    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      const data = await res.json();
      setQuote(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleLikeToggle = (id) => {
    let updated;

    if (likedQuotes.includes(id)) {
      updated = likedQuotes.filter((q) => q !== id);
    } else {
      updated = [...likedQuotes, id];
    }

    setLikedQuotes(updated);
    localStorage.setItem("likedQuotes", JSON.stringify(updated));
  };

  return (
    <div>
      <h1>Random Quote</h1>

      <button onClick={fetchQuote}>New Quote</button>

      {!quote ? (
        <p>Loading...</p>
      ) : (
        <Quotecard
          quote={quote}
          isLiked={likedQuotes.includes(quote.id)}
          onLikeToggle={handleLikeToggle}
        />
      )}
    </div>
  );
}

export default Home;
