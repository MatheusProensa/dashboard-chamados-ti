import {
  FaDesktop,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import "./App.css";

const chamados = [
  {
    id: 1,
    usuario: "Carlos Silva",
    problema: "Computador não liga",
    prioridade: "Alta",
    status: "Em andamento",
  },

  {
    id: 2,
    usuario: "Fernanda Lima",
    problema: "Erro na impressora",
    prioridade: "Média",
    status: "Pendente",
  },

  {
    id: 3,
    usuario: "João Pedro",
    problema: "Internet lenta",
    prioridade: "Baixa",
    status: "Resolvido",
  },
];

export default function App() {
  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Painel TI</h2>

        <nav>
          <a href="#">Dashboard</a>
          <a href="#">Chamados</a>
          <a href="#">Usuários</a>
          <a href="#">Relatórios</a>
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="main-content">

        <header className="topbar">
          <h1>Dashboard de Chamados</h1>
        </header>

        {/* CARDS */}
        <section className="cards">

          <div className="card">
            <FaDesktop className="card-icon" />
            <div>
              <span>Total</span>
              <h3>128</h3>
            </div>
          </div>

          <div className="card">
            <FaClock className="card-icon" />
            <div>
              <span>Em andamento</span>
              <h3>32</h3>
            </div>
          </div>

          <div className="card">
            <FaExclamationTriangle className="card-icon" />
            <div>
              <span>Urgentes</span>
              <h3>8</h3>
            </div>
          </div>

          <div className="card">
            <FaCheckCircle className="card-icon" />
            <div>
              <span>Resolvidos</span>
              <h3>88</h3>
            </div>
          </div>

        </section>

        {/* TABELA */}

        <section className="table-section">

          <div className="table-header">
            <h2>Últimos chamados</h2>
          </div>

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Usuário</th>
                <th>Problema</th>
                <th>Prioridade</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {chamados.map((chamado) => (
                <tr key={chamado.id}>
                  <td>#{chamado.id}</td>
                  <td>{chamado.usuario}</td>
                  <td>{chamado.problema}</td>
                  <td>{chamado.prioridade}</td>
                  <td>{chamado.status}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </section>

      </main>
    </div>
  );
}