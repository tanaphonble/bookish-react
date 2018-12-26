import React, { Component } from 'react'
import './App.css'
import BookListContainer from './containers/BookListContainer'
import BookDetailContainer from './containers/BookDetailContainer'

import { Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Bookish</h1>
        <main>
          <Route exact path="/" component={BookListContainer} />
          <Route path="/books/:id" component={BookDetailContainer} />
        </main>
      </div>
    )
  }
}

export default App
