import Header from "../../componentes/header";
import "../../css/relatorio.css";
import { useState } from "react";

const dadosRelatorioTemperatura = [
  { horario: "06h", temperatura: 16 },
  { horario: "08h", temperatura: 18 },
  { horario: "10h", temperatura: 21 },
  { horario: "12h", temperatura: 25 },
  { horario: "14h", temperatura: 27 },
  { horario: "16h", temperatura: 24 },
  { horario: "18h", temperatura: 20 },
  { horario: "20h", temperatura: 17 },
];

function GraficoLinhaTemperatura({ dados, titulo }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const minTemp = Math.min(...dados.map((d) => d.temperatura));
  const maxTemp = Math.max(...dados.map((d) => d.temperatura));
  const range = Math.max(1, maxTemp - minTemp);

  const width = 680;
  const height = 280;
  const padding = 40;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  const points = dados.map((d, i) => {
    const x = padding + (i / (dados.length - 1)) * graphWidth;
    const y = padding + graphHeight - ((d.temperatura - minTemp) / range) * graphHeight;
    return { x, y, ...d, index: i };
  });

  const areaData = [
    `M ${points[0].x} ${points[0].y}`,
    ...points.map((p) => `L ${p.x} ${p.y}`),
    `L ${points[points.length - 1].x} ${padding + graphHeight}`,
    `L ${points[0].x} ${padding + graphHeight}`,
    "Z",
  ].join(" ");

  const mediaTemperatura = (dados.reduce((sum, d) => sum + d.temperatura, 0) / dados.length).toFixed(1);

  return (
    <div className="grafico-relatorio">
      <div className="section-head">
        <div>
          <h3>{titulo}</h3>
          <p>Relatório com ponto de leitura interativo ao passar o mouse.</p>
        </div>
        <span className="chart-badge">Amplitude de {(maxTemp - minTemp).toFixed(1)}°C</span>
      </div>

      <div className="chart-note">
        Máxima: {maxTemp}°C · Mínima: {minTemp}°C · Média: {mediaTemperatura}°C
      </div>

      <div className="chart-container">
        <svg viewBox={`0 0 ${width} ${height}`} className="chart-svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGradientRelatorio" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
            </linearGradient>
            <linearGradient id="lineGradientRelatorio" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>

          <path d={areaData} fill="url(#areaGradientRelatorio)" />
          <polyline
            points={points.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="url(#lineGradientRelatorio)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="chart-line"
          />

          {points.map((point) => (
            <g key={point.index} className="chart-point-group">
              <circle
                cx={point.x}
                cy={point.y}
                r="6"
                className={`chart-point ${hoveredIndex === point.index ? "chart-point--active" : ""}`}
                onMouseEnter={() => setHoveredIndex(point.index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />

              {hoveredIndex === point.index && (
                <g>
                  <line
                    x1={point.x}
                    y1={padding}
                    x2={point.x}
                    y2={padding + graphHeight}
                    stroke="rgba(59, 130, 246, 0.35)"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />
                  <g className="chart-tooltip">
                    <rect
                      x={point.x - 40}
                      y={point.y - 60}
                      width="80"
                      height="44"
                      rx="10"
                      fill="rgba(15, 23, 42, 0.95)"
                      stroke="rgba(59, 130, 246, 0.55)"
                      strokeWidth="1"
                    />
                    <text
                      x={point.x}
                      y={point.y - 36}
                      textAnchor="middle"
                      className="tooltip-temp"
                    >
                      {point.temperatura}°C
                    </text>
                    <text
                      x={point.x}
                      y={point.y - 18}
                      textAnchor="middle"
                      className="tooltip-time"
                    >
                      {point.horario}
                    </text>
                  </g>
                </g>
              )}
            </g>
          ))}

          <line
            x1={padding}
            y1={padding + graphHeight}
            x2={width - padding}
            y2={padding + graphHeight}
            stroke="rgba(148, 163, 184, 0.2)"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color legend-color--temp"></div>
          <span>Temperatura</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-color--point"></div>
          <span>Pontos de leitura</span>
        </div>
      </div>
    </div>
  );
}

export default function Relatorio() {
  const maxTemperatura = Math.max(...dadosRelatorioTemperatura.map((item) => item.temperatura));
  const minTemperatura = Math.min(...dadosRelatorioTemperatura.map((item) => item.temperatura));
  const mediaTemperatura = (
    dadosRelatorioTemperatura.reduce((total, item) => total + item.temperatura, 0) /
    dadosRelatorioTemperatura.length
  ).toFixed(1);

  const resumoCards = [
    {
      titulo: "Temperatura atual",
      valor: `${dadosRelatorioTemperatura[dadosRelatorioTemperatura.length - 1].temperatura}°C`,
      detalhe: "Última leitura registrada",
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
      detalhe: "Registrada às 06h",
      destaque: "min",
    },
    {
      titulo: "Média do dia",
      valor: `${mediaTemperatura}°C`,
      detalhe: "Com base nas últimas leituras",
      destaque: "avg",
    },
  ];

  return (
    <div className="relatorio-wrapper">
      <Header />
      <main className="relatorio-container">
        <section className="dashboard-hero">
          <div className="dashboard-hero__content">
            <p className="eyebrow">Relatório meteorológico</p>
            <h1>Visão geral das temperaturas</h1>
            <p className="hero-description">
              Acompanhe os dados de temperatura com o mesmo visual e organização das demais páginas.
            </p>
          </div>
          <div className="hero-panel">
            <span className="hero-panel__label">Resumo do relatório</span>
            <strong>{dadosRelatorioTemperatura[dadosRelatorioTemperatura.length - 1].temperatura}°C</strong>
            <p>Última leitura registrada às 20h com queda gradual de temperatura.</p>
          </div>
        </section>

        <section className="cards relatorio-cards">
          {resumoCards.map((card) => (
            <div className={`card stat-card stat-card--${card.destaque}`} key={card.titulo}>
              <span className="stat-card__title">{card.titulo}</span>
              <strong className="stat-card__value">{card.valor}</strong>
              <p className="stat-card__detail">{card.detalhe}</p>
            </div>
          ))}
        </section>

        <section className="main-content">
          <GraficoLinhaTemperatura dados={dadosRelatorioTemperatura} titulo="Temperatura ao longo do dia" />

          <section className="tabela-section">
            <div className="section-head section-head--table">
              <div>
                <h6>Leituras registradas</h6>
                <p>Veja cada horário com a temperatura correspondente.</p>
              </div>
            </div>

            <div className="table-responsive">
              <table className="relatorio-table">
                <thead>
                  <tr>
                    <th>Horário</th>
                    <th>Temperatura</th>
                    <th>Classificação</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dadosRelatorioTemperatura.map((item, index) => (
                    <tr key={index}>
                      <td>{item.horario}</td>
                      <td>{item.temperatura}°C</td>
                      <td>{item.temperatura >= 25 ? "Quente" : item.temperatura >= 20 ? "Morna" : "Fria"}</td>
                      <td>
                        <span className="badge stable">Registrada</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
