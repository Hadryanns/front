import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function BookList() {
   const [book, setBook] = useState([]);
   useEffect(() => {
      
       const loadBook = async () => {
           try {
               const response = await api.get('/api/book');
               setBook(response.data);
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
       <div style={{ padding: '10px'}}>

           
           <div style={{ display: 'flex', marginBottom: '20px', alignItems : "center" , width : "100%"}}>
            
            <div style={{display : "flex", gap : "10px", alignItems : "center"  }}>
               <h2>Lista de Livros</h2>
            </div>


            <div style={{ display: 'flex', minWidth : "70%", flexDirection : "row-reverse"
            , columnGap : "15px"}}>
               <Link to="/register/book">
                   <button>Novo Livro</button>
               </Link>

               <Link to="/read/loan">
                   <button>Página inicial</button>
               </Link>
            </div>
              
           </div>
          
           <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
               <thead>
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
                           <td>

                                <Link to={`/update/book/${livro.id}`}>
                                    <button style={{ marginRight: '5px' }}>Editar</button>
                                </Link>
                               
                               <button
                                   onClick={() => deleteBook(livro.id)}
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

export default BookList;