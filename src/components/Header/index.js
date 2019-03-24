import React, { Component } from 'react'
import icon from './images/icon.svg'
import trophyIcon from './images/trophy.svg'
import {Link} from 'react-router-dom'
import {ROUTES} from '../../navigationUtils/routes'

import './header.css'


class Header extends Component {
  render() {
    return (
      <div className="row">
        <div className="col l12 headerMainDiv">
          <div className="container web-align">
            <div className="col l5 headerLogoDiv">
              <div>
                <img alt="icon" src={icon} width="75px" height="75px"/>
              </div>
              <div className="headerText">
                Trivia
              </div>
            </div>
            <div className="col l7 headerHighScoreDiv">
              <img alt="icon" src={trophyIcon} width="30px" height="40px" />
              <Link to={ROUTES.HIGHSCORE}>
                <div className="headerCheckHighScore">
                  Check Highscore
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Header;
