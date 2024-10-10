import { useEffect, useState } from 'react'
import Jogo from './Jogo.jsx'
import Placar from './Placar.jsx'
import Dificuldade from './Dificuldade.jsx'
import Button from 'react-bootstrap/Button'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  // estado para os quadrados do jogo, iniciado como um array vazio
  const [quadrados, setQuadrados] = useState(Array(9).fill(null));
  // estado para determinar qual jogador é o da vez
  const [turno, setTurno] = useState('X');
  // estado para controlar a exibição do modal
  const [showModal, setShowModal] = useState(false);

  // estados para contar vitórias e empates
  const [vitoriasX, setVitoriasX] = useState(0);
  const [vitoriasO, setVitoriasO] = useState(0);
  const [empates, setEmpates] = useState(0);

  // estado para contar jogadas do jogador
  const [jogadasJogador, setJogadasJogador] = useState(0);
  // estado para controlar se o modal foi fechado
  const [modalFechado, setModalFechado] = useState(false);
  // estado para verificar se houve empate
  const [empatou, setEmpatou] = useState(false);

  // estado para definir a dificuldade do jogo
  const [dificuldade, setDificuldade] = useState("Fácil");

  let ganhou = false // variável para verificar se alguém ganhou

  const combosVitoria = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
  ]

  // função para obter valores do localStorage
  const getNumeroStorage = (key) => {
    const value = localStorage.getItem(key);
    return value ? parseInt(value, 10) : 0; // retorna o valor ou 0 se não existir
  };

  useEffect(() => {
    // recupera o estado do jogo do localStorage ao carregar o componente
    const jogo = localStorage.getItem('jogo');
    if (jogo) {
      setQuadrados(JSON.parse(jogo)); // define os quadrados com o estado salvo
    }
    // recupera as vitórias e empates do localStorage
    setVitoriasX(getNumeroStorage('vitoriasX'));
    setVitoriasO(getNumeroStorage('vitoriasO'));
    setEmpates(getNumeroStorage('empates'));
    setDificuldade(localStorage.getItem('dificuldade'));
    setJogadasJogador(getNumeroStorage('jogadas'));
  }, []);

  // função para realizar uma jogada
  const handleJogar = (index) => {
    if (quadrados[index] !== null) return; // verifica se o quadrado já está ocupado
    const novoVetor = [...quadrados];
    novoVetor[index] = turno; // atualiza o quadrado com o turno atual
    setQuadrados(novoVetor);
    setJogadasJogador(jogadasJogador + 1); // incrementa o contador de jogadas
    verificarVitoria(novoVetor); // verifica se houve vitória
    botJogar(novoVetor); // chama a função para o bot jogar
    // salva o estado do jogo e estatísticas no localStorage
    localStorage.setItem('jogo', JSON.stringify(novoVetor));
    localStorage.setItem('vitoriasX', vitoriasX);
    localStorage.setItem('vitoriasO', vitoriasO);
    localStorage.setItem('empates', empates);
    localStorage.setItem('dificuldade', dificuldade);
    localStorage.setItem('jogadas', jogadasJogador + 1);
  };

  // função para verificar se houve vitória
  const verificarVitoria = (novoVetor) => {
    combosVitoria.forEach(combo => {
      const primeiro = novoVetor[combo[0]];
      const segundo = novoVetor[combo[1]];
      const terceiro = novoVetor[combo[2]];
      // verifica se há uma combinação vencedora
      if (primeiro !== null && primeiro == segundo && segundo == terceiro) {
        primeiro == "X" ? setVitoriasX(vitoriasX + 1) : setVitoriasO(vitoriasO + 1);
        primeiro == "X" ? setTurno("X") : setTurno("O");
        setShowModal(true); // mostra o modal de vitória
        ganhou = true; // define que houve uma vitória
      }
    });
    const empateVetor = novoVetor.filter(a => a !== null); // verifica se todas as jogadas foram feitas
    if (empateVetor.length == 9 && !ganhou) {
      setEmpates(empates + 1); 
      setEmpatou(true);
      setShowModal(true); 
    }
  }

  // função para impedir o bot de perder ou garantir a vitória
  const impedirOuGanhar = (verificador, quadradosPosJogada, indexJogada) => {
    combosVitoria.forEach(combo => {
      if (indexJogada) return; // sai da função se já houve uma jogada
      const primeiro = quadradosPosJogada[combo[0]];
      const segundo = quadradosPosJogada[combo[1]];
      const terceiro = quadradosPosJogada[combo[2]];

      // verifica condições para jogar
      if (
        (!primeiro || !segundo || !terceiro) &&
        (
          (primeiro == verificador && primeiro == segundo) ||
          (segundo == verificador && segundo == terceiro) ||
          (primeiro == verificador && primeiro == terceiro)
        )
      ) {
        if (primeiro == verificador && primeiro == segundo) indexJogada = combo[2];
        if (segundo == verificador && segundo == terceiro) indexJogada = combo[0];
        if (primeiro == verificador && primeiro == terceiro) indexJogada = combo[1];

        if (!quadradosPosJogada[indexJogada]) {
          quadradosPosJogada[indexJogada] = "O";
        }
      }
    });
    if (indexJogada != null) return true; // retorna verdadeiro se o bot jogou
    return false; // retorna falso se o bot não jogou
  }

  // função para a jogada do bot
  const botJogar = (quadradosPosJogada) => {
    if (ganhou) return; // não joga se alguém já ganhou
    let indexesVazios = []; // array para armazenar quadrados vazios
    let indexJogada = null; // índice da jogada do bot
    let jogou = false; // flag para verificar se o bot jogou
    quadradosPosJogada.forEach((quadrado, index) => {
      if (quadrado == null) indexesVazios.push(index); // adiciona quadrados vazios ao array
    });

    if (dificuldade == "Fácil") {
      // jogada aleatória para dificuldade fácil
      indexJogada = Math.floor(Math.random() * indexesVazios.length);
      let jogada = indexesVazios[indexJogada];
      quadradosPosJogada[jogada] = "O"; // bot joga
    }
    else {
      // estratégia para dificuldade difícil
      jogou = impedirOuGanhar("O", quadradosPosJogada, indexJogada);
      if (!jogou) jogou = impedirOuGanhar("X", quadradosPosJogada, indexJogada);
      if (!jogou) {
        // ee não jogou, faz uma jogada aleatória
        indexJogada = Math.floor(Math.random() * indexesVazios.length);
        let jogada = indexesVazios[indexJogada];
        quadradosPosJogada[jogada] = "O";
      }
    }
    setQuadrados(quadradosPosJogada); // atualiza os quadrados
    verificarVitoria(quadradosPosJogada); // verifica se houve vitória
  }

  // função para resetar o placar
  const resetarPlacar = () => {
    localStorage.removeItem("empates");
    localStorage.removeItem("vitoriasO");
    localStorage.removeItem("vitoriasX");
    setEmpates(0); 
    setVitoriasO(0);
    setVitoriasX(0);
  }

  // função para reiniciar o jogo
  const handleJogarNovamente = () => {
    localStorage.removeItem('jogo');
    localStorage.removeItem('jogadas');
    localStorage.removeItem('dificuldade');
    setQuadrados(Array(9).fill(null)); // reseta os quadrados
    setTurno('X'); 
    setJogadasJogador(0); 
    setShowModal(false); 
    setEmpatou(false); 
  };

  // função para fechar o modal
  const fecharModal = () => {
    setShowModal(false); 
  }

  return (
    <div className='App'>
      <h1>Bem-vindo(a) ao jogo da velha do Flávio</h1>
      <div className="dificuldade">
        <Dificuldade setDificuldade={setDificuldade} />
      </div>
      <Placar
        vitoriasX={vitoriasX}
        vitoriasO={vitoriasO}
        empates={empates}
        resetarPlacar={resetarPlacar} />
      <Jogo
        quadrados={quadrados}
        handleJogar={handleJogar}
        turno={turno} />
      <div className='buttons'>
        <Button variant="primary" onClick={handleJogarNovamente}>Novo Jogo</Button>
      </div>
      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <h2>{ganhou ? `${turno} venceu!` : 'Empate!'}</h2>
            <Button variant="secondary" onClick={fecharModal}>Fechar</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;