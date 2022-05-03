import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [pokemon, setPokemon] = useState("pikachu")
  const [pokemonData, setPokemonData] = useState([])
  return (
    <div className="App">
      <h1>Hello World!</h1>
    </div>
  );
}

export default App;
