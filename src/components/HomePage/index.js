import React, { Component } from 'react'
import './homePage.css'
import Header from '../Header';
import {ROUTES} from '../../navigationUtils/routes';

export default class HomePage extends Component {

  state = {
    alias: '',
    cat: 'any',
    diff: 'any',
  }

  render() {
    return (
      <div>
        <Header />
        <div className="row">
          <div className="col l12">
            <div className="container web-align">
              <div className="valign-wrapper hp012ViewPort">
                {this.getStartScreen()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  getStartScreen = () => {

    let isDisabled = this.state.alias === '' ? 'disabled' : ''

    return(
      <div className="hp012StartScreenDiv z-depth-3">
        <div className="hp012CardHeading">
          Are you ready?
        </div>

        <div className="hp012InputFieldsDiv">
          <input className="hp012InputField" placeholder="Alias" style={{ fontSize: 20 }} onChange={this.onAliasInput}/>
        </div>

        <div className="hp012CatDropDownDiv">
          {this.getCategoryDropDown()}
        </div>

        <div className="hp012DiffDropDownDiv">
          {this.getDiffDropDown()}
        </div>

        <a className={"waves-effect waves-light btn hp012StartTriviaBtn " + isDisabled} onClick={this.onStartTrivia} style={{color: '#f7eee8', background: '#cf6766'}}>Start Trivia</a>

      </div>
    )
  }


  getCategoryDropDown = () => {
    return (
      <select className="hp012CatDropdown" onChange={this.onCatSelect}>
        <option value="any">Choose a category</option>
        <option value="any">Any Category</option>
        <option value="9">General Knowledge</option>
        <option value="10">Entertainment: Books</option>
        <option value="11">Entertainment: Film</option>
        <option value="12">Entertainment: Music</option>
        <option value="13">Entertainment: Musicals &amp; Theatres</option>
        <option value="14">Entertainment: Television</option>
        <option value="15">Entertainment: Video Games</option>
        <option value="16">Entertainment: Board Games</option>
        <option value="17">Science &amp; Nature</option>
        <option value="18">Science: Computers</option>
        <option value="19">Science: Mathematics</option>
        <option value="20">Mythology</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="24">Politics</option>
        <option value="25">Art</option>
        <option value="26">Celebrities</option>
        <option value="27">Animals</option>
        <option value="28">Vehicles</option>
        <option value="29">Entertainment: Comics</option>
        <option value="30">Science: Gadgets</option>
        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
        <option value="32">Entertainment: Cartoon &amp; Animations</option>
      </select>
    )
  }


  getDiffDropDown = () => {
    return (
      <select className="hp012DiffDropdown" onChange={this.onDiffSelect}>
      <option value="any">Choose difficulty level</option>
        <option value="any">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    )
  }


  onAliasInput = (event) => {
    this.setState({
      alias: event.target.value
    })
  }


  onCatSelect = (event) => {
    this.setState({
      cat: event.target.value
    })
  }


  onDiffSelect = (event) => {
    this.setState({
      diff: event.target.value
    })
  }


  onStartTrivia = () => {
    let url = ROUTES.QUIZ_PAGE + this.state.alias + '&' + this.state.cat + '&' + this.state.diff
    this.props.history.push(url)
  }

}
