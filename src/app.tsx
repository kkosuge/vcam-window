// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom'
import { Root } from './components/Root'
import { ZeitProvider, CssBaseline } from '@zeit-ui/react'

import './assets/index.css'

const Application = (
  <ZeitProvider>
    <CssBaseline />
    <Root />
  </ZeitProvider>
)

ReactDOM.render(Application, document.getElementById('root'))
