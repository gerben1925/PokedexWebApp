//import { useParams } from "react-router-dom";
//import { useState, useEffect } from "react";
//import axios from "axios";

interface PokemonDetails {
  id:number,
  name: string;
  height: number;
  weight: number;
  img: string;
  types: string[];
  abilities: string[];
  stats:number[];
  statusname:string[];
}

interface PokemonSpecies {
  color: string;
  habitat: string;
  egg_group: string[];
  text_entries: string[];
  growth_rate: string;
  evolution_chain_url:string;
}

interface PokemonInfoProps {
  pokedetails: PokemonDetails;
  pokespecies : PokemonSpecies
}

 const PokemonInfo: React.FC<PokemonInfoProps> =  ({pokedetails,pokespecies}) => {

  const ClassNames: string[] = [];
  const typename: string[] = [];
  
  pokedetails.types.forEach((type) => {
    switch (type.toLowerCase()) {
      case 'grass':
        ClassNames.push('btn-success btn-lg text-white');
        typename.push('Grass');
        break;
      case 'fire':
        ClassNames.push('btn-danger btn-lg text-white');
        typename.push('Fire');
        break;
      case 'water':
        ClassNames.push('btn-primary btn-lg text-white');
        typename.push('Water');
        break;
      case 'psychic':
        ClassNames.push('btn-warning btn-lg text-white');
        typename.push('Psychic');
        break;
      case 'fighting':
        ClassNames.push('btn-info btn-lg text-white');
        typename.push('Fighting');
        break;
      default:
        ClassNames.push('btn-secondary btn-lg text-white');
        typename.push('Unknown');
        break;
    }
  });

  return (
    <>
    <div className="col-lg-5 col-md-5 col-sm-6">
            <div className="white-box text-center">
              <img src={pokedetails.img} className="img-responsive" id="img-poke-details" alt={pokedetails.name} />
            </div>
          </div>
          <div className="col-lg-7 col-md-7 col-sm-6">
            <h1 id="PokeName" style={{ fontSize: '5rem' }}>{pokedetails.name}</h1>
            <h4 className="box-title mt-3" style={{ fontSize: '20px' }}>
              {pokespecies.text_entries[0]}
            </h4>
            <div className="table-responsive mt-4" id="pokedetails">
              <table className="table align-middle mt-3 p-3">
                <tbody>
                  <tr>
                    <td className="w-25"><h6 id="PokeName" style={{ fontSize: '1.2rem' }}>ID</h6></td>
                    <td className="w-25"><h6>#{pokedetails.id.toString().padStart(4 ,'0')}</h6></td>
                    <td className="w-25"><h6 id="PokeName" style={{ fontSize: '1.2rem' }}>Color</h6></td>
                    <td className="w-25"><h6>{pokespecies.color}</h6></td>
                  </tr>
                  <tr>
                    <td><h6 id="PokeName" style={{ fontSize: '1.2rem' }}>Height</h6></td>
                    <td><h6>{pokedetails.height}</h6></td>
                    <td><h6 id="PokeName" style={{ fontSize: '1.2rem' }}>Growth Rate</h6></td>
                    <td><h6>{pokespecies.growth_rate}</h6></td>
                  </tr>
                  <tr>
                    <td><h6 id="PokeName" style={{ fontSize: '1.2rem' }}>Weight</h6></td>
                    <td><h6>{pokedetails.weight}</h6></td>
                    <td><h6 id="PokeName" style={{ fontSize: '1.2rem' }}>Egg Groups</h6></td>
                    <td><h6>{pokespecies.egg_group.join(", ")}</h6></td>
                  </tr>
                  <tr>
                    <td><h6 id="PokeName" style={{ fontSize: '1.2rem' }}>Habitat</h6></td>
                    <td><h6>{pokespecies.habitat}</h6></td>
                    <td></td>
                    <td></td>
                  </tr>
  
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <h4 id="PokeName" style={{ fontSize: '2rem' }}>Type</h4>
            {pokedetails.types.map((type, index) => (
              <button  key={index} className={`btn ${ClassNames[index]}`} style={{ marginRight: '12px', marginBottom: '5px', width: '12rem' }}> {type} </button>
                      ))}
            </div>
          </div>
    </>
  )
}


export default PokemonInfo;