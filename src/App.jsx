import Root from "./pages/Root";
import PeopleList from "./components/PeopleList";
import PeopleForm from "./components/PeopleForm";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import LoanList from "./components/LoanList";

import { Routes, Route } from "react-router-dom";
import LoanForm from "./components/LoanForm";

function App() {
  return (
    <div className="App">
        {/* O componente Routes funciona como um "Switch" de endereços */}
        <Routes>

            {/* Raiz */}
            <Route path="/" element = {<Root/>}/>


            {/* People Routes */}
            <Route path="/read/people" element={<PeopleList/>}/>
            <Route path="/register/people" element={<PeopleForm/>}/>
            <Route path="/update/people/:id" element={<PeopleForm/>}/>
            
            {/* Book Routes */}
            <Route path="/read/book" element={<BookList/>}/>
            <Route path="/register/book" element={<BookForm/>}/>
            <Route path="/update/book/:id" element={<BookForm/>}/>

            {/* Loan Routes */}
            <Route path="/read/loan" element={<LoanList/>}/>
            <Route path="/register/loan" element={<LoanForm/>}/>
            <Route path="/update/loan/:id" element={<LoanForm/>}/>

        </Routes>
    </div>
  )
}

export default App;