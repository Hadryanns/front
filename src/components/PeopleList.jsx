import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function PeopleList() {
   const [people, setPeople] = useState([]);
   useEffect(() => {
      
       const loadPeople = async () => {
           try {
               const response = await api.get('/api/people');
               setPeople(response.data);
           } catch (error) {
               console.error("Erro:", error);
               alert("Erro ao carregar a lista de pessoas. Verifique o console.");
           }
       };

       loadPeople();

   }, []); // O array vazio garante que só rode 1 vez na abertura, não sei como isso funciona


   // Função de Excluir
   const deletePeople = async (id) => {
       if (confirm("Tem certeza que deseja excluir?")) {
           try {
               await api.delete(`/api/people/${id}`);

               // Atualiza a lista visualmente filtrando o item removido, portanto não precisamos chamar a api novamente
               setPeople(people.filter(user => user.id !== id));
           } catch (error) {
               console.error("Erro:", error);
               alert("Erro ao excluir.");
           }
       }
   };

   return (
       <div style={{ padding: '10px'}}>

           
           <div style={{ display: 'flex', marginBottom: '20px', alignItems : "center" , width : "100%"}}>
            
            <div style={{display : "flex", gap : "10px", alignItems : "center"  }}>
               <h2>Lista de Pessoas</h2>

               <Link to="/read/book">
                   <button>Lista de livros </button>
               </Link>

               <Link to="/read/loan">
                   <button>Lista de empréstimos</button>
               </Link>
            </div>




            <div style={{ display: 'flex', minWidth : "70%", flexDirection : "row-reverse"
            , columnGap : "15px"}}>
               <Link to="/register/people">
                   <button>Novo Empréstimo</button>
               </Link>

               <Link to="/register/book">
                   <button>Novo Livro</button>
               </Link>

               <Link to="/register/people">
                   <button>Nova Pessoa</button>
               </Link>
            </div>
              
           </div>
          
           <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
               <thead>
                   <tr>
                       <th>Nome</th>
                       <th>CPF</th>
                       <th>Email</th>
                       <th>Ações</th>
                   </tr>
               </thead>
               <tbody>
                   {people.map((user) => (
                       <tr key={user.id}>
                           <td>{user.name}</td>
                           <td>{user.cpf}</td>
                           <td>{user.email}</td>
                           <td>

                                <Link to={`/update/people/${user.id}`}>
                                    <button style={{ marginRight: '5px' }}>Editar</button>
                                </Link>
                               
                               <button
                                   onClick={() => deletePeople(user.id)}
                                   style={{ backgroundColor: '#ffcccc', cursor: 'pointer' }}>
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

export default PeopleList;