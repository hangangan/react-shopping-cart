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
import ChatBot from 'components/ChatBot';

const root = document.getElementById('root')!;
const container = ReactDOMClient.createRoot(root);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
}
const handleInputEnter = (e?: KeyboardEvent) => {
  console.log(e);
}
const searchResult = <div>搜索结果</div>
container.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ProductsProvider>
          <div style={{
            position:'relative'
          }}>
            <ChatBot 
              onChange={handleInputChange}
              onSearch={handleInputEnter}
              SearchResult={searchResult}
            ></ChatBot>
          <CartProvider>
            <Routes>
              <Route path="/" Component={App} />
              <Route path="/checkout" Component={Checkout} />
            </Routes>
          </CartProvider>
          </div>
        </ProductsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
