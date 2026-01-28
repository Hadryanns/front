import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function BookList() {
   const [book, setBook] = useState([]);
   useEffect(() => {
      
       const loadBook = async () => {
           try {
               const response = await api.get('/api/book');
               if (Array.isArray(response.data)){
                   setBook(response.data);
               }
               else{
                setBook([])
               }
           } catch (error) {
               console.error("Erro:", error);
               alert("Erro ao carregar a lista de livros. Verifique o console.");
           }
       };

       loadBook();

   }, []); // O array vazio garante que só rode 1 vez na abertura, não sei como isso funciona


   // Função de Excluir
   const deleteBook = async (id) => {
       if (confirm("Tem certeza que deseja excluir?")) {
           try {
               await api.delete(`/api/book/${id}`);

               // Atualiza a lista visualmente filtrando o item removido, portanto não precisamos chamar a api novamente
               setBook(book.filter(livro => livro.id !== id));
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
      <h4 className="mb-0">Livros</h4>

      <Link to="/read/loan" className="btn btn-outline-primary btn-sm">
        Histórico de Empréstimos
      </Link>

      <Link to="/read/people" className="btn btn-outline-primary btn-sm">
        Lista de Pessoas
      </Link>
    </div>

    {/* Direita */}
    <Link to="/register/book" className="btn btn-success">
      + Novo Livro
    </Link>
  </div>

  {/* Tabela */}
  <table className="table table-bordered table-hover text-center align-middle">
    <thead className="table-dark">
      <tr>
        <th>Nome</th>
        <th>Autor</th>
        <th>ISBN</th>
        <th>Ações</th>
      </tr>
    </thead>

    <tbody>
      {book.map((livro) => (
        <tr key={livro.id}>
          <td>{livro.name}</td>
          <td>{livro.author}</td>
          <td>{livro.isbn}</td>

          <td className="d-flex justify-content-center gap-2">
            <Link to={`/update/book/${livro.id}`} className="btn btn-warning btn-sm">
              Editar
            </Link>

            <button
              onClick={() => deleteBook(livro.id)}
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

export default BookList;