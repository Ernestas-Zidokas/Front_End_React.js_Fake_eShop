import * as types from './actionTypes';
import { API } from '../constants';
import { RSAA } from 'redux-api-middleware';

export const removeFromCart = id => ({
  type: types.REMOVE_FROM_CART,
  payload: id,
});

export const toggleFavorite = id => ({
  type: types.TOGGLE_FAVORITE,
  payload: id,
});

export const addToCart = payload => ({
  type: types.ADD_TO_CART,
  payload,
});

export const setProducts = payload => ({
  type: types.SET_PRODUCTS,
  payload,
});

export const getProducts = () => ({
  [RSAA]: {
    endpoint: API.getProducts,
    method: 'GET',
    types: [
      types.GET_PRODUCTS,
      types.GET_PRODUCTS_SUCCESS,
      { type: types.GET_PRODUCTS_FAILURE, payload: 'Something went wrong!' },
    ],
  },
});

// export const getProducts = () => async dispatch => {
//   dispatch({ type: types.GET_PRODUCTS });

//   try {
//     const result = await fetch(API.getProducts);
//     const json = await result.json();
//     dispatch({
//       type: types.GET_PRODUCTS_SUCCESS,
//       payload: json,
//     });
//   } catch (error) {
//     dispatch({
//       type: types.GET_PRODUCTS_FAILURE,
//       payload: 'Something went wrong!',
//     });
//   }
// };
