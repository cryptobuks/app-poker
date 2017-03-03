'use strict'

import React from 'react';
import ListRanking from './ListRanking'
import api from '../libs/api';

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
            <span>Pote atual: {this.state.turn.jackpot}</span>
            <span>Inicio do torneio: {this.state.turn.date}</span>

            <table>
              <thead>
                <tr>
                  <td>Posição</td>
                  <td>Nome</td>
                  <td>Pontos</td>
                  {this.state.steps.map((step, key) => {
                    return (
                      <td key={key}>{step}</td>
                    )
                  })}
                  <td>Prêmio</td>
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

export default Ranking;
