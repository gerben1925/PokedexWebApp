import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Evolutions from "./pages/Evolutions";
import PokemonInfo from "./pages/PokemonInfo";
import PokemonStats from "./pages/PokemonStats";
import PokemonAblities from "./pages/PokemonAblities";

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  img: string;
  types: string[];
  abilities: string[];
  stats: number[];
  statusname: string[];
}

interface PokemonSpecies {
  color: string;
  habitat: string;
  egg_group: string[];
  text_entries: string[];
  growth_rate: string;
  evolution_chain_url: string;
}

interface PokemonEvolution {
  evolutions: string[];
  // evolves_2: string[];
}

export default function Details() {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | null>(
    null
  );
  const [pokemonEvo, setPokemonEvo] = useState<PokemonEvolution | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const pokemonData = response.data;

        const pokemonDetailsData: PokemonDetails = {
          id: pokemonData.id,
          name: pokemonData.name,
          height: pokemonData.height,
          weight: pokemonData.weight,
          img: pokemonData.sprites.other.dream_world.front_default,
          types: pokemonData.types.map(
            (type: { type: { name: string } }) => type.type.name
          ),
          abilities: pokemonData.abilities.map(
            (ability: { ability: { name: string } }) => ability.ability.name
          ),
          stats: pokemonData.stats.map(
            (stat: { base_stat: number }) => stat.base_stat
          ),
          statusname: pokemonData.stats.map(
            (statname: { stat: { name: string } }) => statname.stat.name
          ),
        };

        setPokemonDetails(pokemonDetailsData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon details", error);
      }
    }

    async function fetchPokemonSpecies() {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        const pokemonData = response.data;

        const pokemonSpeciesData: PokemonSpecies = {
          color: pokemonData.color.name,
          habitat: pokemonData.habitat.name,
          egg_group: pokemonData.egg_groups.map(
            (group: { name: string }) => group.name
          ),
          text_entries: pokemonData.flavor_text_entries.map(
            (entry: { flavor_text: string }) => entry.flavor_text
          ),
          growth_rate: pokemonData.growth_rate.name,
          evolution_chain_url: pokemonData.evolution_chain.url,
        };

        setPokemonSpecies(pokemonSpeciesData);
        fetchPokemonEvo(pokemonData.evolution_chain.url);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon Species", error);
      }
    }

    async function fetchPokemonEvo(evo_url: string) {
      try {
        const response = await axios.get(`${evo_url}`);
        const pokemonData = response.data;
        const pokemonEvolveData: PokemonEvolution = {
          evolutions: pokemonData.chain.evolves_to.flatMap(
            (evolve_1: { evolves_to: { species: { name: string } }[] }) =>
              evolve_1.evolves_to.map(
                (evolve_2: { species: { name: string } }) =>
                  evolve_2.species.name
              )
          ),
        };

        //console.log(pokemonEvolveData);
        setPokemonEvo(pokemonEvolveData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon Evolution", error);
      }
    }

    fetchPokemonDetails();
    fetchPokemonSpecies();
  }, [id]);

  if (!pokemonDetails || !pokemonSpecies) {
    return (
      <div className="loading-container">
        <div className="loading-text">
          {" "}
          <h4 id="PokeName" style={{ fontSize: "4rem" }}>
            No Data
          </h4>
        </div>
      </div>
    );
  }

  const ClassNames: string[] = [];
  const typename: string[] = [];

  pokemonDetails.types.forEach((type) => {
    switch (type.toLowerCase()) {
      case "grass":
        ClassNames.push("btn-success btn-lg text-white");
        typename.push("Grass");
        break;
      case "fire":
        ClassNames.push("btn-danger btn-lg text-white");
        typename.push("Fire");
        break;
      case "water":
        ClassNames.push("btn-primary btn-lg text-white");
        typename.push("Water");
        break;
      case "psychic":
        ClassNames.push("btn-warning btn-lg text-white");
        typename.push("Psychic");
        break;
      case "fighting":
        ClassNames.push("btn-info btn-lg text-white");
        typename.push("Fighting");
        break;
      default:
        ClassNames.push("btn-secondary btn-lg text-white");
        typename.push("Unknown");
        break;
    }
  });

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
      <div className="container" style={{ marginTop: "7rem" }}>
        <div className="row mt-5">
          <PokemonInfo
            pokedetails={pokemonDetails}
            pokespecies={pokemonSpecies}
          />
        </div>
        <div className="row mt-4 mb-5">
          <div className="col-md-5 col-lg-5 col-sm-5">
            <h4 id="PokeName" style={{ fontSize: "2rem" }}>
              Abilities
            </h4>
            <PokemonAblities pokedetails={pokemonDetails} />
            {pokemonEvo ? (
              <Evolutions pokeevolve={pokemonEvo} />
            ) : (
              <div className="loading-container">
                <div className="loading-text">
                  <h4 id="PokeName" style={{ fontSize: "4rem" }}>
                    No Evolution Data
                  </h4>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-7 col-lg-7 col-sm-7">
            <PokemonStats pokedetails={pokemonDetails} />
          </div>
        </div>
      </div>
    </>
  );
}
