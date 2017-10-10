'use strict'

import React from 'react'
import utils from '../../utils'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

let pathPublic = '/public/';

if(process.env.NODE_ENV == 'production') {
  pathPublic = ''
}

class ListRanking extends React.Component {

  render() {
    if(this.props.listRanking) {
      return (
        <tbody>
          {this.props.listRanking.map((player, key) => {
            return (
              <tr key={key}>
                <td>{key + 1}</td>
                <td className="ranking-table-name">
                  <MuiThemeProvider>
                    <IconButton
                      tooltipPosition="top-center"
                      tooltip={this.props.players[player.slug].name}
                    >
                      <Avatar className="avatar" src={pathPublic + 'images/players/' + this.props.players[player.slug].avatar + '.jpg'} />
                    </IconButton>
                  </MuiThemeProvider>
                </td>
                <td>{player.scoreAcumulate}</td>
                {player.steps.map((step, key) => {
                  return (
                    <td key={key}>{step.position}</td>
                  )
                })}
                <td>{utils.formatToReal(player.jackpotAcumulate)}</td>
              </tr>
            )
          })}
        </tbody>
      )
    }
  }
}

ListRanking.propTypes = {
  players: PropTypes.object,
  listRanking: PropTypes.array
}

export default ListRanking
