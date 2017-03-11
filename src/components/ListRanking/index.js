'use strict'

import React from 'react'

class ListRanking extends React.Component {

  render() {
    if(this.props.listPlayers) {
      return (
        <tbody>
          {this.props.listPlayers.map((player, key) => {
            return (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{player.name}</td>
                <td>{player.points}</td>
                {player.steps.map((step, key) => {
                  return (
                    <td key={key}>{step}</td>
                  )
                })}
                <td>{player.jackpot}</td>
              </tr>
            )
          })}
        </tbody>
      )
    }
  }
}

export default ListRanking
