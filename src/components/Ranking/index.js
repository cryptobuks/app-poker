'use strict'

import React from 'react'
import api from '../../libs/api'
import ListRanking from '../ListRanking'
import utils from '../../utils'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

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
            <MuiThemeProvider>
              <div className="turn-info">
                <Paper className="turn-info-pot" zDepth={1}>
                  <FontIcon className="material-icons">monetization_on</FontIcon>
                  <span className="turn-info-pot-text">{utils.formatToReal(this.state.turn.jackpot)}</span>
                </Paper>

                <Paper className="turn-info-date" zDepth={1}>
                  <FontIcon className="material-icons">date_range</FontIcon>
                  <span className="turn-info-pot-text">{this.state.turn['next-step']}</span>
                </Paper>
              </div>
            </MuiThemeProvider>

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
