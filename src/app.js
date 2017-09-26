'use strict'

import React from 'react'
import TopBar from './components/TopBar'
import BottomNav from './components/BottomNav'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Ranking from './components/Ranking'
import Rules from './components/Rules'
import GalleryChampions from './components/GalleryChampions'

import './app.css'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <TopBar />

          <Route exact path='/' component={Ranking} />
          <Route path='/regras' component={Rules} />
          <Route path='/galeria-campeoes' component={GalleryChampions} />

          <BottomNav />
        </div>
      </Router>
    )
  }
}

export default App
