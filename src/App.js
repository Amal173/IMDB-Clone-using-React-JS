import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import Watchlist from "./Components/Watchlist/Watchlist";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="Watchlist" element={<Watchlist />} />
        <Route path="/" element={<Home />} />
        <Route path="Movie" element={<MovieDetails />} />
        <Route element={PageNotFound} />
        <Route element={Footer} />
      </Routes>
    </div>
  );
}

export default App;
