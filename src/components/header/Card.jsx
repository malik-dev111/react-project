import React, { useEffect, useState } from 'react';

import "./style.scss";

const Card = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [addedToCart, setAddedToCart] = useState([]);
  useEffect(() => {
    console.log("Card yaratıldı");
    fetch(`https://fakestoreapi.com/products`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleAddToCart = (item) => {
    setAddedToCart([...addedToCart, item]);
  };

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (minPrice === "" || item.price >= parseInt(minPrice)) &&
      (maxPrice === "" || item.price <= parseInt(maxPrice))
  );

  return (
    <div className="card-container">
      <div className="search-bar">
        <input
        className="input3"
          type="text"
          placeholder="Axtar..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <input
        className="input2"
          type="number"
          placeholder="Minimum Qiymət"
          min="0"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <input 
        className="input1"
          type="number"
          placeholder="Maksimum Qiymət"
          min="0"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
      </div>
      <div className="cards-c">
        {filteredData.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.image} alt="" />
            <h1>{item.title}</h1>
            <p>{item.category}</p>
            <button onClick={() => handleAddToCart(item)}>  
              {addedToCart.includes(item)
                ? "Sebətdə"
                : "Sebətə əlavə et"}
            </button>
            <div className="price">{item.price} AZN</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
