import React from "react"
import MyAwesomeComponent from "./../src"

import { hot } from "react-hot-loader"

class App extends React.Component {
  render() {
    return (
      <div>
        <p>Do some changes inside your docs or package and see here</p>
        <MyAwesomeComponent />
      </div>
    )
  }
}

export default hot(module)(App)
