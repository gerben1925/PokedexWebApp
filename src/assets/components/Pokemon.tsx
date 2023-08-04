import { Link } from "react-router-dom";

interface Pokemon {
  name: string;
  height: number;
  id: number;
  img: string;
  types: string[];
}

const PokemonList = ({ pokeList }: { pokeList: Pokemon[] }) => {
  return (
    <>
      <div className="container">
        <div className="container">
          <div className="album py-5 bg-light">
            <div className="container mt-4">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <div id="pokemon-logo">
                    <img src="./pokemomlogo.png" />
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-1 col-lg-1 col-sm-1"></div>
                <div className="col-md-10 col-lg-10 col-sm-10">
                  <div className="row">
                    {pokeList.map((pokemon) => {
                      const badgeClassNames: string[] = [];
                      const typename: string[] = [];
                      const BgColor: string[] = [];

                      pokemon.types.forEach((type) => {
                        switch (type.toLowerCase()) {
                          case "grass":
                            badgeClassNames.push("text-bg-success");
                            BgColor.push("#228b22");
                            typename.push("Grass");
                            break;
                          case "fire":
                            badgeClassNames.push("text-bg-danger");
                            BgColor.push("#FF7F50");
                            typename.push("Fire");
                            break;
                          case "water":
                            badgeClassNames.push("text-bg-primary");
                            BgColor.push("#1E90FF");
                            typename.push("Water");
                            break;
                          case "psychic":
                            badgeClassNames.push("text-bg-warning");
                            BgColor.push("#DB7093");
                            typename.push("Psychic");
                            break;
                          case "fighting":
                            badgeClassNames.push("text-bg-info");
                            BgColor.push("#ADD8E6");
                            typename.push("Fighting");
                            break;
                          case "electric":
                            badgeClassNames.push("text-bg-info");
                            BgColor.push("#FFD700");
                            typename.push("Fighting");
                            break;
                          case "ice":
                            badgeClassNames.push("text-bg-info");
                            BgColor.push("#87CEFA");
                            typename.push("Fighting");
                            break;
                          case "bug":
                            badgeClassNames.push("text-bg-info");
                            BgColor.push("#3CB371");
                            typename.push("Bug");
                            break;
                          case "poison":
                            badgeClassNames.push("text-bg-info");
                            BgColor.push("#DDA0DD");
                            typename.push("Poison");
                            break;
                          case "rock":
                            badgeClassNames.push("text-bg-info");
                            BgColor.push("#A9A9A9");
                            typename.push("Rock");
                            break;
                          case "normal":
                            badgeClassNames.push("text-bg-info");
                            BgColor.push("#B8860B");
                            typename.push("Normal");
                            break;
                          case "ghost":
                            badgeClassNames.push("text-bg-info");
                            BgColor.push("#9370DB");
                            typename.push("Normal");
                            break;
                          case "fairy":
                            badgeClassNames.push("text-bg-info");
                            BgColor.push("#D2B48C");
                            typename.push("Normal");
                            break;

                          default:
                            badgeClassNames.push("text-bg-secondary");
                            BgColor.push("#F5DEB3");
                            typename.push("Unknown");
                            break;
                        }
                      });

                      return (
                        <div
                          key={pokemon.id}
                          className="col-md-4 col-lg-4 col-sm-4 mt-5"
                        >
                          <div
                            className="card"
                            style={{ backgroundColor: BgColor[0] }}
                          >
                            <Link to={`/${pokemon.name}`}>
                              <img
                                src={pokemon.img}
                                className="card-img-top mx-auto d-block"
                                id="img-pok"
                                alt={pokemon.name}
                              />
                            </Link>
                            <div className="card-body">
                              <h6 className="card-title">
                                #{pokemon.id.toString().padStart(4, "0")}
                              </h6>
                              <h3 id="PokeName">{pokemon.name}</h3>
                              {pokemon.types.map((type, index) => (
                                <span
                                  key={index}
                                  className={`badge ${badgeClassNames[index]} mr-2`}
                                  style={{
                                    width: 80,
                                    height: 25,
                                    marginRight: "5px",
                                  }}
                                >
                                  {type}
                                </span>
                              ))}
                              <div className="d-flex justify-content-between align-items-center mt-3">
                                {/*
                              <div className="btn-group">
                               <Link to={`/${pokemon.name}`} className="btn btn-sm btn-outline-secondary">View More</Link> 
                              </div>
                              <small className="text-muted">9 mins</small>*/}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="col-md-1 col-lg-1 col-sm-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonList;
