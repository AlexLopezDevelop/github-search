import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
    overflow-x: hidden;
    background: #f6f6f6;
  }
  
  body,
  input,
  button,
  textarea,
  select {
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
  }
`

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
      <GlobalStyle />
    <App />
  </>,
)
