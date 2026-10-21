import { useState, useEffect } from "react";
import "./App.css";

const COINS = ["bitcoin", "dogecoin", "solana", "chainlink"];

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPrices() {
      try {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COINS.join(",")}`;
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
  }, []);

  if (loading) return <p className="status">Loading prices...</p>;
  if (error) return <p className="status">{error}</p>;

  return (
    <div className="app">
      <h1>Crypto Watchlist</h1>
      <div className="grid">
        {coins.map((coin) => (
          <div className="card" key={coin.id}>
            <img src={coin.image} alt={coin.name} width="40" />
            <h2>{coin.name}</h2>
            <p className="price">${coin.current_price.toLocaleString()}</p>
            <p className={coin.price_change_percentage_24h >= 0 ? "up" : "down"}>
              {coin.price_change_percentage_24h.toFixed(2)}% (24h)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;