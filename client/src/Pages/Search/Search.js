import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import "./Search.css";
import { useCallback, useState, useEffect } from "react";
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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    if (query) {
      setSearchText(query);
      fetchSearch(query);
    }
  }, [location.search]);

  const fetchSearch = useCallback(
    async (queryOverride) => {
      if (!isValidInput(queryOverride || searchText)) {
        setError("Please use only English letters and numbers.");
        return;
      } else {
        setError("");
      }

      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/${
            type ? "tv" : "movie"
          }?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${
            queryOverride || searchText
          }&page=${page}&include_adult=false`
        );
        setContent(data.results.slice(0, 12));
        setNumOfPages(data.total_pages);
      } catch (error) {
        console.error(error);
      }
    },
    [type, searchText, page]
  );

  useEffect(() => {
    if (searchText.trim() !== "") {
      fetchSearch();
    }
  }, [type, page, searchText]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchSearch();
    }
  };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="search">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            onClick={() => fetchSearch()}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>

        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
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
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>

      <div className="trending">
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
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>

      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
