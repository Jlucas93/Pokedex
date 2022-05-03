import React, { useState, useEffect } from 'react';
import PokemonList from './Components/PokemonList'
import axios from 'axios'


function App() {
  const [pokemon, setPokemon] = useState([])

//Passando o nome para Lista de pokemons
useEffect(() => {
  axios.get("https://pokeapi.co/api/v2/pokemon/")
  .then(res => {
    setPokemon(res.data.results) //.map(res => res.name)
  
  })
},[])

//Pegando a soma total do valor de STATS
useEffect(() => {
  axios.get("https://pokeapi.co/api/v2/pokemon/1")
  .then(res => {
    console.log(res.data.stats.map(s=> s.base_stat).reduce((a,b)=> a + b))
  
  })
},[])
  
  return (
    <div>
      <PokemonList props={pokemon}/>
    </div>
  );
}

export default App;
