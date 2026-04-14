import Input from "the-mask-input"

export default function Form({ formData, handleChange, addServico, ProdutoEditando }) {
return (
<form onSubmit={addServico}>
  <Input
    type="text"
    name="nome_cliente"
    value={formData.nome_cliente}
    onChange={handleChange}
    placeholder="Nome do cliente"
  />

  <Input
    type="tel"
    name="telefone"
    value={formData.telefone}
    onChange={handleChange}
    placeholder="Telefone. Ex: (11) 99999-9999"
    mask="telephone"
    required
  />

  <Input
    type="text"
    name="endereco_origem"
    value={formData.endereco_origem}
    onChange={handleChange}
    placeholder="Endereço de origem"
  />

  <Input
    type="text"
    name="endereco_destino"
    value={formData.endereco_destino}
    onChange={handleChange}
    placeholder="Endereço de destino"
  />

  <select name="tipo_servico"
          value={formData.tipo_servico}
          onChange={handleChange}>
    <option value="">Tipo de serviço</option>
    <option value="mudanca_residencial">Mudança residencial</option>
    <option value="frete_simples">Frete simples</option>
  </select>

  <textarea
    name="obs"
    value={formData.obs}
    onChange={handleChange}
    placeholder="Observações"
  />

  <Input
    type="number"
    name="valor_frete"
    value={formData.valor_frete}
    onChange={handleChange}
    placeholder="Valor do frete"
    step="0.01"
  />

  <select name="status"
          value={formData.status}
          onChange={handleChange}>
    <option value="">Status</option>
    <option value="Pendente">Pendente</option>
    <option value="Em andamento">Em andamento</option>
    <option value="Concluído">Concluído</option>
    <option value="Cancelado">Cancelado</option>
  </select>

  {ProdutoEditando ? (<button type="submit">Atualizar</button>) : (<button type="submit">Salvar</button>)}
  
</form>

)}