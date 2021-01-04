import axios from "axios";

// constantes
const dataInicial = {
  array: [],
  offset: 0,
};

// types
const OBTENER_POKEMONES_EXITO = "OBTENER_POKEMONES_EXITO";
const SIGUIENTES_POKEMONES_EXITO = "SIGUIENTES_POKEMONES_EXITO";

// reducer
export default function pokeReducer(state = dataInicial, action) {
  switch (action.type) {
    case OBTENER_POKEMONES_EXITO:
      return { ...state, array: action.payload };
    case SIGUIENTES_POKEMONES_EXITO:
      return {
        ...state,
        array: action.payload.array,
        offset: action.payload.offset,
      };
    default:
      return state;
  }
}

// acciones
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
  const { offset } = getState().pokemones;
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
    );
    dispatch({
      type: OBTENER_POKEMONES_EXITO,
      payload: res.data.results,
    });
  } catch (err) {
    console.log(err);
  }
};

export const siguientePokemonAccion = (numero) => async (
  dispatch,
  getState
) => {
  const { offset } = getState().pokemones;
  const siguiente = offset + numero;
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${siguiente}&limit=20`
    );
    dispatch({
      type: SIGUIENTES_POKEMONES_EXITO,
      payload: {
        array: res.data.results,
        offset: siguiente,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
