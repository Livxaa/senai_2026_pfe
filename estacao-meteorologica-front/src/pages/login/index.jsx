import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/auth.css";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (!usuario || !senha) {
      setErro("Informe usuário e senha para entrar.");
      return;
    }

    setErro("");
    navigate("/dashboard");
  }

  return (
    <section className="auth-page">
      <div className="auth-shell">
        <aside className="auth-visual">
          <span className="auth-brand">
            <span className="auth-brand-dot" />
            Estação Meteorológica
          </span>

          <div className="auth-visual-copy">
            <h1>Faça login para acompanhar o clima em tempo real.</h1>
            <p>
              Veja a evolução da temperatura, umidade e qualidade do ar em uma
              interface moderna, clara e fácil de usar.
            </p>

            <div className="auth-points">
              <article className="auth-point">
                <span>Monitoramento</span>
                <strong>Dados atualizados</strong>
              </article>
              <article className="auth-point">
                <span>Visualização</span>
                <strong>Gráficos e relatórios</strong>
              </article>
            </div>
          </div>
        </aside>

        <div className="auth-card">
          <div className="auth-header">
            <span className="auth-kicker">Acesso seguro</span>
            <h2 className="auth-title">Entrar na plataforma</h2>
            <p className="auth-subtitle">
              Use suas credenciais para acessar o painel principal da estação.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="usuario">Usuário</label>
              <input
                type="text"
                id="usuario"
                name="username"
                autoComplete="username"
                placeholder="Digite seu usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                name="current-password"
                autoComplete="current-password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            {erro && <p className="auth-error">{erro}</p>}

            <button type="submit" className="auth-button">
              Entrar
            </button>
          </form>

          <p className="auth-footer">
            Não tem uma conta?{" "}
            <Link to="/register" className="auth-link">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
