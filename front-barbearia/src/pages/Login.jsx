import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <main className="login-container">
      <section className="login-card">
        <h1>Barbearia Acadêmica</h1>
        <p>Escolha o tipo de usuário para acessar o sistema.</p>

        <button onClick={() => navigate("/cliente")}>Entrar como Cliente</button>
        <button onClick={() => navigate("/barbeiro")}>Entrar como Barbeiro</button>
        <button onClick={() => navigate("/admin")}>Entrar como Dono/Admin</button>
      </section>
    </main>
  );
}

export default Login;