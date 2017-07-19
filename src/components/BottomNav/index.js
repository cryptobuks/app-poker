'use strict'

import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Link } from 'react-router-dom'
import Icon from '../Icon'

import './style.css'

class BottomNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bottom-nav">
        <Link className="bottom-nav-item active" to="/">
          <Icon type="list" />
        </Link>

        <Link className="bottom-nav-item" to="/regras">
          <Icon type="list" />
        </Link>
      </div>
    )
  }
}

export default BottomNav
