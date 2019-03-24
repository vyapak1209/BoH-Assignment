import React, { Component } from 'react'
import './highscorePage.css'
import Header from '../Header';


export default class HighscorePage extends Component {

  state = {
    highscore: []
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage() // Getting the data from local storage and hydrating the state
  }

  render() {
    return (
      <div>
        <Header />
        <div className="row">
          <div className="col l12">
            <div className="container web-align">
              <div className="valign-wrapper hs05ViewPort">
                {this.getStartScreen()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  getStartScreen = () => {

    return (
      <div className="hs05StartScreenDiv z-depth-3">
        {this.state.highscore.length > 0 ?
          <div className="hs05CardContent">
            <div className="hs05Label">
              Name
            </div>
            <div className="hs05Label">
              Category
            </div>
            <div className="hs05Label">
              Difficulty
            </div>
            <div className="hs05Label">
              Score
            </div>
          </div> : <div className="hs05NoHigh">No Highscores Yet...</div>
        }

        {this.getScores()}

        <a className="waves-effect waves-light btn hs05RedirectBtn" onClick={this.redirectToHome} style={{color: '#f7eee8', background: '#cf6766'}}>Break Some Eggs</a>
      </div>
    )
  }


  getScores = () => {
    return (
      <div className="hs05FullWidth">
        {this.state.highscore.length > 0 ? this.state.highscore.map((item, index) => {
          if(index > 6) { // showing only first 7 high score entries
            return null;
          }
          return (
            <div key = {index.toString()} className="hs05CardContent">
              <div className="hs05Item">
                {item.alias}
              </div>
              <div className="hs05Item">
                {item.cat}
              </div>
              <div className="hs05Item">
                {item.diff}
              </div>
              <div className="hs05Item">
                {item.score}
              </div>
            </div>
          )
        }) : null}
      </div>
    )
  }


  redirectToHome = () => {
    this.props.history.replace('/')
  }


  hydrateStateWithLocalStorage() {
    let highscore = localStorage.getItem("highscore")

    highscore = JSON.parse(highscore)

    if(highscore) {
      this.setState({
        highscore: highscore
      })
    }
  }

}
