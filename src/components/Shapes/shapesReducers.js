import {fetchFakeData} from '../../sdk/api.js'
import {responseSchema} from '../../store/schema'
import {normalize} from 'normalizr'

//error //payload //meta //type

const SET_STATE = 'SET_STATE';




const setState = (state, error = false) => ({
    type: 'SET_STATE',
    error: error,
    payload: {
      state: state
    }
});

const fetchState = ({
  type: 'FETCH_STATE',
  payload: {}
});

export const updateCircleAction = (circle) => ({
  type: 'UPDATE_CIRCLE',
  payload: circle
});

export const updateSelectedItem = (id) => ({
  type: 'UPDATE_SELECTED_ITEM',
  payload: {id}
});


export function loadData() {
  // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.
  return function (dispatch) {
    dispatch(fetchState);
    return fetchFakeData().then(
      state => {
        state = normalize(state, responseSchema);
        console.log('normalized state', state);
        return dispatch(setState(state));
      },
      error => dispatch(setState(error, true))
    );
  };
}
