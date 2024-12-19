import React, { useEffect, useState, useContext } from 'react';
import { baseUrl } from '../shared';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginContext } from '../App';

export default function Login() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();
    // TODO: Implement login logic
    const url = baseUrl + 'api/token/';
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        setLoggedIn(true);
        console.log(loggedIn);
        navigate(
          location?.state?.previousUrl
            ? location?.state?.previousUrl
            : '/customers'
        );
      });
  }

  return (
    <>
      <form className="w-full max-w-sm" id="customer" onSubmit={login}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label htmlFor="username">Username: </label>
          </div>
          <div className="md:w-3/4">
            <input
              id="username"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label htmlFor="password">Password: </label>
          </div>
          <div className="md:w-3/4">
            <input
              id="password"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </form>
    </>
  );
}
