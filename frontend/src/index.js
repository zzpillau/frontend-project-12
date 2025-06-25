import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css'

import init from './init.jsx'

const root = createRoot(document.getElementById('root'))

init().then((vdom) => {
  root.render(vdom)
})
