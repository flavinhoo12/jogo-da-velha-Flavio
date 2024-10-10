import Form from 'react-bootstrap/Form';

// componente Dificuldade que recebe dificuldade, setDificuldade e jogadas como props
const Dificuldade = ({dificuldade, setDificuldade, jogadas}) => {

  // função para lidar com a mudança na seleção da dificuldade
  const handleChange = (event) => {
    setDificuldade(event.target.value); // atualiza o estado da dificuldade com o valor selecionado
  };

  return (
    <Form.Select 
      id="dificuldade"
      disabled={jogadas > 0} 
      value={dificuldade ? dificuldade : "Fácil"} 
      onChange={handleChange} 
    >
      <option value={"Fácil"}>Fácil</option> 
      <option value={"Difícil"}>Difícil</option>
    </Form.Select>
  );
};

export default Dificuldade; 
