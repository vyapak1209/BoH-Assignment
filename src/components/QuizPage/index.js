import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchQuestions, incScore, resetScore } from '../../actions/quizActions';
import Question from './Question';
import Header from '../Header';

import './quizPage.css'
import { ROUTES } from '../../navigationUtils/routes';

class QuizPage extends PureComponent {

  state = {
    counter: 0,
    score: 0.
  }

  componentDidMount() {

    let alias = this.props.match.params.alias
    let cat = this.props.match.params.cat
    let diff = this.props.match.params.diff

    this.props.resetScore() // when redirected to home from after running atleast a single round of quiz, the score in the redux store needs to be reset

    this.props.fetchQuestions(alias, diff, cat) // fetching the questions

  }


  componentDidUpdate() {
    if (this.state.counter === 10) { // As soon as the counter reaches 10 => redirect to result page
      let url = ROUTES.QUIZ_BASE + ROUTES.RESULT_PAGE;
      this.props.history.replace(url)
    }
  }


  render() {
    console.log(this.props.questions)
    return (
      <div>
        <Header />
        <div className="row">
          <div className="col l12">
            <div className="container web-align">
              <div className="valign-wrapper qz443ViewPort">

                <div className="qz443ScoreDiv">
                  Your Score: {this.props.score}/{this.state.counter}
                </div>

                {this.getRequiredScreen()}

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  getRequiredScreen = () => {

    if (!this.props.questions) {
      return this.getLoader()
    }

    if (this.props.questions && this.props.questions.length > 0) {
      return this.props.questions.map((item, index) => {
        if (index === this.state.counter) {
          return (
            <Question
              key={index.toString()}
              counter={index}
              item={item}
              submitAnswer={this.onSubmitAnswer.bind(this)}
            />
          )
        } else {
          return null;
        }
      })
    }

    if (this.props.questions && this.props.questions.length === 0) {
      return (
        <div className = "qz443NoQuestionsDiv">
          <div className="qz443NoQuestionsText">
            There are no questions in this category with {this.props.diff} difficulty.
          </div>
          <a className="waves-effect waves-light btn qz443RedirectBtn" onClick={this.redirectToHome} style={{color: '#cf6766', background: '#f7eee8'}}>Back To Home</a>
        </div>
      )
    }

  }


  onSubmitAnswer = (result) => {

    if (result) {
      this.props.incScore();
    }

    this.setState((prevState) => {
      return {
        counter: prevState.counter + 1
      }
    })

  }


  redirectToHome = () => {
    this.props.history.replace('/')
  }


  getLoader = () => {
    return (
      <div className="qz443LoaderDiv">
        <div className="preloader-wrapper big active ">
          <div className="spinner-layer spinner-yellow-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  questions: state.quiz.questions,
  score: state.quiz.score,
  diff: state.quiz.diff
})

export default connect(mapStateToProps, { fetchQuestions, incScore, resetScore })(QuizPage)
