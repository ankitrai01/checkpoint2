function Quotecard({ quote, isLiked, onLikeToggle }) {
  if (!quote) return <p>Loading...</p>;

  return (
    <div className="quote-card">
      <h3>"{quote.quote}"</h3>
      <p>- {quote.author}</p>

      <button onClick={() => onLikeToggle(quote.id)}>
        {isLiked ? "❤️ Unlike" : "🤍 Like"}
      </button>
    </div>
  );
}

export default Quotecard;
