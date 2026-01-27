import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../services/api"

function LoanForm(){

    //Hook para navegação via código ( não sei o que faz isso )
    const navigate = useNavigate()

    //Pega o ID da URL, se existir
    const { id } = useParams()

    //Criamos o objeto para quardar os dados do usuário
    const [loan, setLoan] = useState({
        cpf : "",
        isbn : "",
        returnDate : ""
    })

    //Verifica se esse fórmulario é de editar ou criar pessoa
    useEffect(() => {
        if (id) {
            api.get(`api/loan/${id}`).then(response => {
                console.log(response.data)
                setLoan(response.data).catch(error => {
                    alert("Erro ao buscar dados para edição. Verifique o console.")
                    navigate("/read/loan");
                    console.error(error)
                })
            })
        }
    }, [id, navigate] ) //Roda sempre que o ID mudar

    //Pega o valor do imput e  insere no objeto, esse "name" do set people não é o msm do objeto, é tipo um ID do input
    const handleChange = (event) => {
        const {name , value} = event.target
        setLoan({ ...loan, [name] : value})
    }

    //Salva os dados na api
    const handleSubmit = async (event) => {
        event.preventDefault(); //Evita que a página recarregue

        try{
            //Chama a api, enviando rota e objeto people

            if (id) {
                //Se tem ID é UPDATE
                await api.put(`/api/loan/${id}`, loan)
                navigate("/read/loan")
                alert("Empréstimo atualizado com sucesso")
            }
            else{
                //Se não tem ID é CREATE
                await api.post('/api/loan', loan);
                navigate("/read/loan")
                alert("Empréstimo criado com sucesso")
            }

            //Importante para limpar o formulário
            setLoan({
                cpf : "",
                isbn : "",
                returnDate : ""
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
            <h2>{id ? "Editar Empréstimo" : "Novo Empréstimo"}</h2>
            <form onSubmit={handleSubmit}>
                
                {/* Campo Nome */}
                <div style={{ marginBottom: '10px' }}>
                    <label>CPF:</label><br/>
                    <input 
                        type="text" 
                        name="cpf" 
                        value={loan.people.cpf} 
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
                        value={loan.book.isbn} 
                        onChange={handleChange} 
                        required 
                    />
                </div>


                {/* Campo Data de Nascimento */}
                <div style={{ marginBottom: '10px' }}>
                    <label>Data de retorno:</label><br/>
                    <input 
                        type="date" 
                        name="returnDate" 
                        value={loan.returnDate} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    {/* Botão Cancelar: Volta para a Home */}
                    <button type="button" onClick={() => navigate('/read/loan')} style={{ marginRight: '10px' }}>
                        Cancelar
                    </button>
                    <button type="submit">{id ? "Salvar alterações" : "Cadastrar"}</button>
                </div>

            </form>
        </div>
    )
}

export default LoanForm