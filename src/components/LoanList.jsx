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

   //Função de Update
   const updateLoan = async (id) => {
    if (confirm("Devolver livro ao acervo?")){
        try {
            await api.put(`/api/loan/${id}`, {});
            window.location.reload()
        } catch (error) {
            console.error("Erro:", error);
               alert("Erro ao editar.");
        }
        
    }
   }

   return (
       <div className="container mt-3">

  {/* Topo */}
  <div className="d-flex justify-content-between align-items-center mb-3">

    {/* Esquerda */}
    <div className="d-flex align-items-center gap-2">
      <h4 className="mb-0">Histórico de empréstimo</h4>

      <Link to="/read/book" className="btn btn-outline-primary btn-sm">
        Lista de livros
      </Link>

      <Link to="/read/people" className="btn btn-outline-primary btn-sm">
        Lista de pessoas
      </Link>
    </div>

    {/* Direita */}
    <Link to="/register/loan" className="btn btn-success">
      + Novo Empréstimo
    </Link>
  </div>

  {/* Tabela */}
  <table className="table table-bordered table-hover text-center align-middle">
    <thead className="table-dark">
      <tr>
        <th>Nome do Livro</th>
        <th>Nome da Pessoa</th>
        <th>Data de Empréstimo</th>
        <th>Data de Retorno</th>
        <th>Retornou?</th>
        <th>Ações</th>
      </tr>
    </thead>

    <tbody>
      {loan.map((emprestimo) => (
        <tr key={emprestimo.id}>
          <td>{emprestimo.book.name}</td>
          <td>{emprestimo.people.name}</td>
          <td>{emprestimo.loanDate}</td>
          <td>{emprestimo.returnDate}</td>
          <td>
            {emprestimo.returned 
              ? <span className="badge bg-success">Sim</span>
              : <span className="badge bg-danger">Não</span>
            }
          </td>
          <td className="d-flex justify-content-center gap-2">
            <button 
              onClick={() => updateLoan(emprestimo.id)} 
              className="btn btn-warning btn-sm">
              Retornou
            </button>

            <button 
              onClick={() => deleteLoan(emprestimo.id)} 
              className="btn btn-danger btn-sm">
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