import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { storeRAWG } from './app/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import SignInSide from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import ForgotPassword from './containers/ForgotPassword';
import BrowseGames from './containers/BrowseGames';
import DetailGames from './containers/DetailGames';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={storeRAWG}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignInSide />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/" element={<App />} >
            <Route path=":page" element={<App />} />
          </Route>
          <Route path="/games" element={<BrowseGames />} />
          <Route path="/games/:id" element={<DetailGames />} />
          <Route
            path="*"
            element={
              <main>
                <h3>404 - Route not found !</h3>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
