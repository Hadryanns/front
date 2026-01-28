import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../services/api"

function PeopleForm(){

    //Hook para navegação via código ( não sei o que faz isso )
    const navigate = useNavigate()

    //Pega o ID da URL, se existir
    const { id } = useParams()

    //Criamos o objeto para quardar os dados do usuário
    const [people, setPeople] = useState({
        name : "",
        birthdate : "",
        cpf : "",
        phone : "",
        email : ""
    })

    //Verifica se esse fórmulario é de editar ou criar pessoa
    useEffect(() => {
        if (id) {
            api.get(`api/people/${id}`).then(response => {
                setPeople(response.data).catch(error => {
                    alert("Erro ao buscar dados para edição. Verifique o console.")
                    navigate("/read/people");
                    console.error(error)
                })
            })
        }
    }, [id, navigate] ) //Roda sempre que o ID mudar

    //Pega o valor do imput e  insere no objeto, esse "name" do set people não é o msm do objeto, é tipo um ID do input
    const handleChange = (event) => {
        const {name , value} = event.target
        setPeople({ ...people, [name] : value})
    }

    //Salva os dados na api
    const handleSubmit = async (event) => {
        event.preventDefault(); //Evita que a página recarregue

        try{
            //Chama a api, enviando rota e objeto people

            if (id) {
                //Se tem ID é UPDATE
                await api.put(`/api/people/${id}`, people)
                navigate("/read/people")
                alert("Pessoa atualizada com sucesso")
            }
            else{
                //Se não tem ID é CREATE
                await api.post('/api/people', people);
                navigate("/read/people")
                alert("Pessoa criada com sucesso")
            }

            //Importante para limpar o formulário
            setPeople({
                name : "",
                birthdate : "",
                cpf : "",
                phone : "",
                email : ""
            })
        } catch (error) {

            // Alteramos aqui para ver a mensagem do servidor
            console.error("Erro completo:", error);
            
            if (error.response && error.response.data) {
                console.error("ERRO DO SPRING BOOT:", error.response.data);
                alert(`Erro no servidor: ${JSON.stringify(error.response.data)}`);
            } else {
                alert('Erro ao cadastrar. Verifique se o backend está rodando.');
            }
        }
    }

    return (
        <div className="container mt-5">
  <div className="card shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
    <div className="card-body">

      <h4 className="card-title mb-4 text-center">
        {id ? "Editar Pessoa" : "Novo Cadastro"}
      </h4>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            name="name"
            value={people.name}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Digite o nome"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={people.email}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Digite o email"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">CPF</label>
          <input
            type="text"
            name="cpf"
            value={people.cpf}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Digite o CPF"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Telefone</label>
          <input
            type="text"
            name="phone"
            value={people.phone}
            onChange={handleChange}
            className="form-control"
            placeholder="Digite o telefone"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Data de Nascimento</label>
          <input
            type="date"
            name="birthdate"
            value={people.birthdate}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            onClick={() => navigate('/read/people')}
            className="btn btn-outline-secondary"
          >
            Cancelar
          </button>

          <button type="submit" className="btn btn-primary">
            {id ? "Salvar alterações" : "Cadastrar"}
          </button>
        </div>

      </form>
    </div>
  </div>
</div>
    )
}

export default PeopleForm