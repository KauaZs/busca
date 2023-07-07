import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

import api from './services/api';
import './styles.css';
function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function clickedSearch() {
    if(!input) return;
    try {
      const res = await api.get(`${input}/json`)
      setCep(res.data)
      setInput('')
    } catch {
      alert('CEP Invalido')
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className='title'>Busca CEP</h1>

    <div className='input'>
      <input 
      type='text' 
      placeholder='Digite o cep xxxx-xxx'
      value={input}
      onChange={(e) => setInput(e.target.value)}
      />

      <button className='buttonSrc'
      onClick={clickedSearch}> 
      <BsSearch 
      color="#FFF"
      size={25}
      /></button>
      
    </div>
    
    {Object.keys(cep).length > 0 && (
       <main className='main'>
       <h2>CEP Buscado: {cep.cep}</h2>
 
       <span>Rua: {cep.logradouro} </span>
       <span>Complemento: {cep.complemento}</span>
       <span>{cep.bairro}</span>
       <span>{cep.localidade} - {cep.uf}</span>
     </main>
    )}

    </div>
  );
}

export default App;
