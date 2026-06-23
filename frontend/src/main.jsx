
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/stor'
import { PersistGate } from 'redux-persist/integration/react'



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navbar/>
        <App />
        <Footer/>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
