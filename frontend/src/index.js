import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css'
import './scss/index.scss'

import App from './components/App.jsx'

createRoot(document.getElementById('root')).render(App())
