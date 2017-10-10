'use strict'

import React from 'react'
import api from '../../libs/api'
import ListRanking from '../ListRanking'
import Loading from '../Loading'
import utils from '../../utils'
import FontIcon from 'material-ui/FontIcon'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import SubtitleBar from '../SubtitleBar'
import {Tabs, Tab} from 'material-ui/Tabs'
import _ from 'underscore'

import './style.css'

const rotateTable = <FontIcon className="material-icons">screen_rotation</FontIcon>;
const tabRanking = <FontIcon className="material-icons">assessment</FontIcon>;
const tabInfo = <FontIcon className="material-icons">announcement</FontIcon>;

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      turns: [],
      steps: [],
      players: {},
      ranking: [],
      tableLayout: 1,
      tabActive: 'ranking'
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
          steps: [],
          stepsPositions: []
        });
      }
    }

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

        // Array de posições para auxiliar no critério de desempate
        if(!isNaN(position)) {
          player.stepsPositions.push(position);
        }
      }
    })

    // Ordenação por ordem decrescente
    rankingTurn = _.sortBy(rankingTurn, (player) => -player.scoreAcumulate);

    // Verifica jogadores com mesma pontuação acumulada
    // Regra:
    // Caso o jogador 1 esteja com a mesma pontuação do jogador 2,
    // compara as posições dos jogadores de cada etapa e quem tiver a
    // melhor posição, vai ficar na frente na tabela.
    for(var i = 0; i < rankingTurn.length; i++) {
      // verifica jogador com o próximo na tabela
      if(rankingTurn[i+1] && rankingTurn[i].scoreAcumulate == rankingTurn[i+1].scoreAcumulate) {
        // pega posição das etapas e ordena por ordem crescente
        rankingTurn[i].stepsPositions = _.sortBy(rankingTurn[i].stepsPositions);
        rankingTurn[i+1].stepsPositions = _.sortBy(rankingTurn[i+1].stepsPositions);

        // ordena jogadores de acordo com resultados da posição de cada etapa
        let players = _.sortBy([rankingTurn[i], rankingTurn[i+1]], function(player) {
          return player.stepsPositions
        });

        // edita a tabela baseado nos 2 jogadores ordenados
        rankingTurn[i] = players[0];
        rankingTurn[i+1] = players[1];
      }
    }

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

  tabChange(e) {
    this.setState({
      tabActive: e.currentTarget.dataset.value
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
              <SubtitleBar text={'Classificação ' + this.state.tourney.nameTourney} />

              <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <BottomNavigation className="icon-rotate" selectedIndex={this.state.tableLayout}>
                  <BottomNavigationItem
                    icon={rotateTable}
                    onTouchTap={() => this.setLayoutTable()}
                  />
                </BottomNavigation>
              </MuiThemeProvider>
            </div>

          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <Tabs className="tabs" value={this.state.tabActive}>
              <Tab icon={tabRanking} value="ranking" data-value="ranking" onClick={this.tabChange.bind(this)}>
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
              </Tab>

              <Tab icon={tabInfo} value="info-ranking" data-value="info-ranking" onClick={this.tabChange.bind(this)}>
                <div>
                  <div className="info-header">
                    <p>Pote</p>
                  </div>
                  <p className="info-text">
                    <span className="info-text-item">R$</span> 100,00
                  </p>

                  <div className="info-header">
                    Pontuação
                  </div>
                  <p className="info-text">
                    <span className="info-text-item">1º</span> 100 pontos <br />
                    <span className="info-text-item">2º</span> 80 pontos <br />
                    <span className="info-text-item">3º</span> 60 pontos <br />
                    <span className="info-text-item">4º</span> 50 pontos <br />
                    <span className="info-text-item">5º</span> 40 pontos <br />
                    <span className="info-text-item">6º</span> 35 pontos <br />
                    <span className="info-text-item">7º</span> 30 pontos <br />
                    <span className="info-text-item">8º</span> 25 pontos <br />
                    <span className="info-text-item">9º</span> 20 pontos <br />
                    <span className="info-text-item">10º ou mais</span> 10 pontos <br />
                  </p>
                </div>
              </Tab>
            </Tabs>
          </MuiThemeProvider>

          </div>
        }
      </div>
    )
  }
}

export default Ranking
