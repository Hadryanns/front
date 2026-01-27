import PeopleForm from "../components/PeopleForm";
import { Link } from "react-router-dom";

function Root() {
    return (
        <div style={{
            display : "flex",
            flexDirection: "column",
            alignItems : "center"
        }}>
            <h1>SISTEMA DE EMPRÉSTIMO DE LIVROS</h1>
            <h2>GOKUMONKYOU</h2>
            <Link to="/read/loan">
                <img src="../src/assets/gojo-getulio_vargas.png" height={"500px"}/>
            </Link>
        </div>
    );
}

export default Root;