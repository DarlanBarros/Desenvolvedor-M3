import React from 'react';
import ReactDOM from 'react-dom';
import { createServer } from 'miragejs';
import { App } from './App';

import products from  './data/products.json';
import filters from  './data/filters.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/products', () => {
      return products;
    })

    this.get('/filters/colors', () => {
      const data = filters.map(item => item.colors);
      return data;
    })

    this.get('/filters/sizes', () => {
      const data = filters.map(item => item.sizes);
      return data;
    })

    this.get('/filters/prices', () => {
      const data = filters.map(item => item.prices);
      return data;
    })
  }
})


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

