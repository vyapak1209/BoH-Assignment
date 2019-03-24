import React, { PureComponent } from 'react'
import {parseHtml} from '../../generalHelpers'

import './quizPage.css'

export default class Question extends PureComponent {

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
            return (
              <div key={index.toString()} className="valign-wrapper qz443AnswerCard" onClick={() => this.onAnswerClick(index)}>

                {parseHtml(item)}

              </div>
            )
          })
        }

      </div>
    )
  }

  onAnswerClick = (index) => {

    this.props.submitAnswer(this.props.item.options[index] === this.props.item.correct_answer)

  }

}
