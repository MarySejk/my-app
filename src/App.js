import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import Navigace from "./components/navigace";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import Jednodenni from "./pages/Jednodenni";
import Vicedenni from "./pages/Vicedenni";
import Ulozene from "./pages/Ulozene";

function App() {
    return (
       <BrowserRouter>
        <Navigace />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jednodenni" element={<Jednodenni />} />
            <Route path="/vicedenni" element={<Vicedenni />} />
            <Route path="/ulozene" element={<Ulozene />} />
        </Routes>
       </BrowserRouter>
      
    );
}

/* const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />); */

export default App