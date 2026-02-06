import React, { useState } from 'react';

export default function App() {

  // um produto para teste da tabela 
  const [produtos, setProdutos] = useState([
    {
    "id": Date.now(),
    "nome": "Mouse Gamer",
    "valor": 150.00,
    "categoria":"Eletronicos",
    "estoque": 15,
    "descricao": "Mouse RGB com 6 botoes"
    }
                                        ]);

  const [formProduto, setFormProduto] = useState(
{
    "nome": "",
    "valor": 0.00,
    "categoria":"",
    "estoque": 0,
    "descricao": ""
});

// função para incluir uma nova linha na tabela

function handleChange(event) {

  const { name, value } = event.target;
  // mesmo que escrever:
  // const name = event.target.name
  // const value = event.target.value

  setFormProduto({
    ...formProduto,
    // formProduto mantem as informações anteriores do formulário e incrementa/atualiza o que foi digitado. (arrays e objetos)
    // const pessoa { nome: "Thais", idade: 25 }; 
    // const novaPessoa { ...pessoa, cidade: "RJ" }, vira um objeto só => 
    // { nome: "Thais", idade: 25, cidade: "RJ" }
    [name]: value
    // [name] refere-se ao name do input e "value" o valor digitado que se recebe no input
  });
}

// função para o botão de salvar

function handleSubmit(event) {
  event.preventDefault(); // impede que o form reinicie a pagina

  if (produtoEditando) {
    // atualizar
    const listaAtualizada = produtos.map(produto =>  //cria a variavel listaAtualizada
    produto.id === produtoEditando // esse é o produto que estou editando?
        ? { ...produto, ...formProduto } // se sim, pega o estado e substitui pelos novos do formulário atual
        : produto // se não for o produto, mantem o antigo
    );

    setProdutos(listaAtualizada); // ao finalizar a alteração, será substituido pela lista atualizada, declarada acima.
    setProdutoEditando(null);

  } else { // caso não achar o id do produto, adicione um produto novo
    // criar
    const novoProduto = {
      id: Date.now(),
      nome: formProduto.nome,
      valor: formProduto.valor,
      categoria: formProduto.categoria,
      estoque: formProduto.estoque,
      descricao: formProduto.descricao
    };

    setProdutos([...produtos, novoProduto]);
  }

  setFormProduto({
    "nome": "",
    "valor": 0.00,
    "categoria":"",
    "estoque": 0,
    "descricao": ""
  });
}

// função para o botão de deletar
function handleDelete(id){
  const novaLista = produtos.filter(produto => produto.id !== id); // ao selecionar o produto, ele vai filtrar todos os outros que não tem o id selecionado
  setProdutos(novaLista); // guarda uma lista sem o produto deletado
}

// função para editar
function handleEdit(produto) { // ao clicar lá no button "editar", ele envia tudo preenchido para edição 
  setFormProduto({
    nome: produto.nome,
    valor: produto.valor,
    categoria: produto.categoria,
    estoque: produto.estoque,
    descricao: produto.descricao
  });

  setProdutoEditando(produto.id); // guarda o id
}

const [produtoEditando, setProdutoEditando] = useState(null); // produtoEditandprimeiro estado onde nenhum está sendo editado e setProdutoEditando o produto editado

  return (
    <div className="container">
      <h1 className="text-center pt-2">CRUD</h1>

<form onSubmit={handleSubmit}>
<div className="row">

<div className="col-md-6 mb-3">
      <label className="form-label">Nome do produto: 
<input 
  type="text"
  name="nome"
  value={formProduto.nome}
  onChange={handleChange}
  className="form-control"
  ></input>
  </label>
</div>

<div className="col-md-6 mb-3">
      <label className="form-label">Valor: 
<input 
  type="number"
  step="00.01"
  min="0"
  placeholder="0.00"
  name="valor"
  value={formProduto.valor}
  onChange={handleChange}
  className="form-control"
  ></input>
  </label>
</div>

<div className="col-md-6 mb-3">
      <label className="form-label">Categoria: 
<input 
  type="text"
  name="categoria"
  value={formProduto.categoria}
  onChange={handleChange}
  className="form-control"
  ></input>
  </label>
</div>

<div className="col-md-6 mb-3">
      <label className="form-label">Qtd estoque: 
<input 
  type="number"
  name="estoque"
  value={formProduto.estoque}
  onChange={handleChange}
  className="form-control"
  ></input>
  </label>
</div>

<div className="col-md-6 mb-3">
      <label className="form-label">Descrição: 
<input 
  type="text"
  name="descricao"
  maxlength="30"
  value={formProduto.descricao}
  onChange={handleChange}
  className="form-control"
  ></input>
  </label>
</div>

<button type="submit" className="btn btn-dark p-2 mb-2">
  {produtoEditando ? "Atualizar" : "Salvar"}
</button>

</div>
</form>
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Valor</th>
        <th>Categoria</th>
        <th>Estoque</th>
        <th>Descrição</th>
      </tr>
    </thead>

    <tbody>
      
        {produtos.map(produto => (
          <tr key={ produto.id }>
          <td>{ produto.nome }</td>
          <td >{ produto.valor }</td>
          <td>{ produto.categoria }</td>
          <td>{ produto.estoque }</td>
          <td>{ produto.descricao }</td>
<td>
  <button onClick={() => handleEdit(produto)} className="btn btn-warning btn-sm me-2">
    Editar
  </button>

  <button onClick={() => handleDelete(produto.id)} className="btn btn-danger btn-sm">
    Excluir
  </button>
</td>
                </tr>
        ))}

    </tbody>
  </table>
      </div>
    
  );
}