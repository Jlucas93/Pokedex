import React, { useCallback, useRef, useState } from 'react';
import axios from 'axios'
import './Styles/styles.css'
function App() {
  // States
  const [pokemon, setPokemon] = useState(null)
  // Refs
  const inputRef = useRef()
  // Callbacks
  const handleSubmit = useCallback(event => {
    event.preventDefault()
    if (!inputRef.current.value)
      return setPokemon(null)
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${inputRef.current.value}`)
      .then(({ data }) => {
        console.log({ data })
        setPokemon({
          sprite_src: data.sprites["front_default"],
          height: data.height,
          name: data.name,
          types: data.types.map(record => record.type.name),
          moves: data.moves,
          stats_sum: data.stats
            .map(record => ({
              name: record.stat.name,
              value: record.base_stat
            }))
            .reduce((a, b) => a + b.value, 0)
        })
      })
      .catch(error => {
        console.error(error)
        setPokemon(null)
      })
  }, [])
  // Render
  return (
    <>
      <div className="search">
        <form onSubmit={handleSubmit} >
          <input type="text"
            ref={inputRef}
            placeholder="Qual Pokemon procura?"
          />
        </form>
        <button onClick={handleSubmit}>Buscar</button>
      </div>
      {pokemon
        && (
          <div className="container">
            <div className="title">
              <img src={pokemon.sprite_src} alt="iamgem do pokemon" />
              <h1>{pokemon.name}</h1>
            </div>
            <div className="divTable">
              <div className="divTableBody"></div>
              <div className="divTableRow">
                <div className="divTableCell">Type</div>
                {pokemon.types.map((type, i) => (
                  <div
                    key={i}
                    className="divTableCell"
                  >{type}</div>
                ))}
              </div>
              <div className="divTableRow">
                <div className="divTableCell">Height</div>
                <div className="divTableCell">{pokemon.height}</div>
              </div>
              <div className="divTableRow">
                <div className="divTableCell">Número de movimentos</div>
                <div className="divTableCell">{pokemon.moves.length}</div>
              </div>
              <div className="divTableRow">
                <div className="divTableCell">Stats</div>
                <div className="divTableCell">
                  {pokemon.stats_sum}
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default App;
