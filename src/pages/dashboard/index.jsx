import Header from "../../componentes/header";
import "../../css/dashboard.css";

const variacaoTemperatura = [
  { horario: "08h", temperatura: 18 },
  { horario: "10h", temperatura: 21 },
  { horario: "12h", temperatura: 25 },
  { horario: "14h", temperatura: 27 },
  { horario: "16h", temperatura: 24 },
  { horario: "18h", temperatura: 20 },
];

export default function Dashboard() {
  const maxTemperatura = Math.max(...variacaoTemperatura.map((item) => item.temperatura));
  const minTemperatura = Math.min(...variacaoTemperatura.map((item) => item.temperatura));
  const amplitude = Math.max(1, maxTemperatura - minTemperatura);
  const mediaTemperatura = (
    variacaoTemperatura.reduce((total, item) => total + item.temperatura, 0) /
    variacaoTemperatura.length
  ).toFixed(1);

  const resumoCards = [
    {
      titulo: "Temperatura atual",
      valor: "25°C",
      detalhe: "Última leitura recebida agora",
      destaque: "temp",
    },
    {
      titulo: "Máxima do dia",
      valor: `${maxTemperatura}°C`,
      detalhe: "Registrada às 14h",
      destaque: "max",
    },
    {
      titulo: "Mínima do dia",
      valor: `${minTemperatura}°C`,
      detalhe: "Registrada no início da manhã",
      destaque: "min",
    },
  ];

  return (
    <div className="dashboard-wrapper">
      <Header />
      <main className="dashboard-container">
        <section className="dashboard-hero">
          <div className="dashboard-hero__content">
            <p className="eyebrow">Painel em tempo real</p>
            <h1>Dashboard meteorológico</h1>
            <p className="hero-description">
              Acompanhe a variação de temperatura, compare as leituras do dia e veja os
              principais indicadores da estação de forma mais clara.
            </p>
          </div>

          <div className="hero-panel">
            <span className="hero-panel__label">Leitura em destaque</span>
            <strong>25°C</strong>
            <p>Condição estável com leve aquecimento à tarde.</p>
          </div>
        </section>

        <section className="cards">
          {resumoCards.map((card) => (
            <div className={`card stat-card stat-card--${card.destaque}`} key={card.titulo}>
              <span className="stat-card__title">{card.titulo}</span>
              <strong className="stat-card__value">{card.valor}</strong>
              <p className="stat-card__detail">{card.detalhe}</p>
            </div>
          ))}
        </section>

        <section className="main-content">
          <div className="grafico">
            <div className="section-head">
              <div>
                <h3>Variação de Temperatura</h3>
                <p>Oscilação das últimas horas com leitura mínima, máxima e média.</p>
              </div>
              <span className="chart-badge">Amplitude de {amplitude}°C</span>
            </div>

            <div className="chart-note">
              Pico de {maxTemperatura}°C às 14h · Média de {mediaTemperatura}°C ao longo do dia
            </div>

            <div className="bar-mockup">
              <div className="chart-scale">
                <span>{maxTemperatura}°C</span>
                <span>{mediaTemperatura}°C</span>
                <span>{minTemperatura}°C</span>
              </div>

              <div className="bar-chart" aria-label="Gráfico de variação de temperatura">
                {variacaoTemperatura.map((item) => {
                  const normalized = (item.temperatura - minTemperatura) / amplitude;
                  const barHeight = 18 + normalized * 82;

                  return (
                    <div className="bar-column" key={item.horario}>
                      <span className="bar-value">{item.temperatura}°</span>
                      <div className="bar-track">
                        <div
                          className={`bar-fill ${
                            item.temperatura >= 25 ? "bar-fill--warm" : "bar-fill--cool"
                          }`}
                          style={{ height: `${barHeight}%` }}
                        />
                      </div>
                      <span className="bar-label">{item.horario}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <section className="tabela-section">
            <div className="section-head section-head--table">
              <div>
                <h6>Leituras Recentes</h6>
                <p>Resumo das últimas medições registradas no painel.</p>
              </div>
            </div>

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
                    <td>
                      <span className="badge stable">Estável</span>
                    </td>
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
