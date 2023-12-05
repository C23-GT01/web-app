import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ProductPage from './pages/product.jsx'
import HomePage from './pages/home.jsx'
import UmkmPage from './pages/umkm.jsx'
import ErrorPage from './pages/404.jsx'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/umkm/:id' element={<UmkmPage />} />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;