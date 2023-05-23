import logo from './logo.svg';
import './App.css';
import { LoaderProvider } from './context/LoaderContext';
import ProductsList from './components/ProductsList';
import Header from './components/Header';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ProductsPage from './pages/ProductsPage';
import ShopPage from './pages/ShopPage';

function App() {
  return (
    <>
    
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/'  element={<ProductsPage />}/>
           <Route path='/shop' element={<ShopPage/>} />
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;

//https://storerestapi.com/docs#id_product--1