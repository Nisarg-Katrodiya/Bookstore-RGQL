import React from 'react';
import { BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux'

import {routes as appRoutes} from './routes';
import ThemeConfig from './theme';
import NavRoutes from './components/Navigation/NavRoutes';
import Preloader from './components/Layouts/Preloader';
import {storeData} from "./redux/store/store";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import './App.css';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
});


// const store = setStore();

export default function App() {
  return (
    <Provider store={storeData}>
      <ApolloProvider client={client}>
        <ThemeConfig>
          <BrowserRouter>
            <Preloader />
            <NavRoutes routes={appRoutes} />
          </BrowserRouter>
        </ThemeConfig>
      </ApolloProvider>
    </Provider>
  );
}