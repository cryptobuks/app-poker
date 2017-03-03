'use strict'

import React from 'react';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listRanking: []
    }

    this.loadRanking();
  }

  /**
   * Carrega ranking do torneio atual
   */
  loadRanking() {
    setTimeout(() => {
      this.setState({
        listRanking: ['hello', 'world', 'its', 'ok']
      })
    }, 5000)
  }

  render() {
    return(
      <div>
        {this.state.listRanking.length == 0 ?
          <span>Carregando...</span>
          :
          <ul>
            {this.state.listRanking.map((item, key) => {
              return (
                <li key={key}>{item}</li>
              )
            })}
          </ul>
        }
      </div>
    )
  }
}

export default Ranking;
