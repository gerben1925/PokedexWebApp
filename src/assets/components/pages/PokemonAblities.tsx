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
  

  interface PokemonInfoProps {
    pokedetails: PokemonDetails;
  }



 const PokemonAblities: React.FC<PokemonInfoProps> = ({pokedetails}) => {
  return (
    <>
        <div>
            <h4 id="PokeName">{pokedetails.abilities.join(", ")}</h4>
        </div>  
    </>
  )
}

export default PokemonAblities;