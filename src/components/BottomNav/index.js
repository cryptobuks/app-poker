'use strict'

import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import { NavLink } from 'react-router-dom'
import Icon from '../Icon'

import './style.css'

let pathPublic = '';

if(process.env.NODE_ENV == 'production') {
  pathPublic = '/app-poker'
}

class BottomNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bottom-nav">
        <NavLink className="bottom-nav-item" activeClassName="active" exact={true} to={pathPublic + '/'}>
          <Icon type="home" />
        </NavLink>

        <NavLink className="bottom-nav-item" activeClassName="active" to={pathPublic + '/galeria-campeoes'}>
          <Icon type="star" />
        </NavLink>

        <NavLink className="bottom-nav-item" activeClassName="active" to={pathPublic + '/regras'}>
          <Icon type="description" />
        </NavLink>
      </div>
    )
  }
}

export default BottomNav
