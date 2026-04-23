import { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/auth.css"; // Certifique-se que o caminho está correto

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <section className="auth-container">
      <div className="auth-card">
        
        {/* Lado da Imagem (Opcional, pode deixar comentado) */}
        {/* <div><img src={imgEstacao} alt="Estação" /></div> */}

        <div>
          <h2>Login</h2>
          <p className="auth-subtitle">Estação Meteorológica</p>
          
          <form onSubmit={(e) => e.preventDefault()}>
            
            {/* Caixa do Usuário */}
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

            {/* Caixa da Senha */}
            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input 
                type="password" 
                id="senha" 
                placeholder="********"
                value={senha} 
                onChange={(e) => setSenha(e.target.value)} // Corrigido aqui para setSenha
              />
            </div>
            <Link to="/dashboard" className="auth-button">
              Entrar
            </Link>
          </form>

          <p>
            Não tem uma conta?- 
            <Link to="/register" className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}