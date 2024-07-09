import React, { useEffect, useState } from "react";

function MovieApp(props) {
  const [coins, setCoins] = useState([]);
  const url = "https://api.coinpaprika.com/v1/tickers";
  const handleLoad = async () => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return <div></div>;
}

export default MovieApp;
