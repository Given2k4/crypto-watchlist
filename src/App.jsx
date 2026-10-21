import { useState, useEffect } from "react";
import "./App.css";

const DEFAULT_COINS = ["bitcoin", "ethereum", "solana", "chainlink"];

function loadSaved() {
  try {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : DEFAULT_COINS;
  } catch {
    return DEFAULT_COINS;
  }
}

function App() {
  const [watchlist, setWatchlist] = useState(loadSaved);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Save the list whenever it changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Fetch prices whenever the list changes
  useEffect(() => {
    if (watchlist.length === 0) {
      setCoins([]);
      setLoading(false);
      return;
    }
    async function loadPrices() {
      setLoading(true);
      setError("");
      try {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${watchlist.join(",")}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Request failed");
        setCoins(await res.json());
      } catch {
        setError("Could not load prices. Try again shortly.");
      } finally {
        setLoading(false);
      }
    }
    loadPrices();
  }, [watchlist]);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResults(data.coins.slice(0, 5));
    } catch {
      setResults([]);
    } finally {
      setSearching(false);
    }
  }

  function addCoin(id) {
    if (!watchlist.includes(id)) setWatchlist([...watchlist, id]);
    setResults([]);
    setQuery("");
  }

  function removeCoin(id) {
    setWatchlist(watchlist.filter((coinId) => coinId !== id));
  }

  return (
    <div className="app">
      <h1>Crypto Watchlist</h1>

      <form className="search" onSubmit={handleSearch}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a coin, e.g. dogecoin"
        />
        <button type="submit">{searching ? "..." : "Search"}</button>
      </form>

      {results.length > 0 && (
        <ul className="results">
          {results.map((r) => (
            <li key={r.id}>
              <span>
                {r.name} ({r.symbol})
              </span>
              <button onClick={() => addCoin(r.id)}>Add</button>
            </li>
          ))}
        </ul>
      )}

      {loading && <p className="status">Loading prices...</p>}
      {error && <p className="status">{error}</p>}
      {!loading && !error && coins.length === 0 && (
        <p className="status">Your watchlist is empty. Search for a coin to add.</p>
      )}

      <div className="grid">
        {coins.map((coin) => (
          <div className="card" key={coin.id}>
            <button className="remove" onClick={() => removeCoin(coin.id)}>
              ✕
            </button>
            <img src={coin.image} alt={coin.name} width="40" />
            <h2>{coin.name}</h2>
            <p className="price">${coin.current_price.toLocaleString()}</p>
            <p className={coin.price_change_percentage_24h >= 0 ? "up" : "down"}>
              {coin.price_change_percentage_24h?.toFixed(2)}% (24h)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;