import './Placar.css';

const Placar = ({vitoriasO, vitoriasX, empates}) => {    
    return (
      <div>
        <table className="table table-dark">
          <thead>
            <tr>
              <th colSpan={3} className="titulo">Placar</th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td>Jogador X</td>
              <td>Empates</td>
              <td>Jogador O</td>
            </tr>
            <tr>
              <td>{vitoriasX}</td>
              <td>{empates}</td>
              <td>{vitoriasO}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
};
export default Placar;