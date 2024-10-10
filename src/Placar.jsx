// componente Placar que recebe as vitórias do Jogador O, Jogador X e empates como props
const Placar = ({vitoriasO, vitoriasX, empates}) => {    
  return (
    <div className="d-flex justify-content-center"> 
      <table className="table table-bordered table-hover w-75 text-center">
        <thead className="thead-dark">
          <tr>
            <th colSpan={3} className="bg-primary text-white text-center">Placar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="bg-light">Jogador X</td> 
            <td className="bg-light">Velhas</td> 
            <td className="bg-light">Jogador O</td> 
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