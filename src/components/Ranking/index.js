'use strict'

import React from 'react'
import api from '../../libs/api'
import ListRanking from '../ListRanking'
import Loading from '../Loading'
import utils from '../../utils'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import _ from 'underscore'

import './style.css'

const rotateTable = <FontIcon className="material-icons">screen_rotation</FontIcon>;

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      turns: [],
      steps: [],
      players: {},
      ranking: [],
      tableLayout: 1
    }


    // setTimeout(() => {
      this.loadRanking();
    // }, 5000)
  }

  /**
   * Carrega dependências para criar ranking
   */
  loadRanking() {

    Promise.all([
      api.getTournaments(),
      api.getSteps(),
      api.getPlayers()
    ]).then(([tournaments, steps, players]) => {

      // players: _.indexBy(players.data, 'slug'),
      this.setState({
        players: players.data,
        turns: tournaments.data,
        steps: steps.data
      })

      this.createRanking();

    }).catch(err => {
      console.log('Ops! Ocorreu algo e não foi possível carregar os arquivos ', err);
      // TODO: tratar erro para exibir algo na tela
    });
  }

  /**
   * Cria ranking basedo no último torneio cadastrado
   */
  createRanking() {
    // Último torneio cadastrado
    const tourney = _.last(this.state.turns);
    // console.log('tourney', tourney)

    // Filtra etapas do torneio selecionado
    const listSteps = _.filter(this.state.steps, (step) => step.idTourney == tourney.idTourney);
    // console.log('listSteps', listSteps)

    // Calcula total de pontos dos jogadores
    let rankingTurn = [];

    for(var i = this.state.players.length - 1; i >= 0; i--) {
      let scorePlayer = 0;
      let jackpotPlayer = 0;
      let player = this.state.players[i];

      // Filtra somente etapas que jogador participou
      let stepsPlayer = _.filter(listSteps, (step) => step.player == player.slug);

      // Adiciona jogador apenas se participou de alguma etapa neste torneio
      if(stepsPlayer.length >= 1) {
        // Calcula total de pontos de cada etapa
        stepsPlayer.forEach((step) => {
          let score = tourney.score[step.position] ? tourney.score[step.position] : tourney.score['default'];
          scorePlayer += score;
        });

        // Calcula prêmios já recebidos de cada etapa
        stepsPlayer.forEach((step) => jackpotPlayer += step.jackpot);

        rankingTurn.push({
          slug: player.slug,
          scoreAcumulate: scorePlayer,
          jackpotAcumulate: jackpotPlayer,
          steps: []
        });
      }
    }

    // Ordenação por ordem decrescente
    rankingTurn = _.sortBy(rankingTurn, 'scoreAcumulate').reverse();

    // Atualiza classificação do jogador em cada etapa
    rankingTurn.map((player) => {
      for(var i = 0; i < tourney.steps.length; i++) {
        let position;

        // Verifica se etapa já ocorreu para preencher classificação do jogador
        let findDate = _.find(listSteps, (step) => step.stepDate == tourney.steps[i]);
        if(findDate == undefined) {
          // Caso não tenha ocorrências da etapa,
          // não coloca status do jogador como 'out'
          position = '-';
        } else {
          // Procura classificação do jogador na etapa
          position = _.filter(listSteps, (step) => step.stepDate == tourney.steps[i] && step.player == player.slug);
          position = position[0] && position[0].position ? position[0].position : 'out';
        }

        // Adiciona etapa no ranking do jogador
        player.steps.push({
          date: tourney.steps[i],
          position: position
        });
      }
    })

    // console.log('rankingTurn ', rankingTurn)

    // Ranking + Dados do torneio
    this.setState({
      ranking: rankingTurn,
      tourney: tourney,
      players: _.indexBy(this.state.players, 'slug')
    });
  }


  setLayoutTable() {
    let layout = this.state.tableLayout == 1 ? 0 : 1;
    this.setState({
      tableLayout: layout
    })
  }

  render() {
    return(
      <div>
        {this.state.ranking.length == 0 ?
          <Loading />
          :
          <div>
            <div className="header-tourney">
              <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <Paper className="title" zDepth={2}>
                  Classificação {this.state.tourney.nameTourney}
                </Paper>
              </MuiThemeProvider>

              <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <BottomNavigation className="icon-rotate" selectedIndex={this.state.tableLayout}>
                  <BottomNavigationItem
                    icon={rotateTable}
                    onTouchTap={() => this.setLayoutTable()}
                  />
                </BottomNavigation>
              </MuiThemeProvider>
            </div>

            <div className={this.state.tableLayout == 1 ? 'table-vertical' : 'table-horizontal' }>
              <table className="ranking-table">
                <thead>
                  <tr>
                    <th>Posição</th>
                    <th className="ranking-table-name">Jogador</th>
                    <th>Pontos</th>
                    {this.state.tourney.steps.map((step, key) => {
                      return (
                        <th key={key}>{step}</th>
                      )
                    })}
                    <th>Prêmio</th>
                  </tr>
                </thead>

                <ListRanking players={this.state.players} listRanking={this.state.ranking} />

              </table>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Ranking
