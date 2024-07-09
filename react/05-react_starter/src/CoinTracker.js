import React from "react";

function CoinTracker(props) {
  const url = "https://api.coinpaprika.com/v1/tickers";
  const handleLoad = async () => {
    const response = await fetch(url);
    const data = response.json();
    console.log(data);
  };
  handleLoad();
  return (
    <div>
      <h1>The Coins!</h1>
      <select>
        <option></option>
      </select>
    </div>
  );
}

export default CoinTracker;
