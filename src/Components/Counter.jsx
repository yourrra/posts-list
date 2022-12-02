import React, { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);

    function inCrement() {
        setCount(count + 1);
    }

    function deCrement() {
        setCount(count - 1);
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={inCrement}>Increment</button>
            <button onClick={deCrement}>Decrement</button>
        </div>
    );
};

export default Counter;
