import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/auth.css";

export default function Register() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();

    if (!usuario || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos!");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem!");
      return;
    }

    const novoUsuario = {
      usuario,
      senha,
    };

    localStorage.setItem("user", JSON.stringify(novoUsuario));

    setErro("");
    navigate("/");
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
            <h1>Crie sua conta para acompanhar o clima com mais controle.</h1>
            <p>
              Cadastre-se para acessar os relatórios e visualizar a diferença
              entre as condições climáticas ao longo do dia.
            </p>

            <div className="auth-points">
              <article className="auth-point">
                <span>Cadastro rápido</span>
                <strong>Comece em poucos passos</strong>
              </article>
              <article className="auth-point">
                <span>Segurança</span>
                <strong>Dados armazenados localmente</strong>
              </article>
            </div>
          </div>
        </aside>

        <div className="auth-card">
          <div className="auth-header">
            <span className="auth-kicker">Novo acesso</span>
            <h2 className="auth-title">Criar sua conta</h2>
            <p className="auth-subtitle">
              Preencha seus dados para entrar na plataforma da estação.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleRegister}>
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
                name="new-password"
                autoComplete="new-password"
                placeholder="********"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmarSenha">Confirmar senha</label>
              <input
                type="password"
                id="confirmarSenha"
                name="new-password"
                autoComplete="new-password"
                placeholder="********"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </div>

            {erro && <p className="auth-error">{erro}</p>}

            <button type="submit" className="auth-button">
              Cadastrar
            </button>
          </form>

          <p className="auth-footer">
            Já tem uma conta?{" "}
            <Link to="/" className="auth-link">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
