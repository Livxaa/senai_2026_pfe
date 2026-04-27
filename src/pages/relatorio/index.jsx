import Header from "../../componentes/header";
import "../../css/relatorio.css";

export default function Relatorio() {
  const leitura = [
    { horario: "12:00", iqa: 42, temperatura: 25, umidade: 60 },
    { horario: "13:00", iqa: 45, temperatura: 26, umidade: 58 },
    { horario: "14:00", iqa: 48, temperatura: 27, umidade: 55 },
    { horario: "18:00", iqa: 38, temperatura: 23, umidade: 78 },
  ];

  const mediaIqa = Math.round(
    leitura.reduce((total, item) => total + item.iqa, 0) / leitura.length
  );

  const temperaturas = leitura.map((item) => item.temperatura);
  const umidades = leitura.map((item) => item.umidade);
  const maxClima = Math.max(...temperaturas, ...umidades);
  const minClima = Math.min(...temperaturas, ...umidades);

  const getIqaClass = (iqa) => {
    if (iqa >= 50) return "metric-good";
    if (iqa >= 35) return "metric-warning";
    return "metric-bad";
  };

  const getChartPoints = (values) => {
    const width = 420;
    const height = 200;
    const padding = 20;
    const innerWidth = width - padding * 2;
    const innerHeight = height - padding * 2;
    const stepX = innerWidth / (values.length - 1);

    return values
      .map((value, index) => {
        const normalized =
          (value - minClima) / Math.max(1, maxClima - minClima);
        const x = padding + index * stepX;
        const y = padding + innerHeight - normalized * innerHeight;
        return `${x},${y}`;
      })
      .join(" ");
  };

  const tempPoints = getChartPoints(temperaturas);
  const umidPoints = getChartPoints(umidades);

  return (
    <div className="relatorio-page">
      <Header />

      <main className="relatorio-container">
        <section className="relatorio-hero">
          <div className="relatorio-copy">
            <span className="relatorio-kicker">Relatório em tempo real</span>
            <h3>Relatório de Leitura</h3>
            <p>
              Monitorando dados de temperatura, umidade e qualidade do ar com
              uma visão mais clara e organizada.
            </p>
          </div>

          <div className="relatorio-summary">
            <article className="summary-card">
              <span>Média IQA</span>
              <strong>{mediaIqa}</strong>
            </article>
            <article className="summary-card">
              <span>Total de Leituras</span>
              <strong>{leitura.length}</strong>
            </article>
            <article className="summary-card">
              <span>Status Geral</span>
              <strong>Estável</strong>
            </article>
          </div>
        </section>

        <section className="relatorio-card">
          <div className="relatorio-card-header">
            <div>
              <h4>Diferença de clima ao longo do dia</h4>
              <p>Comparativo entre temperatura e umidade nas últimas leituras.</p>
            </div>
            <span className="relatorio-badge">Atualizado agora</span>
          </div>

          <div className="chart-card">
            <div className="chart-legend">
              <span className="legend-item legend-temperature">Temperatura</span>
              <span className="legend-item legend-humidity">Umidade</span>
            </div>

            <svg
              className="weather-chart"
              viewBox="0 0 420 200"
              role="img"
              aria-label="Gráfico comparando temperatura e umidade ao longo do dia"
            >
              <defs>
                <linearGradient id="tempGradient" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fb7185" />
                </linearGradient>
                <linearGradient id="humidityGradient" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>

              {[0, 1, 2, 3].map((index) => (
                <line
                  key={`grid-${index}`}
                  x1="20"
                  x2="400"
                  y1={20 + index * 50}
                  y2={20 + index * 50}
                  className="chart-grid"
                />
              ))}

              <polyline className="chart-line chart-temperature" points={tempPoints} />
              <polyline className="chart-line chart-humidity" points={umidPoints} />

              {temperaturas.map((value, index) => {
                const stepX = 380 / (temperaturas.length - 1);
                const normalized =
                  (value - minClima) / Math.max(1, maxClima - minClima);
                const x = 20 + index * stepX;
                const y = 20 + 160 - normalized * 160;
                return <circle key={`temp-${index}`} cx={x} cy={y} r="4.5" className="chart-dot chart-dot-temperature" />;
              })}

              {umidades.map((value, index) => {
                const stepX = 380 / (umidades.length - 1);
                const normalized =
                  (value - minClima) / Math.max(1, maxClima - minClima);
                const x = 20 + index * stepX;
                const y = 20 + 160 - normalized * 160;
                return <circle key={`hum-${index}`} cx={x} cy={y} r="4.5" className="chart-dot chart-dot-humidity" />;
              })}

              {leitura.map((item, index) => {
                const stepX = 380 / (leitura.length - 1);
                const x = 20 + index * stepX;
                return (
                  <text key={item.horario} x={x} y="192" className="chart-label">
                    {item.horario}
                  </text>
                );
              })}
            </svg>
          </div>
        </section>

        <section className="relatorio-card">
          <div className="relatorio-card-header">
            <div>
              <h4>Histórico de medições</h4>
              <p>Últimos registros coletados pelos sensores da estação.</p>
            </div>
          </div>

          <div className="table-scroll">
            <table className="relatorio-table">
              <thead>
                <tr>
                  <th>Horário</th>
                  <th>IQA</th>
                  <th>Temperatura</th>
                  <th>Umidade</th>
                </tr>
              </thead>
              <tbody>
                {leitura.map((item) => (
                  <tr key={item.horario}>
                    <td>
                      <span className="table-time">{item.horario}</span>
                    </td>
                    <td>
                      <span className={`metric-pill ${getIqaClass(item.iqa)}`}>
                        {item.iqa}
                      </span>
                    </td>
                    <td>{item.temperatura}°C</td>
                    <td>{item.umidade}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
