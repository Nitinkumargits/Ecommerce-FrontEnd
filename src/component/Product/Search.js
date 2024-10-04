import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import MetaData from "../layout/MetaData";
import "./Search.css";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate(); // Use useNavigate instead of history

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`); // Use navigate for navigation
    } else {
      navigate("/products");
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          value={keyword} // Bind the input value to the keyword state
          onChange={(e) => setKeyword(e.target.value)} // Update the state on change
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
