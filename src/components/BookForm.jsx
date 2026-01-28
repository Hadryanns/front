import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../services/api"

function BookForm(){

    //Hook para navegação via código ( não sei o que faz isso )
    const navigate = useNavigate()

    //Pega o ID da URL, se existir
    const { id } = useParams()

    //Criamos o objeto para quardar os dados do usuário
    const [book, setBook] = useState({
        name : "",
        author : "",
        isbn : "",
        launchDate : ""
    })

    //Verifica se esse fórmulario é de editar ou criar pessoa
    useEffect(() => {
        if (id) {
            api.get(`api/book/${id}`).then(response => {
                console.log(response.data)
                setBook(response.data).catch(error => {
                    alert("Erro ao buscar dados para edição. Verifique o console.")
                    navigate("/read/book");
                    console.error(error)
                })
            })
        }
    }, [id, navigate] ) //Roda sempre que o ID mudar

    //Pega o valor do imput e  insere no objeto, esse "name" do set people não é o msm do objeto, é tipo um ID do input
    const handleChange = (event) => {
        const {name , value} = event.target
        setBook({ ...book, [name] : value})
    }

    //Salva os dados na api
    const handleSubmit = async (event) => {
        event.preventDefault(); //Evita que a página recarregue

        try{
            //Chama a api, enviando rota e objeto people

            if (id) {
                //Se tem ID é UPDATE
                await api.put(`/api/book/${id}`, book)
                navigate("/read/book")
                alert("Livro atualizado com sucesso")
            }
            else{
                //Se não tem ID é CREATE
                await api.post('/api/book', book);
                navigate("/read/book")
                alert("Livro criado com sucesso")
            }

            //Importante para limpar o formulário
            setBook({
                name : "",
                author : "",
                isbn : "",
                launchDate : ""
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
        {id ? "Editar Livro" : "Novo Livro"}
      </h4>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            name="name"
            value={book.name}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Digite o nome do livro"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Autor</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Digite o autor"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">ISBN</label>
          <input
            type="text"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Digite o ISBN"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Data de lançamento</label>
          <input
            type="date"
            name="launchDate"
            value={book.launchDate}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            onClick={() => navigate('/read/book')}
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

export default BookForm