import { useState } from "react"
import api from "../services/api"

function PeopleForm(){

    //Criamos o objeto para quardar os dados do usuário
    const [people, setPeople] = useState({
        name : "",
        birthdate : "",
        cpf : "",
        phone : "",
        email : ""
    })

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
            await api.post('/api/people', people);
            alert("Pessoa criada com sucesso")

            //Importante para limpar o formulário
            setPeople({
                name : "",
                birthdate : "",
                cpf : "",
                phone : "",
                email : ""
            })
        } catch (error) {
            console.log("Erro ao cadastrar: ", error)
            alert("Erro ao cadastrar pessoa. Verifique o console")
        }
    }

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>Cadastro de Pessoa</h2>
            <form onSubmit={handleSubmit}>
                
                {/* Campo Nome */}
                <div style={{ marginBottom: '10px' }}>
                    <label>Nome:</label><br/>
                    <input 
                        type="text" 
                        name="name" 
                        value={people.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                {/* Campo Email */}
                <div style={{ marginBottom: '10px' }}>
                    <label>Email:</label><br/>
                    <input 
                        type="email" 
                        name="email" 
                        value={people.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                {/* Campo CPF */}
                <div style={{ marginBottom: '10px' }}>
                    <label>CPF:</label><br/>
                    <input 
                        type="text" 
                        name="cpf" 
                        value={people.cpf} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                {/* Campo Telefone */}
                <div style={{ marginBottom: '10px' }}>
                    <label>Telefone:</label><br/>
                    <input 
                        type="text" 
                        name="phone" 
                        value={people.phone} 
                        onChange={handleChange} 
                    />
                </div>

                {/* Campo Data de Nascimento */}
                <div style={{ marginBottom: '10px' }}>
                    <label>Data de Nascimento:</label><br/>
                    <input 
                        type="date" 
                        name="birthdate" 
                        value={people.birthdate} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}

export default PeopleForm