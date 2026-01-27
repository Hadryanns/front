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
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: "20px" }}>
            <h2>{id ? "Editar Livro" : "Novo Livro"}</h2>
            <form onSubmit={handleSubmit}>
                
                {/* Campo Nome */}
                <div style={{ marginBottom: '10px' }}>
                    <label>Nome:</label><br/>
                    <input 
                        type="text" 
                        name="name" 
                        value={book.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                {/* Campo Email */}
                <div style={{ marginBottom: '10px' }}>
                    <label>Autor:</label><br/>
                    <input 
                        type="text" 
                        name="author" 
                        value={book.author} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                {/* Campo CPF */}
                <div style={{ marginBottom: '10px' }}>
                    <label>ISBN:</label><br/>
                    <input 
                        type="text" 
                        name="isbn" 
                        value={book.isbn} 
                        onChange={handleChange} 
                        required 
                    />
                </div>


                {/* Campo Data de Nascimento */}
                <div style={{ marginBottom: '10px' }}>
                    <label>Data de lançamento:</label><br/>
                    <input 
                        type="date" 
                        name="launchDate" 
                        value={book.launchDate} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    {/* Botão Cancelar: Volta para a Home */}
                    <button type="button" onClick={() => navigate('/read/book')} style={{ marginRight: '10px' }}>
                        Cancelar
                    </button>
                    <button type="submit">{id ? "Salvar alterações" : "Cadastrar"}</button>
                </div>

            </form>
        </div>
    )
}

export default BookForm