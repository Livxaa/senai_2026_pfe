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

  const mediaTemperatura = (dados.reduce((sum, d) => sum + d.temperatura, 0) / dados.length).toFixed(1);

  return (
    <div className="grafico-relatorio">
      <div className="section-head">
        <div>
          <h3>{titulo}</h3>
          <p>Análise detalhada com visualização interativa ao passar o mouse.</p>
        </div>
        <span className="chart-badge">Amplitude de {(maxTemp - minTemp).toFixed(1)}°C</span>
      </div>

      <div className="chart-note">
        Máxima: {maxTemp}°C · Mínima: {minTemp}°C · Média: {mediaTemperatura}°C
      </div>

      <div className="chart-container">
        <svg viewBox={`0 0 ${width} ${height}`} className="chart-svg" preserveAspectRatio="xMinYMin meet">
          {/* Grade de fundo */}
          <defs>
            <linearGradient id="areaGradientRelatorio" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
            </linearGradient>
            <linearGradient id="lineGradientRelatorio" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#1e3a8a" />
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
          <path d={areaData} fill="url(#areaGradientRelatorio)" />

          {/* Linha principal */}
          <polyline
            points={points.map(p => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="url(#lineGradientRelatorio)"
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
                    stroke="rgba(59, 130, 246, 0.3)"
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
                      stroke="rgba(59, 130, 246, 0.5)"
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
          <div className="legend-color legend-color--temp"></div>
          <span>Variação de temperatura</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-color--point"></div>
          <span>Ponto de leitura</span>
        </div>
      </div>
    </div>
  );
}

export default function Relatorio() {
  return (
    <div className="relatorio-wrapper">
      <Header />
      <main className="relatorio-container">
        <section className="relatorio-hero">
          <div className="relatorio-hero__content">
            <p className="eyebrow">Análise Completa</p>
            <h1>Relatório de Temperatura</h1>
            <p className="hero-description">
              Visualize com interatividade a variação de temperatura ao longo do dia. 
              Passe o mouse sobre o gráfico para ver detalhes precisos de cada horário.
            </p>
          </div>
        </section>

        <section className="relatorio-content">
          <GraficoLinhaTemperatura dados={dadosRelatorioTemperatura} titulo="Variação de Temperatura - Relatório do Dia" />

          <section className="estatisticas-section">
            <div className="section-head">
              <div>
                <h6>Estatísticas do Dia</h6>
                <p>Resumo completo das medições.</p>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-label">Temperatura Máxima</span>
                <strong className="stat-value">27°C</strong>
                <p className="stat-time">às 14h</p>
              </div>
              <div className="stat-box">
                <span className="stat-label">Temperatura Mínima</span>
                <strong className="stat-value">16°C</strong>
                <p className="stat-time">às 06h</p>
              </div>
              <div className="stat-box">
                <span className="stat-label">Amplitude Térmica</span>
                <strong className="stat-value">11°C</strong>
                <p className="stat-time">Diferença do dia</p>
              </div>
              <div className="stat-box">
                <span className="stat-label">Média do Dia</span>
                <strong className="stat-value">21°C</strong>
                <p className="stat-time">Média aritmética</p>
              </div>
            </div>
          </section>

          <section className="leituras-section">
            <div className="section-head">
              <div>
                <h6>Leituras Detalhadas</h6>
                <p>Todos os registros de temperatura do dia.</p>
              </div>
            </div>

            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Horário</th>
                    <th>Temperatura</th>
                    <th>Classificação</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dadosRelatorioTemperatura.map((leitura, index) => (
                    <tr key={index}>
                      <td>{leitura.horario}</td>
                      <td className="temp-cell">{leitura.temperatura}°C</td>
                      <td>
                        {leitura.temperatura < 20 ? "Baixa" : leitura.temperatura < 25 ? "Moderada" : "Alta"}
                      </td>
                      <td>
                        <span className="badge stable">✓ Registrada</span>
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
