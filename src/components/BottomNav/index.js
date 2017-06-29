'use strict'

import React from 'react'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import './style.css'

const usersIcon = <FontIcon className="material-icons">group</FontIcon>;
const rankingIcon = <FontIcon className="material-icons">list</FontIcon>;
const infoIcon = <FontIcon className="material-icons">list</FontIcon>;

class BottomNav extends React.Component {
  constructor(props) {
    super(props);

    injectTapEventPlugin();

    this.state = {
      activePage: 0
    }
  }

  /**
   * Ativa item escolhido pelo usuário
   */
  selectNav(index) {
    this.setState({activePage: index})
  }

  render() {
    return (
      <div className="bottom-nav">
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <Paper zDepth={1}>
            <BottomNavigation selectedIndex={this.state.activePage}>
              <BottomNavigationItem
                label="Classificação"
                icon={rankingIcon}
                onTouchTap={() => this.selectNav(0)}
              />
              <BottomNavigationItem
                label="Regras"
                icon={infoIcon}
                onTouchTap={() => this.selectNav(1)}
              />
            </BottomNavigation>
          </Paper>
        </MuiThemeProvider>
      </div>
    )
  }
}

// <BottomNavigationItem
//   label="Jogadores"
//   icon={usersIcon}
//   onTouchTap={() => this.selectNav(1)}
// />

export default BottomNav
