import React, { useState, useEffect } from "react";

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    fetch("https://amazon-affiliate-api.com/bestsellers", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setBestSellers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      });
  }, [API_KEY]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred.</p>;
  }

  return (
    <div>
      {bestSellers.map((bestSeller) => (
        <div key={bestSeller.category}>
          <h2>{bestSeller.category}</h2>
          <ul>
            {bestSeller.items.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BestSellers;
