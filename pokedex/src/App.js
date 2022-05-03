import React, { useState } from 'react';
import axios from 'axios'
import styles from './Styles/styles.css'

function App() {
  const [pokemon, setPokemon] = useState()
  const [pokemonType, setPokemonType] = useState([])
  const [pokemonData, setPokemonData] = useState([])
  const [pokemonStat, setPokemonStats] = useState([])
  
  const getPokemon = async () => {
    const toArray = []
    try{

        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        const res = await axios.get(url)
        setPokemon(res.data.name)
    
        toArray.push(res.data)
        setPokemonType(res.data.types[0].type.name)
        setPokemonStats(res.data.stats
            .map(s => s.base_stat)
            .reduce((a, b) => a +b))
        setPokemonData(toArray)
        console.log(pokemon)
        console.log(res.data)
    } catch (e) {
        alert("Pokemon não encontrado")
        window.location.reload()
    }
}
    const handleSubmit = (e) => {
        e.preventDefault();
        getPokemon();
    };
    const handleChange = (e) => {
        setPokemon(e.target.value.toLowerCase())
    }

  return (
    <>
        <div className="search">
        <form onSubmit={handleSubmit} >
            <input type="text"
            onChange={handleChange}

            placeholder="Qual Pokemon procura?"
            />
        </form>
            <button onClick={handleSubmit}>Buscar</button>
        </div>

        {pokemonData.map((data)=> {
            return (
                <div className="container">
                    <div className="title">
                    <img src= {data.sprites["front_default"]} alt="iamgem do pokemon"/>
                    <h1>{data.name}</h1>
                    </div>
                    <div className="divTable">                        
                        <div className="divTableBody"></div>
                            <div className="divTableRow">
                                <div className="divTableCell">Type</div>
                                <div className="divTableCell">{pokemonType}</div>
                            </div>
                            <div className="divTableRow">
                                <div className="divTableCell">Height</div>
                                <div className="divTableCell">{data.height}</div>
                            </div>
                            <div className="divTableRow">
                                <div className="divTableCell">Número de movimentos</div>
                                <div className="divTableCell">{data.moves.length}</div>
                            </div>
                            <div className="divTableRow">
                                <div className="divTableCell">Stats</div>
                                <div className="divTableCell">{pokemonStat} de poder</div>
                            </div>
                    </div>
                </div>
            )
        })}
    </>
  );
}

export default App;
