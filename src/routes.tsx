import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DefaultPage from 'components/default-page';

import Cart from 'pages/cart';
import Category from 'pages/category';
import Home from 'pages/home';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultPage />}>
          <Route index element={<Home />} />
          <Route path="/categoria/:categoryName" element={<Category />} />
          <Route path="/carrinho" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
