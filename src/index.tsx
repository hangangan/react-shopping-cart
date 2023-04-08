import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';

import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
/* Theme */
import { ThemeProvider } from 'commons/style/styled-components';
import { theme } from 'commons/style/theme';
import GlobalStyle from 'commons/style/global-style';

/* Context Providers */
import { ProductsProvider } from 'contexts/products-context';
import { CartProvider } from 'contexts/cart-context';

import App from 'components/App';

import Checkout from 'pages/checkout';

const root = document.getElementById('root')!;
const container = ReactDOMClient.createRoot(root);

container.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ProductsProvider>
          <CartProvider>
            <Routes>
              <Route path="/" Component={App} />
              <Route path="/checkout" Component={Checkout} />
            </Routes>
          </CartProvider>
        </ProductsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
