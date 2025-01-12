import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import "./Search.css";
import { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import { useLocation } from "react-router-dom";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [error, setError] = useState("");
  const location = useLocation();

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const isValidInput = (input) => /^[A-Za-z0-9\s]+$/.test(input);

  // First useEffect: Handles URL parameter changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    if (query) {
      setSearchText(query);
      const fetchFromUrl = async () => {
        if (!isValidInput(query)) {
          setError("Please use only English letters and numbers.");
          return;
        }

        try {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/${
              type ? "tv" : "movie"
            }?api_key=${
              process.env.REACT_APP_API_KEY
            }&language=en-US&query=${query}&page=${page}&include_adult=false`
          );
          setContent(data.results.slice(0, 12));
          setNumOfPages(data.total_pages);
          setError("");
        } catch (error) {
          console.error(error);
        }
      };

      fetchFromUrl();
    }
  }, [location.search, type, page]);

  // Second useEffect: Handles updates based on `searchText`, `type`, or `page`
  useEffect(() => {
    const fetchSearch = async () => {
      if (searchText.trim() === "") return;

      if (!isValidInput(searchText)) {
        setError("Please use only English letters and numbers.");
        return;
      }

      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/${
            type ? "tv" : "movie"
          }?api_key=${
            process.env.REACT_APP_API_KEY
          }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        );
        setContent(data.results.slice(0, 12));
        setNumOfPages(data.total_pages);
        setError("");
      } catch (error) {
        console.error(error);
      }
    };

    fetchSearch();
  }, [type, page, searchText]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleSearch = () => {
    // Searching will automatically trigger due to useEffect monitoring searchText
  };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="search" aria-label="Search Section">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            inputProps={{
              "aria-label": "Enter search text",
            }}
          />
          <Button
            onClick={handleSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
            aria-label="Search Button"
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>

        {error && (
          <div
            style={{ color: "red", marginTop: "10px" }}
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}

        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="Search Type Tabs"
        >
          <Tab
            style={{ width: "50%" }}
            label="Search Movies"
            aria-label="Search Movies Tab"
          />
          <Tab
            style={{ width: "50%" }}
            label="Search TV Series"
            aria-label="Search TV Series Tab"
          />
        </Tabs>
      </ThemeProvider>

      <div className="trending" aria-label="Search Results Section">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
              aria-label={`Result: ${c.title || c.name}`}
            />
          ))}
        {searchText &&
          !content &&
          (type ? (
            <h2 aria-live="polite">No Series Found</h2>
          ) : (
            <h2 aria-live="polite">No Movies Found</h2>
          ))}
      </div>

      {numOfPages > 1 && (
        <CustomPagination
          setPage={setPage}
          numOfPages={numOfPages}
          aria-label="Pagination for search results"
        />
      )}
    </div>
  );
};

export default Search;
