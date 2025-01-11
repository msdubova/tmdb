import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/Header/MainNav";
import Movies from "./Pages/Movies/Movies";
import Search from "./Pages/Search/Search";
import Series from "./Pages/Series/Series";
import Trending from "./Pages/Trending/Trending";
import Favorites from "./Pages/Favorites/Favorites";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
            <Route path="/favorites" component={Favorites} />
          </Switch>
        </Container>
      </div>

      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
