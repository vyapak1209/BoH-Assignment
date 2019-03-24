import { FETCH_QUESTIONS, INC_SCORE, SET_DETAILS, RESET_SCORE } from './types';
import {normalizePayload, getCategory, getDiff} from '../generalHelpers'

export const fetchQuestions = (alias, diff, cat) => dispatch => {

  dispatch({ // To set the player details beforehand
    type: SET_DETAILS,
    payload: {
      'alias': alias,
      'diff': getDiff(diff),
      'cat': getCategory(cat),
    }
  })

  let difficulty = (diff && diff !== 'any') ? diff : '';
  let category = (cat && cat !== 'any') ? cat : '';

  let url = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&category=${category}&type=multiple`

  fetch(url)
    .then((resp) => resp.json())
    .then((response) => {
      dispatch({
        type: FETCH_QUESTIONS,
        payload: normalizePayload(response.results) // Normalizing the payload to splice unnecessary datapoints
      })
    })
}

export const resetScore = () => dispatch => { // Resetting the score after redirected to home
  dispatch({
    type: RESET_SCORE
  })
}

export const incScore = () => dispatch => { // Score increase
  dispatch({
    type: INC_SCORE,
  })
}



