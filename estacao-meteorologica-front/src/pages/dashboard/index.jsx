import Header from "../../componentes/header";
import "../../css/dashboard.css";
export default function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <Header />
      <main className="dashboard-container">
        <section className="cards">
          <div className="card">
            <div className="card-header">
              <h2>Dados Meteorológicos</h2>
              <span className="icon">🌡️</span>
            </div>
            <div className="data-row">
              <span>Temperatura</span>
              <span className="value temp">25°C</span>
            </div>
            <div className="data-row">
              <span>Umidade</span>
              <span className="value">60%</span>
            </div>
            <div className="data-row">
              <span>Pressão</span>
              <span className="value">1013 hPa</span>
            </div>
          </div>
        </section>

        <section className="main-content">
          <div className="grafico">
            <h3>Variação de Temperatura</h3>
            <div className="bar-mockup"></div>
          </div>

          <section className="tabela-section">
            <h6>Leituras Recentes</h6>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Temperatura</th>
                    <th>Umidade</th>
                    <th>Pressão</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>25°C</td>
                    <td>60%</td>
                    <td>1013 hPa</td>
                    <td><span className="badge stable">Estável</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}