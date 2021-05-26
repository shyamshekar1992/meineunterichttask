import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import SearchIcon from "@material-ui/icons/Search";
import UIButton from "@material-ui/core/Button";
import { Container, Box } from "@material-ui/core";
import axios from "axios";
import constants from "../Constants/constants";

import Cardnew from "./card";
import { forEach } from "react-bootstrap/ElementChildren";

const Search = () => {
  const [keyword, setSearch] = React.useState("");
  const [productsList, setProductsList] = React.useState([]);
  //search query function
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(constants.backend_url + "api/v1/movie/getMovies")
      .then((response) => {
        // setProductsList(response.data);
        let filteredUsers = response.data.filter((item) => {
          const query = keyword.toLowerCase();

          return (
            item.Title.toLowerCase().indexOf(query) >= 0 ||
            item.Director.toLowerCase().indexOf(query) >= 0 ||
            item.Plot.toLowerCase().indexOf(query) >= 0
          );
        });
        setProductsList(filteredUsers);
        setSearch("");
      });
  };

  //updating databse from the api information with querying the title space in the url and the year 2001

  const updateList = (e) => {
    e.preventDefault();

    axios
      .get("http://www.omdbapi.com/?apikey=8b006a97&s=space")
      .then((response) => {
        response.data.Search.forEach((movie) =>
          axios
            .get("http://www.omdbapi.com/?apikey=8b006a97&i=" + movie.imdbID)
            .then((response) => {
              if (response.data.Year >= "2001") {
                axios
                  .post(
                    constants.backend_url + "api/v1/movie/add/",
                    response.data
                  )
                  .then((response) => {
                    console.log(response.status);
                  });
              }
            })
        );
      });
  };
  return (
    <div
      class="container-lg shadow p-3 mb-5 bg-body rounded text-dark "
      style={{ marginTop: "8%" }}
    >
      <button className="btn btn-primary" onClick={updateList}>
        Update Database
      </button>
      <br></br>
      <div class="d-flex justify-content-center">
        {" "}
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <UIButton type="submit" onClick={handleSubmit}>
            <SearchIcon />
          </UIButton>
        </form>
      </div>

      <br></br>
      <br></br>
      <div>
        <Box
          boxShadow={5}
          bgcolor="background.paper"
          m={1}
          p={1}
          style={{ width: "auto", height: "auto", borderRadius: "10px" }}
        >
          {productsList != "" ? (
            <main className="container">
              <div className="h1 text-center" id="pageHeaderTitle">
                Search Results
              </div>
              <Cardnew items={productsList} />
            </main>
          ) : (
            <h3>No search results</h3>
          )}
        </Box>
      </div>
      <br></br>
      <br></br>
    </div>
  );
};
export default Search;
