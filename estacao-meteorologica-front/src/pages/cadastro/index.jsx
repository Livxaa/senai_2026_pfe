import Header from "../../componentes/header";
import  {useState} from "react";
import "../../css/cadastro.css";

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [celular, setCelular] = useState('');
    const [documento, setDocumento] = useState('');

    return (
       <section className="container">
        <Header />
        <h2>Cadastro de dados pessoais</h2>
        <form className="cadastro-form">
            <div className="form-group">
                <label htmlFor="nome">Nome Completo</label>
                <input 
                    type="text" 
                    id="nome" 
                    placeholder="Digite seu nome completo"
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Digite seu email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <label htmlFor="senha">Senha</label>
                <input 
                    type="password" 
                    id="senha" 
                    placeholder="Digite sua senha"
                    value={senha} 
                    onChange={(e) => setSenha(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <label htmlFor="celular">Celular</label>
                <input 
                    type="tel" 
                    id="celular" 
                    placeholder="Digite seu celular"
                    value={celular} 
                    onChange={(e) => setCelular(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <label htmlFor="documento">Documento</label>
                <input 
                    type="text" 
                    id="documento" 
                    placeholder="Digite seu documento"
                    value={documento} 
                    onChange={(e) => setDocumento(e.target.value)} 
                />
            </div>
            <button>
                Salvar
            </button>
        </form>

       </section> )



}