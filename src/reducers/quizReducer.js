import { FETCH_QUESTIONS, INC_SCORE, SET_DETAILS, RESET_SCORE } from '../actions/types'

const initialState = { questions: null, score: 0, alias: '', diff: 'any', cat: 'any' } // the initial cat and diff will always be 'any' in case the player doesn't choose

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_DETAILS:
      return {
        ...state,
        alias: action.payload.alias,
        diff: action.payload.diff,
        cat: action.payload.cat,
      }

    case FETCH_QUESTIONS:
      return {
        ...state,
        questions: action.payload
      }

    case INC_SCORE:
      return {
        ...state,
        score: state.score + 1
      }

    case RESET_SCORE:
      return {
        ...state,
        score: 0
      }

    default:
      return state
  }
}
