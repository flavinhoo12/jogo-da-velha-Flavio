import './Jogo.css'
import Quadrado from './Quadrado.jsx'

const Jogo = ({quadrados, clique}) => {

  // container com todos os quadrados com função de clique para determinar valor no vetor quadrados.
  return (
    <div id='container'>
      <Quadrado valor={quadrados[0]} onClick={() => clique(0)}/>
      <Quadrado valor={quadrados[1]} onClick={() => clique(1)}/>
      <Quadrado valor={quadrados[2]} onClick={() => clique(2)}/>
      <Quadrado valor={quadrados[3]} onClick={() => clique(3)}/>
      <Quadrado valor={quadrados[4]} onClick={() => clique(4)}/>
      <Quadrado valor={quadrados[5]} onClick={() => clique(5)}/>
      <Quadrado valor={quadrados[6]} onClick={() => clique(6)}/>
      <Quadrado valor={quadrados[7]} onClick={() => clique(7)}/>
      <Quadrado valor={quadrados[8]} onClick={() => clique(8)}/>
    </div>  
  );
};
export default Jogo;