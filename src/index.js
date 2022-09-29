import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/homePage/HomePage';
import NavigatePage from './components/navigatePage/NavigatePage';
import PaperTradePage from './components/paperTradePage/PaperTradePage';
import Profile from './components/profile/Profile';
import LoginPage from './components/loginPage/LoginPage';
import SignUpPage from './components/signUpPage/SignUpPage';
import NotFoundPage from './components/notFoundPage/NotFoundPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/navigate" element={<NavigatePage />} />
          <Route path="/trades" element={<PaperTradePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
