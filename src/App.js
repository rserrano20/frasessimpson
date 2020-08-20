import React,{useState,useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Frase from './components/Frase';
import Spinner from './components/Spinner';


function App() {
  //state
  const[personaje,setPersonaje] = useState({});
  const[cargando,setCargando] = useState(false);

  useEffect(()=> {
    consultarAPI();

  },[])

    const consultarAPI = async() =>{
      setCargando(true);
    const respuesta = await fetch("https://thesimpsonsquoteapi.glitch.me/quotes");
    const result = await respuesta.json();
    console.log(respuesta);
    console.log(result[0]);
    

    setTimeout(() =>{
      setPersonaje(result[0]);
      setCargando(false);
    },2000);

  };

  const mostrarComponente = (cargando === true)  ? <Spinner></Spinner> : <Frase personaje={personaje}></Frase>
  
  return (
    <section className="container text-center my-5">
      <article className="d-flex flex-column align-items-center">
        <img  className="w-75" src={process.env.PUBLIC_URL+"logo.png"} alt="logo de los simpson"></img>
        <Button  className="w-50 my-5 shadow" variant="outline-warning" onClick={()=> consultarAPI()}>Obtener frase</Button>
      </article>
      {mostrarComponente}
    </section>
  );
}

export default App;
