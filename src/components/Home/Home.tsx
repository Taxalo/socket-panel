import "./home.css";
import {Link} from "react-router-dom";

function Home() {
 return (
     <section id="home">
         <h1>HOME</h1>
         <Link to={"/sockets"}>SOCKETS</Link>
     </section>
 )
}

export default Home;