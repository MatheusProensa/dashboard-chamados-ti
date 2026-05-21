import { useEffect, useState } from "react";
import "./App.css";
import simbolo from "./assets/simbolo.webp";

import {
  FaDesktop,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaChartBar,
  FaUsers,
  FaClipboardList,
  FaFileAlt,
  FaSearch,
  FaBell,
  FaPlus,
  FaTimes,
  FaSun,
  FaMoon,
} from "react-icons/fa";

type Status = "Pendente" | "Em andamento" | "Resolvido";
type Prioridade = "Baixa" | "Média" | "Alta";

type Chamado = {
  id: number;
  usuario: string;
  problema: string;
  prioridade: Prioridade;
  status: Status;
};

const chamadosIniciais: Chamado[] = [
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

const chamadosMensais = [
  { mes: "Jan", total: 42 },
  { mes: "Fev", total: 58 },
  { mes: "Mar", total: 76 },
  { mes: "Abr", total: 64 },
  { mes: "Mai", total: 92 },
  { mes: "Jun", total: 80 },
];

const notificacoes = [
  {
    titulo: "Chamado urgente aberto",
    texto: "Carlos Silva abriu um chamado de alta prioridade.",
    tempo: "Agora",
  },
  {
    titulo: "Chamado resolvido",
    texto: "Impressora marcada como resolvida.",
    tempo: "12 min",
  },
  {
    titulo: "Novo chamado pendente",
    texto: "Fernanda Lima aguarda atendimento técnico.",
    tempo: "28 min",
  },
];

function useAnimatedNumber(value: number, duration = 800) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    function animate(currentTime: number) {
      if (!startTime) startTime = currentTime;

      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedValue(Math.round(value * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return animatedValue;
}

function AnimatedNumber({ value }: { value: number }) {
  const animatedValue = useAnimatedNumber(value, 1000);

  return <>{animatedValue}</>;
}

export default function App() {
  const [temaClaro, setTemaClaro] = useState(false);
  const [sidebarFechada, setSidebarFechada] = useState(false);

useEffect(() => {
  document.body.classList.toggle("light-theme", temaClaro);
}, [temaClaro]);
  const [chamados, setChamados] = useState<Chamado[]>(chamadosIniciais);
  const [modalAberto, setModalAberto] = useState(false);
  const [fechandoModal, setFechandoModal] = useState(false);

  const [usuario, setUsuario] = useState("");
  const [problema, setProblema] = useState("");
  const [prioridade, setPrioridade] = useState<Prioridade>("Média");

  const [notificacoesAbertas, setNotificacoesAbertas] = useState(false);
  const [notificacoesLidas, setNotificacoesLidas] = useState(false);
  const [perfilAberto, setPerfilAberto] = useState(false);
  const totalChamados = chamados.length;
const chamadosEmAndamento = chamados.filter(
  (item) => item.status === "Em andamento"
).length;
const chamadosUrgentes = chamados.filter(
  (item) => item.prioridade === "Alta"
).length;
const chamadosResolvidos = chamados.filter(
  (item) => item.status === "Resolvido"
).length;

const totalAnimado = useAnimatedNumber(totalChamados, 1000);
const andamentoAnimado = useAnimatedNumber(chamadosEmAndamento, 1000);
const urgentesAnimado = useAnimatedNumber(chamadosUrgentes, 1000);
const resolvidosAnimado = useAnimatedNumber(chamadosResolvidos, 1000);

  function abrirModal() {
    setModalAberto(true);
  }

  function fecharModal() {
    setFechandoModal(true);

    setTimeout(() => {
      setModalAberto(false);
      setFechandoModal(false);
      setUsuario("");
      setProblema("");
      setPrioridade("Média");
    }, 250);
  }

  function cadastrarChamado(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!usuario.trim() || !problema.trim()) {
      alert("Preencha usuário e problema.");
      return;
    }

    const novoChamado: Chamado = {
      id: chamados.length + 1,
      usuario,
      problema,
      prioridade,
      status: "Pendente",
    };

    setChamados([novoChamado, ...chamados]);
    fecharModal();
  }

  function alterarStatus(id: number, novoStatus: Status) {
    const chamadosAtualizados = chamados.map((chamado) => {
      if (chamado.id === id) {
        return {
          ...chamado,
          status: novoStatus,
        };
      }

      return chamado;
    });

    setChamados(chamadosAtualizados);
  }

  return (
    <div className="dashboard">
  <aside className={`sidebar ${sidebarFechada ? "closed" : ""}`}>

    <button
      className="sidebar-toggle"
      onClick={() => setSidebarFechada(!sidebarFechada)}
    >
      ☰
    </button>

    <div className="sidebar-logo">
      <img src={simbolo} alt="Painel TI" />
      <h2>Painel TI</h2>
    </div>

        <nav className="sidebar-nav">
  <a href="#" className="active">
    <FaChartBar />
    <span>Painel</span>
  </a>

  <a href="#">
    <FaClipboardList />
    <span>Chamados</span>
  </a>

  <a href="#">
    <FaUsers />
    <span>Usuários</span>
  </a>

  <a href="#">
    <FaFileAlt />
    <span>Relatórios</span>
  </a>
</nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Dashboard de Chamados</h1>
            <p>Visão geral dos atendimentos de suporte técnico</p>
          </div>

          <div className="topbar-actions">
            <div className="search-box">
              <FaSearch />
              <input type="text" placeholder="Buscar chamado..." />
            </div>

          

            <button className="new-ticket" onClick={abrirModal}>
              <FaPlus />
              Novo chamado
            </button>
          <button
  className="theme-toggle"
  onClick={() => setTemaClaro(!temaClaro)}
>
  {temaClaro ? <FaMoon /> : <FaSun />}

  <span className="theme-tooltip">
    ✨ Modo claro
  </span>
</button>

            <div className="notification-wrapper">
              <button
                className={`notification ${
  notificacoesAbertas ? "active-notification mobile-active" : ""
}`}
                onClick={() => setNotificacoesAbertas(!notificacoesAbertas)}
              >
                <FaBell />
                {!notificacoesLidas && <span className="notification-dot"></span>}
              </button>

              {notificacoesAbertas && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <div>
                      <h3>Notificações</h3>
                      <p>Atualizações recentes do sistema</p>
                    </div>
                  </div>

                  <div className="notification-list">
                    {notificacoes.map((item, index) => (
                      <div className="notification-item" key={index}>
                        <div className="notification-icon"></div>

                        <div>
                          <strong>{item.titulo}</strong>
                          <p>{item.texto}</p>
                          <span>{item.tempo}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="read-button"
                    onClick={() => setNotificacoesLidas(true)}
                  >
                    Marcar como lidas
                  </button>
                </div>
              )}
            </div>

            <div className="profile-wrapper">
  <button
    className={`user-avatar ${perfilAberto ? "mobile-active" : ""}`}
    onClick={() => setPerfilAberto(!perfilAberto)}
  >
    M
  </button>

  {perfilAberto && (
    <div className="profile-dropdown">
      <div className="profile-header">
        <div className="profile-avatar-large">M</div>

        <div>
          <h3>Matheus Proensa</h3>
          <p>Administrador do sistema</p>
        </div>
      </div>

      <div className="profile-status">
        <span></span>
        Online agora
      </div>

      <div className="profile-options">
        <button>Meu perfil</button>
        <button>Configurações</button>
        <button>Preferências</button>
      </div>

      <button className="logout-button">
        Sair do sistema
      </button>
    </div>
  )}
</div>
          </div>
        </header>

        <section className="cards">
          <div className="card">
            <FaDesktop className="card-icon" />
            <div>
              <span>Total</span>
              <h3>{totalAnimado}</h3>
            </div>
          </div>

          <div className="card">
            <FaClock className="card-icon" />
            <div>
              <span>Em andamento</span>
              <h3>{andamentoAnimado}</h3>
            </div>
          </div>

          <div className="card">
            <FaExclamationTriangle className="card-icon" />
            <div>
              <span>Urgentes</span>
              <h3>{urgentesAnimado}</h3>
            </div>
          </div>

          <div className="card">
            <FaCheckCircle className="card-icon" />
            <div>
              <span>Resolvidos</span>
              <h3>{resolvidosAnimado}</h3>
            </div>
          </div>
        </section>

        <section className="analytics">
          <div className="chart-card">
            <div className="section-header">
              <div>
                <h2>Chamados mensais</h2>
                <p>Volume de chamados registrados nos últimos meses</p>
              </div>

              <span className="tag">2026</span>
            </div>

            <div className="bar-chart">
              {chamadosMensais.map((item) => (
                <div className="bar-item" key={item.mes}>
                  <span className="bar-value">
  <AnimatedNumber value={item.total} />
</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ height: `${item.total}%` }}></div>
                  </div>
                  <span className="bar-label">{item.mes}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="summary-card">
            <h2>Resumo rápido</h2>

            <div className="summary-list">
              <div>
                <span>Taxa de resolução</span>
                <strong>68%</strong>
              </div>

              <div>
                <span>Tempo médio</span>
                <strong>2h 40min</strong>
              </div>

              <div>
                <span>Prioridade alta</span>
                <strong>
                  {chamados.filter((item) => item.prioridade === "Alta").length} chamados
                </strong>
              </div>
            </div>
          </div>
        </section>

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
                  <td>
                    <span className={`priority ${chamado.prioridade.toLowerCase()}`}>
                      {chamado.prioridade}
                    </span>
                  </td>
                  <td>
                  <div className="status-dropdown">
  <button
    className={`status-button ${chamado.status
      .toLowerCase()
      .replace(" ", "-")}`}
  >
    {chamado.status}
  </button>

  <div className="status-menu">
    <button
      className="menu-item pending"
      onClick={() => alterarStatus(chamado.id, "Pendente")}
    >
      Pendente
    </button>

    <button
      className="menu-item progress"
      onClick={() => alterarStatus(chamado.id, "Em andamento")}
    >
      Em andamento
    </button>

    <button
      className="menu-item resolved"
      onClick={() => alterarStatus(chamado.id, "Resolvido")}
    >
      Resolvido
    </button>
  </div>
</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {modalAberto && (
        <div className={`modal-overlay ${fechandoModal ? "closing" : ""}`}>
          <div className={`modal ${fechandoModal ? "closing" : ""}`}>
            <div className="modal-header">
              <div>
                <h2>Novo chamado</h2>
                <p>Cadastre uma nova solicitação de suporte técnico</p>
              </div>

              <button className="close-modal" onClick={fecharModal}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={cadastrarChamado} className="modal-form">
              <div className="form-group">
                <label>Usuário</label>
                <input
                  type="text"
                  placeholder="Ex: Matheus Proensa"
                  value={usuario}
                  onChange={(event) => setUsuario(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Problema</label>
                <textarea
                  placeholder="Descreva o problema..."
                  value={problema}
                  onChange={(event) => setProblema(event.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label>Prioridade</label>
                <select
                  value={prioridade}
                  onChange={(event) => setPrioridade(event.target.value as Prioridade)}
                >
                  <option>Baixa</option>
                  <option>Média</option>
                  <option>Alta</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={fecharModal}>
                  Cancelar
                </button>

                <button type="submit" className="save-button">
                  Cadastrar chamado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}