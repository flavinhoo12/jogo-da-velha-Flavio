import './Dificuldade.css';
import Form from 'react-bootstrap/Form';

const Dificuldade = ({dificuldade, setDificuldade, jogadas}) => {

  const handleChange = (event) => {
    setDificuldade(event.target.value);
  };

  return(
    <Form.Select id="dificuldade" disabled={jogadas > 0} value={dificuldade ? dificuldade : "Fácil"} onChange={handleChange}>
      <option value={"Fácil"}>Fácil</option>
      <option value={"Difícil"}>Difícil</option>
    </Form.Select>
  )
};

export default Dificuldade;