import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerPokemonesAccion,
  siguientePokemonAccion,
} from "../redux/pocketDucks";

function Pokemones() {
  const dispatch = useDispatch();
  const pokemones = useSelector((store) => store.pokemones.array);

  return (
    <div>
      <h1> lista de pokemones</h1>
      <button onClick={() => dispatch(obtenerPokemonesAccion())}>
        Obtener pokemones
      </button>
      <button onClick={() => dispatch(siguientePokemonAccion(20))}>
        Siguiente
      </button>
      <ul>
        {pokemones.map((item) => (
          <li key={item.url}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Pokemones;
