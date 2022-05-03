import React from 'react'

export default function PokemonList({ props }) {
  return (
    <div>

      {props.map(element=>(
        <ul key ={element}>
          <li>{element.name}</li>
        </ul>
      ))}

{/*       {props.map(p => (
        <div key={p}>{p}</div>
      ))} */}

    </div>
  )
}