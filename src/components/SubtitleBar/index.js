'use strict'

import React from 'react'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Paper from 'material-ui/Paper'

import './style.css'

class SubtitleBar extends React.Component {

  render() {
    return(
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Paper className="subtitle" zDepth={2}>
          {this.props.text}
        </Paper>
      </MuiThemeProvider>
    )
  }
}

export default SubtitleBar
