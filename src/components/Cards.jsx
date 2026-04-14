import supabase from "../supabase-client";


export default function Cards ({ controleForm = [], setControleForm, handleEdit }) {

    async function handleDelete(id) {
        const { error } = await supabase
        .from("Servico")
        .delete()
        .eq("id", id);
    
        if (error) {
          console.log("Error deleting: ", error);
          return;
        }

        console.log("Excluir serviço com ID:", id);
        const novaLista = controleForm.filter(servicos => servicos.id !== id);
        setControleForm(novaLista);
    }

   return (

<div>
    {controleForm.length === 0 && <p>Nenhum serviço cadastrado.</p>}
    {controleForm.map((servico) => (
        <article key={servico.id}>
            <h3>{servico?.nome_cliente || "Sem nome"}</h3>
            <small><em>{servico.id}</em></small>

            <p><strong>Status:</strong>{" "}
            {servico.status === 'Pendente' ? <span style={{ color: "orange" }}>{servico.status}</span> : <span>{servico.status}</span>}
            </p>
            <p><strong>Telefone:</strong> {servico.telefone}</p>
            <p><strong>Rota:</strong><br />
            {servico.endereco_origem} → {servico.endereco_destino}
            </p>

            <p><strong>Valor:</strong> {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(servico.valor_frete)}</p>

            {servico.obs && (
        <p><strong>Obs:</strong> {servico.obs}</p>
            )}
            <div style={{
                display: "flex",
                gap: "1rem",
                marginTop: "1rem"
            }}>
            <button onClick={() => handleEdit(servico.id)}>Editar</button>
            <button onClick={() => handleDelete(servico.id)}>Excluir</button>
        </div>
        </article>
    ))}
</div>
)}