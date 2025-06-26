import 'bootstrap/dist/css/bootstrap.min.css'

import { createRoot } from 'react-dom/client'

import init from './init.jsx'

const root = createRoot(document.getElementById('root'))

init().then((vdom) => {
  root.render(vdom)
})
