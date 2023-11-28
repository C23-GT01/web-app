import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ProductPage from './pages/product.jsx'
import HomePage from './pages/home.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:id' element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;