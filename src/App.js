import {FiSearch} from 'react-icons/fi';
import './style.css';
import { useState } from 'react';
import api from './services/api';

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if(input === ""){
      alert('Digite um cep valido')
      return
    }
    try{
      const response = await api.get(`${input}/json/`);
      console.log(response.data)
      setCep(response.data);

    }catch{
      alert('Cep não encontrado');
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Bsucador CEP</h1>

      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu cep.."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#FFF'/>
        </button>
      </div>

      {Object.keys(cep).length > 0 &&(

        <main className='main'>
          <h2>CEP: {cep.cep}  </h2>

          <span>{cep.logradouro}</span>
          {Object.keys(cep.complemento).length > 0 &&(
            <span>Complemento: {cep.complemento}</span>
          )}
          <span>{cep.bairro} </span>
          <span>{cep.localidade} - {cep.uf} </span>
        </main>
      ) }
    </div>
  );
}

export default App;
