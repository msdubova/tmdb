import "./Trending.css";
import SearchIcon from "@material-ui/icons/Search";
import {
  Button,
  createMuiTheme,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import { useHistory } from "react-router-dom";
const Trending = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      history.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });
  //define function to get movie data
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );

    setContent(data.results);
  };

  //actually run the fetching data function
  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  //movies use 'title', tv-shows use 'name'
  //movies use 'release date', tv-shows use 'first air date'
  return (
    <div>
      {" "}
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
        {content &&
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
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
