import React, { PureComponent } from 'react'
import {parseHtml} from '../../generalHelpers'

import './quizPage.css'

export default class Question extends PureComponent {

  state = {
    index: null,
    result: null,
  }

  render() {
    return (
      <div className="qz443QuestionCard z-depth-3">
          {this.getCardContent()}
      </div>
    )
  }


  getCardContent = () => {
    return (
      <div className="qz443CardContent">
        <div className="qz443QuesCounterDiv">
          Ques {this.props.counter + 1}/10
        </div>

        <div className="qz443QuesDiv">
          <p>{parseHtml(this.props.item.question)}</p>
        </div>

        {
          this.props.item.options.map((item, index) => {

            let resultClass = null;
            if(this.state.result === true && this.state.index === index) {
              resultClass = '#97ea7c'
            } else if (this.state.result === false && this.state.index === index){
              resultClass = '#fc4c64eb'
            } else {
              resultClass = ''
            }

            return (
              <div key={index.toString()} className="valign-wrapper qz443AnswerCard" style={{ background: resultClass }} onClick={() => this.onAnswerClick(index)}>

                {parseHtml(item)}

              </div>
            )
          })
        }

      </div>
    )
  }

  onAnswerClick = (index) => {

    this.setState({
      index: index,
      result: this.props.item.options[index] === this.props.item.correct_answer
    })

    setTimeout(() => {
      this.props.submitAnswer(this.props.item.options[index] === this.props.item.correct_answer)
    }, 200);

  }

}
