//import { useParams } from "react-router-dom";
//import { useState, useEffect } from "react";
//import axios from "axios";

import { Link } from "react-router-dom";


interface PokemonEvolution{
    evolutions: string[];
   // evolves_2: string[];
  }

  interface PokemonInfoProps {
    pokeevolve: PokemonEvolution;
  }

  
  const Evolutions: React.FC<PokemonInfoProps> = ({ pokeevolve }) => {


    return (
        <>
         <div >
            <h4 id="PokeName" style={{ fontSize: '2rem' }} className="mt-3">Evolutions</h4>
            {pokeevolve ? (
                <div>
                {pokeevolve.evolutions.map((evolution, index) => (
                    <div key={index}>
                      
                       <Link  to={`/${evolution}`}><h2 id="PokeName" style={{ fontSize: '2rem', marginTop:'1rem' }}>{evolution}</h2></Link>
                    </div>
                ))}
                </div>
            ) : (
                <div>No evolutions found.</div>
            )}
        </div>
        </>
  );
};

export default Evolutions;
