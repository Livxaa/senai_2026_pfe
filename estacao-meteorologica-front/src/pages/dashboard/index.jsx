import Header from "../../componentes/header";
import "../../css/dashboard.css";
import { useState } from "react";

const variacaoTemperatura = [
  { horario: "08h", temperatura: 18 },
  { horario: "10h", temperatura: 21 },
  { horario: "12h", temperatura: 25 },
  { horario: "14h", temperatura: 27 },
  { horario: "16h", temperatura: 24 },
  { horario: "18h", temperatura: 20 },
];

function GraficoLinhaTemperatura({ dados }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const minTemp = Math.min(...dados.map(d => d.temperatura));
  const maxTemp = Math.max(...dados.map(d => d.temperatura));
  const range = Math.max(1, maxTemp - minTemp);
  
  const width = 600;
  const height = 240;
  const padding = 40;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;
  
  // Calcula pontos da linha
  const points = dados.map((d, i) => {
    const x = padding + (i / (dados.length - 1)) * graphWidth;
    const y = padding + graphHeight - ((d.temperatura - minTemp) / range) * graphHeight;
    return { x, y, ...d, index: i };
  });
  
  // Gera caminho SVG para a linha
  const pathData = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
  
  // Gera area sob a curva
  const areaData = [
    `M ${points[0].x} ${points[0].y}`,
    ...points.map((p, i) => `L ${p.x} ${p.y}`),
    `L ${points[points.length - 1].x} ${padding + graphHeight}`,
    `L ${points[0].x} ${padding + graphHeight}`,
    "Z"
  ].join(" ");

  const gridLines = [0, 1, 2, 3].map((step) => padding + (graphHeight / 3) * step);

  return (
    <div className="grafico">
      <div className="section-head">
        <div>
          <h3>Variação de Temperatura</h3>
          <p>Oscilação das últimas horas com visualização dinâmica.</p>
        </div>
        <span className="chart-badge">Amplitude de {(maxTemp - minTemp).toFixed(1)}°C</span>
      </div>

      <div className="chart-note">
        Pico de {maxTemp}°C · Mínima de {minTemp}°C
      </div>

      <div className="chart-container">
        <svg viewBox={`0 0 ${width} ${height}`} className="chart-svg" preserveAspectRatio="xMinYMin meet">
          {/* Grade de fundo */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(96, 165, 250, 0.3)" />
              <stop offset="100%" stopColor="rgba(96, 165, 250, 0.05)" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          </defs>

          <g className="chart-grid">
            {gridLines.map((y) => (
              <line
                key={y}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="rgba(148, 163, 184, 0.15)"
                strokeWidth="1"
              />
            ))}
          </g>

          {/* Área sob a curva */}
          <path d={areaData} fill="url(#areaGradient)" />

          {/* Linha principal */}
          <polyline
            points={points.map(p => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="chart-line"
          />

          {/* Pontos interativos */}
          {points.map((point) => (
            <g
              key={point.index}
              className="chart-point-group"
              onMouseEnter={() => setHoveredIndex(point.index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <circle
                cx={point.x}
                cy={point.y}
                r="6"
                className={`chart-point ${hoveredIndex === point.index ? "chart-point--active" : ""}`}
              />
              
              {hoveredIndex === point.index && (
                <g>
                  {/* Linha vertical de referência */}
                  <line
                    x1={point.x}
                    y1={padding}
                    x2={point.x}
                    y2={padding + graphHeight}
                    stroke="rgba(96, 165, 250, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="4"
                    className="chart-guide-line"
                  />
                  
                  {/* Tooltip */}
                  <g className="chart-tooltip">
                    <rect
                      x={point.x - 35}
                      y={point.y - 50}
                      width="70"
                      height="40"
                      rx="8"
                      fill="rgba(15, 23, 42, 0.95)"
                      stroke="rgba(96, 165, 250, 0.5)"
                      strokeWidth="1"
                    />
                    <text
                      x={point.x}
                      y={point.y - 28}
                      textAnchor="middle"
                      className="tooltip-temp"
                    >
                      {point.temperatura}°C
                    </text>
                    <text
                      x={point.x}
                      y={point.y - 10}
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

          {/* Eixo X */}
          <line
            x1={padding}
            y1={padding + graphHeight}
            x2={width - padding}
            y2={padding + graphHeight}
            stroke="rgba(148, 163, 184, 0.2)"
            strokeWidth="1"
          />
          {points.map((point) => (
            <text
              key={`label-${point.index}`}
              x={point.x}
              y={padding + graphHeight + 22}
              textAnchor="middle"
              className="chart-label"
            >
              {point.horario}
            </text>
          ))}
        </svg>
      </div>

      {/* Legenda */}
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color legend-color--warm"></div>
          <span>Temperaturas altas</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-color--cool"></div>
          <span>Temperaturas baixas</span>
        </div>
      </div>
    </div>
  );
}

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
          <GraficoLinhaTemperatura dados={variacaoTemperatura} />

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
