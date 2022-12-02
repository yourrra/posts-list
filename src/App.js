import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./Components/AppRouter";
import Navbar from "./Components/Navbar/Navbar";
import { AuthContext } from "./context";
import "./style/App.css";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("auth")) {
            setIsAuth(true);
        }
        setIsLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
            <Router>
                <Navbar />
                <AppRouter />
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
