import React, {createContext}from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ( children ) => {
  const urlApiAuth = "http://127.0.0.1:8000/api-auth/"
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? localStorage.getItem("authTokens")
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? localStorage.getItem("authTokens")
      : null
  );
  const [loading, setLoading] = useState(true);

  const history = useNavigate();

  const loginUser = async (username, password) => {
    const response = await fetch(`${urlApiAuth}/login/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    console.log(response);
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(data.access);
      localStorage.setItem("authTokens", JSON.stringify(data));
      history("/user");
    } else {
      alert("Something went wrong!");
    }
  }


  const logoutUser =  async () => {
    const response = await fetch(`${urlApiAuth}/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + authTokens
      }
    });
    if (response.status === 204) {
      localStorage.removeItem("authTokens");
      history("/");
    } else {
      alert("Something went wrong! You are disconnected");
    }
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    loginUser,
    logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(authTokens);
    }else{
      history.push("/");
    }
    setLoading(false);

  }, [authTokens, loading]);


  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};