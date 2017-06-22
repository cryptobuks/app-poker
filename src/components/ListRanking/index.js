'use strict'

import React from 'react'
import utils from '../../utils'

class ListRanking extends React.Component {

  render() {
    if(this.props.listRanking) {
      return (
        <tbody>
          {this.props.listRanking.map((player, key) => {
            return (
              <tr key={key}>
                <td>{key + 1}</td>
                <td className="ranking-table-name">{this.props.players[player.slug].name}</td>
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

export default ListRanking
