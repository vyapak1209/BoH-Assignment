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
    if(this.state.counter === 10) { // As soon as the counter reaches 10 => redirect to result page
      let url = ROUTES.QUIZ_BASE + ROUTES.RESULT_PAGE;
      this.props.history.replace(url)
    }
  }


  render() {
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

                {this.props.questions.length > 0 ? this.props.questions.map((item, index) => {
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
                }) : this.getLoader()

                }

              </div>
            </div>
          </div>
        </div>
      </div>
    )
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
  score: state.quiz.score
})

export default connect(mapStateToProps, { fetchQuestions, incScore, resetScore })(QuizPage)
