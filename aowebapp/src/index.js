import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from "./routes/Home"
import Contact from "./routes/Contact"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardListSearch from "./components/CardList"
import CardDetail from './components/CardDetails';
import Graph from './routes/Graph';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} >
                <Route path="Home" element={<Home />} />
                <Route path="Contact" element={<Contact />} />
                <Route path="Graph" element={<Graph />}></Route>
                <Route path="Products" element={<CardListSearch />} />
                <Route path="" element={<Home />} /> { }
                <Route path="*" element={<Home />} /> { }
                <Route path="Products/:itemId" element={<CardDetail />} /> { }
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
