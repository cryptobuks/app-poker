'use strict'

import React from 'react'
import api from '../../libs/api'
import ListRanking from '../ListRanking'
import utils from '../../utils'

import './style.css'

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      turn: {},
      steps: [],
      ranking: []
    }

    // setTimeout(() => {
      this.loadRanking();
    // }, 5000)
  }

  /**
   * Carrega ranking do torneio atual
   */
  loadRanking() {
    api.getTournament().then((response) => {

      this.setState({
        turn: response.data.turn,
        steps: response.data.steps,
        ranking: response.data.ranking
      })
    })
  }

  render() {
    return(
      <div>
        {this.state.ranking.length == 0 ?
          <span>Carregando...</span>
          :
          <div>
            <span>Pote atual: {utils.formatToReal(this.state.turn.jackpot)}</span>
            <span>Inicio do torneio: {this.state.turn.date}</span>

            <table className="ranking-table">
              <thead>
                <tr>
                  <th>Posição</th>
                  <th className="ranking-table-name">Nome</th>
                  <th>Pontos</th>
                  {this.state.steps.map((step, key) => {
                    return (
                      <th key={key}>{step}</th>
                    )
                  })}
                  <th>Prêmio</th>
                </tr>
              </thead>

              <ListRanking listPlayers={this.state.ranking} />

            </table>
          </div>
        }
      </div>
    )
  }
}

export default Ranking
