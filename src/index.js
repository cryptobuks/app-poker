'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';

/**
 * Arquivo principal para configuração do react-hot-loader + componente principal (app)
 */

const renderApp = (NextApp) => {
  ReactDOM.render(
    <AppContainer>
      <NextApp />
    </AppContainer>,
    document.querySelector('[data-js="app"]')
  )
}

// init
renderApp(App);

/**
 * Configurações do react-hot-loader
 * - indicar componente principal do projeto
 * - é utilizado apenas em dev, por isso o 'if'
 */
if(module.hot) {
  module.hot.accept('./app', () => {
    // pega novo status do nosso projeto
    const NextApp = require('./app').default

    // renderiza projeto
    renderApp(NextApp)
  })
}
