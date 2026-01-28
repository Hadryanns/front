import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function PeopleList() {
   const [people, setPeople] = useState([]);
   useEffect(() => {
      
       const loadPeople = async () => {
           try {
               const response = await api.get('/api/people');
               if (Array.isArray(response.data)){
                   setPeople(response.data);
               }
               else{
                setPeople([])
               }
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
       <div className="container mt-3">

  {/* Cabeçalho */}
  <div className="d-flex justify-content-between align-items-center mb-3">

    {/* Esquerda */}
    <div className="d-flex align-items-center gap-2">
      <h4 className="mb-0">Pessoas</h4>

      <Link to="/read/loan" className="btn btn-outline-primary btn-sm">
        Histórico de Empréstimos
      </Link>

      <Link to="/read/book" className="btn btn-outline-primary btn-sm">
        Lista de Livros
      </Link>
    </div>

    {/* Direita */}
    <Link to="/register/people" className="btn btn-success">
      + Nova Pessoa
    </Link>
  </div>

  {/* Tabela */}
  <table className="table table-bordered table-hover text-center align-middle">
    <thead className="table-dark">
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

          <td className="d-flex justify-content-center gap-2">
            <Link to={`/update/people/${user.id}`} className="btn btn-warning btn-sm">
              Editar
            </Link>

            <button
              onClick={() => deletePeople(user.id)}
              className="btn btn-danger btn-sm"
            >
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