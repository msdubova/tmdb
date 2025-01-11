import "./Trending.css";
import SearchIcon from "@material-ui/icons/Search";
import {
  Button,
  createMuiTheme,
  TextField,
  ThemeProvider,
  CircularProgress, // Importing CircularProgress for loading spinner
} from "@material-ui/core";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import { useHistory } from "react-router-dom";

const Trending = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to show loader while data is being fetched
  const history = useHistory();

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  // Fetching the trending data
  const fetchTrending = async () => {
    setLoading(true); // Start loading
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    setContent(data.results.slice(0, 12));
    setLoading(false); // Stop loading after data is fetched
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  // Handle search functionality
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      history.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Check if Enter key is pressed before triggering search
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(); // Trigger search when Enter is pressed
    }
  };

  return (
    <div>
      <div className="">
        <ThemeProvider theme={darkTheme}>
          <div className="search" style={{ marginBottom: "20px" }}>
            <TextField
              style={{ flex: 1 }}
              className="searchBox"
              label="Search TMDb"
              variant="filled"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown} // Only triggers search on Enter key
            />
            <Button
              onClick={handleSearch}
              variant="contained"
              style={{ marginLeft: 10 }}
            >
              <SearchIcon fontSize="large" />
            </Button>
          </div>
        </ThemeProvider>
      </div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {loading ? ( // Show loading spinner while fetching data
          <div className="loading">
            <CircularProgress color="inherit" size={60} />{" "}
            {/* Circular spinner */}
          </div>
        ) : (
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))
        )}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
