'use strict'

import React from 'react'
import FontIcon from 'material-ui/FontIcon'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

class Icon extends React.Component {

  render() {
    return(
      <MuiThemeProvider>
        <FontIcon className="material-icons">{this.props.type}</FontIcon>
      </MuiThemeProvider>
    )
  }
}

export default Icon
