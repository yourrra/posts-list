import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";

const Login = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);

    const login = (event) => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem("auth", "true");
    };

    return (
        <div>
            <h1>Page for Login</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Enter the Login" />
                <MyInput type="password" placeholder="Enter the Password" />
                <MyButton>Enter</MyButton>
            </form>
        </div>
    );
};

export default Login;
