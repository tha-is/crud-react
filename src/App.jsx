import { useState, useEffect } from "react"
import supabase from "./supabase-client"
import Form from "./components/ProductForm";
import '@picocss/pico/css/pico.min.css'
import Footer from "./components/Footer";
import Cards from "./components/Cards";

function App() {

  const [controleForm, setControleForm] = useState([]);
  const [formData, setFormData] = useState({
  nome_cliente: "",
  telefone: "",
  endereco_origem: "",
  endereco_destino: "",
  tipo_servico: "",
  obs: "",
  valor_frete: "",
  status: ""
  });
  const [produtoEditando, setProdutoEditando] = useState(null);

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));
};

  // a pag carrega e confere se a busca dos dados deu erro, senão ele guarda os dados no SetControleForm
  useEffect(() => {
    fetchControle();
  }, []);

  const fetchControle = async () => {
    const { data, error } = await supabase
    .from("Servico")
    .select("*");

    console.log(data)

    if (error) {
      console.log("Error fetching: ", error);
    } else {
      setControleForm(data);
    }} 

const addServico = async (e) => {
  e.preventDefault();

  try {
    if (produtoEditando) {
      // UPDATE
      const { data, error } = await supabase
        .from("Servico")
        .update(formData)
        .eq("id", produtoEditando)
        .select()
        .single();

      if (error) throw error;

      setControleForm((prev) =>
        prev.map((item) =>
          item.id === produtoEditando ? data : item
        )
      );

      setProdutoEditando(null);
      setFormData({
        nome_cliente: "",
        telefone: "",
        endereco_origem: "",
        endereco_destino: "",
        tipo_servico: "",
        obs: "",
        valor_frete: "",
        status: ""
      });

    } else {
      // INSERT
      const { data, error } = await supabase
        .from("Servico")
        .insert([formData])
        .select()
        .single();

      if (error) throw error;

      setControleForm((prev) => [...prev, data]);

      // limpa o formulário
      setFormData({
        nome_cliente: "",
        telefone: "",
        endereco_origem: "",
        endereco_destino: "",
        tipo_servico: "",
        obs: "",
        valor_frete: "",
        status: ""
      });
    }

  } catch (error) {
    console.log("Erro:", error.message);
  }
};

  async function handleEdit(id) {
        const servico = controleForm.find(item => item.id === id);
        
        setFormData(servico);
        setProdutoEditando(null);
    }

  return (
  <div>
  <div style={{
    maxWidth: "700px", 
    margin: "0 auto",
    padding: "1rem"}}>
  <Form 
  formData={formData}
  handleChange={handleChange}
  addServico={addServico}
  />

  <div>
  <Cards 
  controleForm={controleForm} 
  setControleForm={setControleForm}
  formData={formData}
  setFormData={setFormData}
  handleEdit={handleEdit}
/> 
  </div>
  </div>
  <Footer controleForm={controleForm} />
  </div>
  )
}
export default App