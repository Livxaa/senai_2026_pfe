import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/auth.css";

export default function Register() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');

  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();

    // Validação básica
    if (!usuario || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos!");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem!");
      return;
    }

    // Simulando cadastro (salvando no localStorage)
    const novoUsuario = {
      usuario,
      senha
    };

    localStorage.setItem("user", JSON.stringify(novoUsuario));

    alert("Cadastro realizado com sucesso!");

    // Redireciona para login
    navigate("/login");
  }

  return (
    <section className="auth-container">
      <div className="auth-card">

        <div>
          <h2>Cadastro</h2>
          <p className="auth-subtitle">Estação Meteorológica</p>

          <form onSubmit={handleRegister}>

            {/* Usuário */}
            <div className="form-group">
              <label htmlFor="usuario">Usuário</label>
              <input 
                type="text" 
                id="usuario" 
                placeholder="Digite seu usuário"
                value={usuario} 
                onChange={(e) => setUsuario(e.target.value)} 
              />
            </div>

            {/* Senha */}
            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input 
                type="password" 
                id="senha" 
                placeholder="********"
                value={senha} 
                onChange={(e) => setSenha(e.target.value)} 
              />
            </div>

            {/* Confirmar senha */}
            <div className="form-group">
              <label htmlFor="confirmarSenha">Confirmar Senha</label>
              <input 
                type="password" 
                id="confirmarSenha" 
                placeholder="********"
                value={confirmarSenha} 
                onChange={(e) => setConfirmarSenha(e.target.value)} 
              />
            </div>

            {/* Mensagem de erro */}
            {erro && <p style={{ color: "red" }}>{erro}</p>}

            <button type="submit" className="auth-button">
              Cadastrar
            </button>
          </form>

          <p>
            Já tem uma conta? -{" "}
            <Link to="/" className="link-secondary">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}