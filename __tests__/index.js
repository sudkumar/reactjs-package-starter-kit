import React from "react"
import ReactDOM from "react-dom"
import MyAwesomeComponent from "../src/"

test("renders without crashing", () => {
  const renderHere = document.createElement("div")
  ReactDOM.render(<MyAwesomeComponent />, renderHere)
})
