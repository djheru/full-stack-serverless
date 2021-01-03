import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import "./App.css";

function App() {
  const [coins, updateCoins] = useState([]);
  const [input, updateInput] = useState({ limit: 5, start: 0 });

  async function fetchCoins() {
    const { limit, start } = input;
    const data = await API.get(
      "cryptoapi",
      `/coins?start=${start}&limit=${limit}`
    );
    updateCoins(data.coins);
  }

  function updateInputValues(type, value) {
    updateInput({ ...input, [type]: value });
  }

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="App">
      <input
        onChange={(e) => updateInputValues("start", e.target.value)}
        placeholder="start"
      />
      <input
        onChange={(e) => updateInputValues("limit", e.target.value)}
        placeholder="limit"
      />
      <button onClick={fetchCoins}>Fetch Coins</button>
      {coins.map((coin, index) => (
        <div key={index}>
          <h4>
            {coin.name} ({coin.symbol})
          </h4>
          <h5>${coin.price_usd}</h5>
        </div>
      ))}
    </div>
  );
}

export default App;
