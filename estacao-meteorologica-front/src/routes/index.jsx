    import {Routes, Route} from 'react-router-dom';
    import Login from '../pages/login';
    import Register from '../pages/register';
    import Dashboard from '../pages/dashboard';
    import Cadrastro from '../pages/cadastro';
    // import Relatorio from '../pages/Relatorio';
    // import NotFound from '../pages/NotFound';
    export default function Rotas() {
        return (
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />}/>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/cadastro" element={<Cadrastro />}/>
            </Routes>
        );
    }