// componente Quadrado que recebe o valor e a função onClick como props
const Quadrado = ({valor, onClick}) => {
  return (
    <div onClick={onClick}> 
      <span className="quadrado">{valor}</span>
    </div>
  );
};

export default Quadrado;
