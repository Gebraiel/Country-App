import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Main from './components/Main'
import CountryDetails from './pages/CountryDetails'
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Main />}>
            <Route index element={<Home/>}/>
            <Route path='country-details/:name' element={<CountryDetails/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
