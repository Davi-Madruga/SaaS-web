import {
  useContext,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  AuthContext,
} from "../context/AuthContext";

function Login() {

  const navigate =
    useNavigate();

  const { login } =
    useContext(AuthContext);

  // Campo email
  const [email, setEmail] =
    useState("");

  // Campo senha
  const [password, setPassword] =
    useState("");

  /*
    Realiza login.
  */

  async function handleLogin(e) {

    e.preventDefault();

    // Chama login do Context
    const success =
      await login(
        email,
        password
      );

    // Login realizado
    if (success) {

      alert(
        "Login realizado com sucesso!"
      );

      navigate("/cliente");

    } else {

      alert(
        "Email ou senha inválidos."
      );
    }
  }

  return (

    <main className="login-container">

      <section className="login-card">

        <h1>
          Barbearia Acadêmica
        </h1>

        <p>
          Faça login para acessar o sistema.
        </p>

        <form onSubmit={handleLogin}>

          {/* Campo email */}

          <input
            type="email"

            placeholder="Email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          {/* Campo senha */}

          <input
            type="password"

            placeholder="Senha"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          {/* Botão login */}

          <button type="submit">

            Entrar

          </button>

        </form>

      </section>

    </main>
  );
}

export default Login;