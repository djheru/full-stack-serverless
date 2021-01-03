import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import "./App.css";

function App() {
  const [coins, updateCoins] = useState([]);
  async function fetchCoins() {
    const data = await API.get("cryptoapi", "/coins");
    updateCoins(data.coins);
  }

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="App">
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
