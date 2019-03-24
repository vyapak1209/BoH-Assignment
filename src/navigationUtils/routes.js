import HomePage from '../components/HomePage'
import QuizPage from '../components/QuizPage'
import ResultPage from '../components/ResultPage'
import HighscorePage from '../components/HighscorePage'

import Wrapper from './Wrapper'
import NotFoundPage from './NotFoundPage'

export const ROUTES = {
  HOME_PAGE: "/",
  RESULT_PAGE: "/result",
  QUIZ_BASE: "/quiz",
  QUIZ_PAGE: "/quiz/",
  HIGHSCORE: "/highscore",

  ALIAS: ':alias',
  CAT: ':cat',
  DIFF: ':diff',

}


export default [{
  component: Wrapper, // A normal wrapper around other components. Necessity of react-router-config
  routes: [{
    path: ROUTES.HOME_PAGE,
    exact: true,
    name: 'HomePage',
    component: HomePage,
  },{
    path: ROUTES.HIGHSCORE,
    exact: true,
    name: 'HighscorePage',
    component: HighscorePage,
  }, {
    path: ROUTES.QUIZ_PAGE + ROUTES.ALIAS + '&' + ROUTES.CAT + '&' + ROUTES.DIFF,
    exact: true,
    name: 'QuizPage',
    component: QuizPage,
  }, {
    path: ROUTES.QUIZ_BASE + ROUTES.RESULT_PAGE,
    exact: true,
    name: 'ResultPage',
    component: ResultPage,
  }, {
    name: 'NotFoundPage',
    component: NotFoundPage,
  }],
}];
