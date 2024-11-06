import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Feed from './components/Feed';
import './App.css';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const handleLogin = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <div className="App">
            <h1>Simple Reddit App</h1>
            {!token ? (
                <div>
                    <Register />
                    <Login onLogin={handleLogin} />
                </div>
            ) : (
                <div>
                    <button onClick={handleLogout}>Logout</button>
                    <Feed token={token} />
                </div>
            )}
        </div>
    );
};

export default App;
