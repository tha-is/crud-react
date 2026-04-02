import React, { useState, useEffect } from 'react';
import './win2k.css';

// ── Small helper: current time for the system tray ──────────────────
function SystemClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span>
      {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
    </span>
  );
}

// ── Main App ─────────────────────────────────────────────────────────
export default function App() {

  const [produtos, setProdutos] = useState([
    {
      id: Date.now(),
      nome: 'Mouse Gamer',
      valor: 150.00,
      categoria: 'Eletronicos',
      estoque: 15,
      descricao: 'Mouse RGB com 6 botoes',
    },
  ]);

  const emptyForm = { nome: '', valor: 0.00, categoria: '', estoque: 0, descricao: '' };
  const [formProduto, setFormProduto] = useState(emptyForm);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormProduto({ ...formProduto, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (produtoEditando) {
      setProdutos(produtos.map(p =>
        p.id === produtoEditando ? { ...p, ...formProduto } : p
      ));
      setProdutoEditando(null);
    } else {
      setProdutos([...produtos, { id: Date.now(), ...formProduto }]);
    }
    setFormProduto(emptyForm);
  }

  function handleDelete(id) {
    if (window.confirm('Excluir este produto?')) {
      setProdutos(produtos.filter(p => p.id !== id));
      if (selectedRow === id) setSelectedRow(null);
    }
  }

  function handleEdit(produto) {
    setFormProduto({
      nome: produto.nome,
      valor: produto.valor,
      categoria: produto.categoria,
      estoque: produto.estoque,
      descricao: produto.descricao,
    });
    setProdutoEditando(produto.id);
    setSelectedRow(produto.id);
  }

  function handleCancel() {
    setFormProduto(emptyForm);
    setProdutoEditando(null);
  }

  return (
    <>
      {/* ── Desktop ── */}
      <div className="win2k-desktop" style={{ paddingBottom: 44 }}>

        {/* ── Main Window ── */}
        <div className="win2k-window" style={{ marginTop: 16 }}>

          {/* Title Bar */}
          <div className="win2k-titlebar">
            <div className="win2k-titlebar-title">
              <span className="win2k-titlebar-icon" aria-hidden="true">📦</span>
              <span>Gerenciador de Produtos — CRUD React</span>
            </div>
            <div className="win2k-titlebar-controls" aria-hidden="true">
              <button className="win2k-titlebar-btn" title="Minimizar">_</button>
              <button className="win2k-titlebar-btn" title="Maximizar">□</button>
              <button className="win2k-titlebar-btn" title="Fechar" style={{ marginLeft: 2, fontWeight: 'bold' }}>✕</button>
            </div>
          </div>

          {/* Menu Bar */}
          <nav className="win2k-menubar" aria-label="Menu principal">
            <span className="win2k-menu-item"><u>A</u>rquivo</span>
            <span className="win2k-menu-item"><u>E</u>ditar</span>
            <span className="win2k-menu-item"><u>V</u>isualizar</span>
            <span className="win2k-menu-item"><u>A</u>juda</span>
          </nav>

          {/* Content */}
          <div className="win2k-content">

            {/* ── Form GroupBox ── */}
            <div className="win2k-groupbox" style={{ marginTop: 12 }}>
              <span className="win2k-groupbox-legend">
                {produtoEditando ? '✏ Editar Produto' : '➕ Novo Produto'}
              </span>

              <form onSubmit={handleSubmit} className="win2k-groupbox-inner">
                <div className="win2k-form-grid">

                  <div className="win2k-form-field">
                    <label htmlFor="nome">Nome do produto:</label>
                    <input
                      id="nome"
                      type="text"
                      name="nome"
                      value={formProduto.nome}
                      onChange={handleChange}
                      className="win2k-input"
                      required
                    />
                  </div>

                  <div className="win2k-form-field">
                    <label htmlFor="valor">Valor (R$):</label>
                    <input
                      id="valor"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      name="valor"
                      value={formProduto.valor}
                      onChange={handleChange}
                      className="win2k-input"
                    />
                  </div>

                  <div className="win2k-form-field">
                    <label htmlFor="categoria">Categoria:</label>
                    <input
                      id="categoria"
                      type="text"
                      name="categoria"
                      value={formProduto.categoria}
                      onChange={handleChange}
                      className="win2k-input"
                    />
                  </div>

                  <div className="win2k-form-field">
                    <label htmlFor="estoque">Qtd. em estoque:</label>
                    <input
                      id="estoque"
                      type="number"
                      name="estoque"
                      value={formProduto.estoque}
                      onChange={handleChange}
                      className="win2k-input"
                    />
                  </div>

                  <div className="win2k-form-field" style={{ gridColumn: '1 / -1' }}>
                    <label htmlFor="descricao">Descrição:</label>
                    <input
                      id="descricao"
                      type="text"
                      name="descricao"
                      maxLength="50"
                      value={formProduto.descricao}
                      onChange={handleChange}
                      className="win2k-input"
                    />
                  </div>

                </div>

                <div className="win2k-btn-row">
                  <button type="submit" className="win2k-btn win2k-btn-primary">
                    {produtoEditando ? '💾 Atualizar' : '💾 Salvar'}
                  </button>
                  {produtoEditando && (
                    <button type="button" className="win2k-btn" onClick={handleCancel}>
                      ✕ Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* ── ListView / Table GroupBox ── */}
            <div className="win2k-groupbox" style={{ marginTop: 20 }}>
              <span className="win2k-groupbox-legend">📋 Lista de Produtos</span>
              <div className="win2k-groupbox-inner" style={{ overflowX: 'auto' }}>
                <table className="win2k-listview">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Valor</th>
                      <th>Categoria</th>
                      <th>Estoque</th>
                      <th>Descrição</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtos.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '12px', color: '#808080' }}>
                          Nenhum produto cadastrado.
                        </td>
                      </tr>
                    ) : (
                      produtos.map(produto => (
                        <tr
                          key={produto.id}
                          className={selectedRow === produto.id ? 'selected' : ''}
                          onClick={() => setSelectedRow(produto.id)}
                        >
                          <td>{produto.nome}</td>
                          <td>R$ {Number(produto.valor).toFixed(2)}</td>
                          <td>{produto.categoria}</td>
                          <td>{produto.estoque}</td>
                          <td>{produto.descricao}</td>
                          <td style={{ display: 'flex', gap: 4, padding: '2px 4px' }}>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleEdit(produto); }}
                              className="win2k-btn win2k-btn-warning"
                            >
                              ✏ Editar
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDelete(produto.id); }}
                              className="win2k-btn win2k-btn-danger"
                            >
                              🗑 Excluir
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>{/* /win2k-content */}

          {/* Status Bar */}
          <div className="win2k-statusbar">
            <span className="win2k-status-panel">
              {produtos.length} objeto(s)
            </span>
            <span className="win2k-status-panel">
              {produtoEditando ? 'Modo edição' : 'Pronto'}
            </span>
          </div>

        </div>{/* /win2k-window */}
      </div>

      {/* ── Taskbar ── */}
      <footer className="win2k-taskbar" role="toolbar" aria-label="Barra de tarefas">
        <button className="win2k-start-btn" aria-label="Iniciar">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Windows_Logo_1995.svg/20px-Windows_Logo_1995.svg.png"
            alt=""
            width={16}
            height={16}
          />
          Iniciar
        </button>
        <div style={{ width: 1, height: 20, background: '#808080', margin: '0 2px' }} aria-hidden="true" />
        <button className="win2k-taskbar-window-btn">
          📦 Gerenciador de Produtos
        </button>
        <div className="win2k-taskbar-tray" aria-label="Área de notificação">
          <span aria-hidden="true">🔊</span>
          <span aria-hidden="true">🌐</span>
          <SystemClock />
        </div>
      </footer>
    </>
  );
}
