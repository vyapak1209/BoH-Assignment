import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import Header from '../Header'
import {saveScore} from '../../generalHelpers'

import './resultPage.css';

class ResultPage extends PureComponent {

  componentDidMount() {

    let data = this.props

    saveScore({ // saving the score in localStorage
      alias: data.alias,
      diff: data.diff,
      cat: data.cat,
      score: data.score
    })

  }

  render() {
    return (
      <div>
        <Header />
        <div className="row">
          <div className="col l12">
            <div className="container web-align">
              <div className="valign-wrapper rp78ViewPort">
                <div className="rp78ResultCard z-depth-3">
                  {this.getCardContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  getCardContent = () => {
    return (
      <div className="rp78CardContent">
        <div className="rp78AliasHeading">
          Hi {this.props.alias}! You did a {this.props.score > 5 ? 'great' : 'terrible'} job!
        </div>
        <div className="rp78Category">
          <div className="rp78Label">Category  -</div>  {this.props.cat}
        </div>
        <div className="rp78Diff">
          <div className="rp78Label">Difficulty  -</div>  {this.props.diff}
        </div>
        <div className="rp78Score">
          <div className="rp78Label">Score  -</div>  {this.props.score} out of 10
        </div>

        <a className="waves-effect waves-light btn rp78RedirectBtn" onClick={this.redirectToHome} style={{color: '#f7eee8', background: '#cf6766'}}>Break Some Eggs</a>
      </div>
    )
  }


  redirectToHome = () => {
    this.props.history.replace('/')
  }

}

const mapStateToProps = state => ({
  alias: state.quiz.alias,
  diff: state.quiz.diff,
  cat: state.quiz.cat,
  score: state.quiz.score,
})

export default connect(mapStateToProps)(ResultPage)
