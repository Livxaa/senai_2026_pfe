import {Link} from 'react-router-dom';
import "../../css/header.css";

export default function Header() {
    return(
        <header>
            <h2>Estação Meteorológica</h2>
            <nav>
                <ul>
                    <li>
                        <Link to='/dashboard'>Home</Link>    
                    </li>
                    <li>
                        <Link to='/cadastro'>Cadastro</Link>
                    </li>
                    <li>
                        <Link to='/relatorio'>Relatório</Link>
                    </li>
                    <li>
                        <Link to='/'>Sair</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}