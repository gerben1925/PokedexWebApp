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


const PokemonStats: React.FC<PokemonInfoProps> = ({pokedetails}) => {
  return (
    <>
        <div className="mt-4">
            <h2 id="PokeName" style={{ fontSize: '2rem' }}>Stats</h2>
              {pokedetails.stats.map((statnum, index) => (
              <div className="row" key={index}>
                <div className="col-md-4 col-lg-4">
                <h5 id="PokeName" style={{ fontSize: '1rem' }}>{pokedetails.statusname[index]}</h5>
                </div>
                <div className="col-md-8 col-lg-8">
                <div className="progress mt-2"  style={{ height:'20px'}}>
                  <div className="progress-bar" style={{ width: `${statnum}%` }} role="progressbar" aria-valuenow={statnum} aria-valuemin={0} aria-valuemax={100}>
                    {statnum}
                  </div>
                </div>
                </div>
              </div>
              ))}
        </div>
    </>
  )
}

export default PokemonStats;
