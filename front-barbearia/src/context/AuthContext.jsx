import {
  createContext,
  useState,
} from "react";

import api from "../services/api";

// Contexto de autenticação
export const AuthContext =
  createContext();

function AuthProvider({
  children,
}) {

  // Usuário autenticado
  const [user, setUser] =
    useState(null);

  /*
    Realiza login
    no backend Django.
  */

  async function login(
    email,
    password
  ) {

    try {

      // Debug
      console.log(
        "Email:",
        email
      );

      console.log(
        "Senha:",
        password
      );

      // Requisição JWT
      const response =
        await api.post(
          "/token/",
          {
            email,
            password,
          }
        );

      // Tokens JWT
      const {
        access,
        refresh,
      } = response.data;

      // Salva tokens
      localStorage.setItem(
        "token",
        access
      );

      localStorage.setItem(
        "refresh",
        refresh
      );

      // Define token padrão
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access}`;

      // Usuário logado
      setUser({
        email,
      });

      return true;

    } catch (error) {

      console.log(error);

      return false;
    }
  }

  /*
    Logout do usuário.
  */

  function logout() {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "refresh"
    );

    delete api.defaults.headers.common[
      "Authorization"
    ];

    setUser(null);
  }

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}

export default AuthProvider;