import { useState } from "react";
import Header from "../../componentes/header";
import "../../css/auth.css";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [celular, setCelular] = useState("");
  const [documento, setDocumento] = useState("");
  const [mensagem, setMensagem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!nome || !email || !senha || !celular || !documento) {
      setMensagem("Preencha todos os campos para continuar.");
      return;
    }

    setMensagem("Cadastro salvo com sucesso.");
  }

  return (
    <section className="auth-page cadastro-page">
      <div className="cadastro-layout">
        <Header />

        <div className="auth-shell cadastro-shell">
          <aside className="auth-visual cadastro-visual">
            <span className="auth-brand">
              <span className="auth-brand-dot" />
              Estação Meteorológica
            </span>

            <div className="auth-visual-copy">
              <h1>Cadastre seus dados em uma interface mais limpa e moderna.</h1>
              <p>
                O cadastro agora segue o mesmo padrão visual do login e do
                relatório, com contraste forte, cards suaves e leitura
                confortável.
              </p>

              <div className="auth-points">
                <article className="auth-point">
                  <span>Organização</span>
                  <strong>Campos alinhados</strong>
                </article>
                <article className="auth-point">
                  <span>Experiência</span>
                  <strong>Visual consistente</strong>
                </article>
                <article className="auth-point">
                  <span>Clima</span>
                  <strong>Mais clareza para os dados</strong>
                </article>
              </div>
            </div>

            <div className="auth-footer-note">
              <strong>Interface padronizada</strong>
              <span>Mesmo estilo do login e do relatório.</span>
            </div>
          </aside>

          <section className="auth-card cadastro-card">
            <div className="auth-card-header">
              <span className="auth-tag">Cadastro</span>
              <h2>Cadastro de dados pessoais</h2>
              <p>
                Preencha as informações abaixo para registrar o usuário com uma
                aparência mais moderna.
              </p>
            </div>

            <form className="auth-form cadastro-form" onSubmit={handleSubmit}>
              <div className="auth-field">
                <label htmlFor="nome">Nome completo</label>
                <input
                  className="auth-input"
                  type="text"
                  id="nome"
                  name="name"
                  autoComplete="name"
                  placeholder="Digite seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div className="auth-field">
                <label htmlFor="email">Email</label>
                <input
                  className="auth-input"
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="auth-field">
                <label htmlFor="senha">Senha</label>
                <input
                  className="auth-input"
                  type="password"
                  id="senha"
                  name="new-password"
                  autoComplete="new-password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>

              <div className="auth-field">
                <label htmlFor="celular">Celular</label>
                <input
                  className="auth-input"
                  type="tel"
                  id="celular"
                  name="tel"
                  autoComplete="tel"
                  placeholder="Digite seu celular"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                />
              </div>

              <div className="auth-field">
                <label htmlFor="documento">Documento</label>
                <input
                  className="auth-input"
                  type="text"
                  id="documento"
                  name="document"
                  autoComplete="off"
                  placeholder="Digite seu documento"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                />
              </div>

              {mensagem ? <div className="auth-message">{mensagem}</div> : null}

              <button className="auth-button cadastro-button" type="submit">
                Salvar cadastro
              </button>
            </form>
          </section>
        </div>
      </div>
    </section>
  );
}
