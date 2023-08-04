import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./assets/components/Header";
import { Route, Routes } from "react-router-dom";
import Pokemon from "./assets/components/Pokemon";
import Details from "./assets/components/Details";
import About from "./assets/components/pages/About";

interface PokemonData {
  name: string;
  height: number;
  id: number;
  img: string;
  types: string[];
}

const App = () => {
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=90"
        );
        const results = response.data.results;
        const fetchPokemonList: PokemonData[] = await Promise.all(
          results.map(async (pokemon: { url: string }) => {
            const pokemonDataResponse = await axios.get(pokemon.url);
            return {
              name: pokemonDataResponse.data.name,
              height: pokemonDataResponse.data.height,
              id: pokemonDataResponse.data.id,
              img: pokemonDataResponse.data.sprites.other.dream_world
                .front_default,
              types: pokemonDataResponse.data.types.map(
                (type: { type: { name: string } }) => type.type.name
              ),
            };
          })
        );
        setPokemonList(fetchPokemonList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon data", error);
      }
    }
    fetchPokemonData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">
          <h4 id="PokeName" style={{ fontSize: "4rem" }}>
            Loading...
          </h4>
        </div>
        <div>
          <img src="/pikachu.gif" alt="Loading" className="img-responsive" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Pokemon pokeList={pokemonList} />} />
        <Route path="/:id" element={<Details />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default App;
