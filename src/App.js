import React, { useState } from 'react';


function App() {

  // mock de um livro para teste da tabela 
  const [livros, setLivros] = useState([
    {
    "id": Date.now(),
    "titulo": "Harry Potter",
    "genero": "Fantasia"
    }
                                        ]);

  const [formLivro, setFormLivro] = useState(
{
    "titulo": "",
    "genero": ""
});

// função para incluir uma nova linha na tabela

function handleChange(event) {

  const { name, value } = event.target;

  setFormLivro({
    ...formLivro,
    [name]: value
  });
}

// função para o botão de salvar

function handleSubmit(event) {
  event.preventDefault();

  if (livroEditando) {
    // UPDATE
    const listaAtualizada = livros.map(livro =>
      livro.id === livroEditando
        ? { ...livro, ...formLivro }
        : livro
    );

    setLivros(listaAtualizada);
    setLivroEditando(null);

  } else {
    // CREATE
    const novoLivro = {
      id: Date.now(),
      titulo: formLivro.titulo,
      genero: formLivro.genero
    };

    setLivros([...livros, novoLivro]);
  }

  setFormLivro({
    titulo: "",
    genero: ""
  });
}


// função para o botão de deletar

function handleDelete(id){
  const novaLista = livros.filter(livro => livro.id !== id);
  setLivros(novaLista);
}

function handleEdit(livro) {
  setFormLivro({
    titulo: livro.titulo,
    genero: livro.genero
  });

  setLivroEditando(livro.id);
}

// função para editar

const [livroEditando, setLivroEditando] = useState(null);


  return (
    <div className="container mt-4">
      <h1>CRUD</h1>
      <div>
<div className='card p-3 mb-4'>
<form onSubmit={handleSubmit}>

  <label className="form-label">Título: 
<input 
  type="text"
  name="titulo"
  value={formLivro.titulo}
  onChange={handleChange}
  className="form-control"
  ></input>
  </label>

    <label className="form-label">Gênero: 
<input 
  type="text"
  name="genero"
  value={formLivro.genero}
  onChange={handleChange}
  className="form-control"
  ></input>
  </label>

<button type="submit" className="btn btn-primary mt-2">
  {livroEditando ? "Atualizar" : "Salvar"}
</button>

</form>
</div>
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Título</th>
        <th>Gênero</th>
        <th>Ações</th>
      </tr>
    </thead>

    <tbody>
      
        {livros.map(livro => (
          <tr key={ livro.id }>
          <td >{ livro.titulo }</td>
          <td>{ livro.genero }</td>
<td>
  <button onClick={() => handleEdit(livro)} className="btn btn-warning btn-sm me-2">
    Editar
  </button>

  <button onClick={() => handleDelete(livro.id)} className="btn btn-danger btn-sm">
    Excluir
  </button>
</td>

                </tr>
                
        ))}

    </tbody>
  </table>
      </div>
    </div>
    
  );
}

export default App;
