import React from 'react';
import { BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux'

import {routes as appRoutes} from './routes';
import ThemeConfig from './theme';
import NavRoutes from './components/Navigation/NavRoutes';
import Preloader from './components/Layouts/Preloader';
import {storeData} from "./redux/store/store";

import './App.css';

// const store = setStore();

export default function App() {
  return (
    <Provider store={storeData}>
      <ThemeConfig>
        <BrowserRouter>
          <Preloader />
          <NavRoutes routes={appRoutes} />
        </BrowserRouter>
      </ThemeConfig>
    </Provider>
  );
}