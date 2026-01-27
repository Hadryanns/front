import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function LoanList() {
   const [loan, setLoan] = useState([]);
   useEffect(() => {
      
       const loadLoan = async () => {
           try {
               const response = await api.get('/api/loan');
               console.log(response.data)
               if (Array.isArray(response.data)){
                   setLoan(response.data);
               }
               else{
                setLoan([])
               }
           } catch (error) {
               console.error("Erro:", error);
               alert("Erro ao carregar a lista de empréstimos. Verifique o console.");
           }
       };

       loadLoan();

   }, []); // O array vazio garante que só rode 1 vez na abertura, não sei como isso funciona


   // Função de Excluir
   const deleteLoan = async (id) => {
       if (confirm("Tem certeza que deseja excluir?")) {
           try {
               await api.delete(`/api/loan/${id}`);

               // Atualiza a lista visualmente filtrando o item removido, portanto não precisamos chamar a api novamente
               setLoan(loan.filter(emprestimo => emprestimo.id !== id));
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
               <h2>Histórico de empréstimo</h2>

               <Link to="/read/book">
                   <button>Lista de livros</button>
               </Link>

               <Link to="/read/people">
                   <button>Lista de pessoas</button>
               </Link>
            </div>




            <div style={{ display: 'flex', minWidth : "70%", flexDirection : "row-reverse"
            , columnGap : "15px"}}>
               <Link to="/register/loan">
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
                       <th>Nome do Livro</th>
                       <th>Nome da Pessoa</th>
                       <th>Data de Empréstimo</th>
                       <th>Data de Retorno</th>
                       <th>Retornou?</th>
                   </tr>
               </thead>
               <tbody>
                   {loan.map((emprestimo) => (
                       <tr key={emprestimo.id}>
                           <td>{emprestimo.book.name}</td>
                           <td>{emprestimo.people.name}</td>
                           <td>{emprestimo.loanDate}</td>
                           <td>{emprestimo.returnDate}</td>
                           <td>{emprestimo.returned}</td>
                           <td>

                                <Link to={`/update/loan/${emprestimo.id}`}>
                                    <button style={{ marginRight: '5px' }}>Editar</button>
                                </Link>
                               
                               <button
                                   onClick={() => deleteLoan(loan.id)}
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

export default LoanList;