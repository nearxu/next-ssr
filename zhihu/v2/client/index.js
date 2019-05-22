import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app'

ReactDOM.render(
  <App initState = {window.__INIT_STATE__} />,
  document.getElementById('app')
)