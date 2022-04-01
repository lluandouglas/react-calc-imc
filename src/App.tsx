// import { paste } from "@testing-library/user-event/dist/paste";
import { useState } from "react";
import styles from "./App.module.css"
import logo from "./assets/powered.png"
import leftArrowImage from "./assets/leftarrow.png"
import {levels, calculateimc, level} from "./helpers/imc"
import {GridItem} from "./componets/GridItem";


const App = () => {
  
  const [heightField, setHeightField] = useState <number> (0); //tipei o tipo de variavel a ser utilizado no heightField
  const [weightField, setWeightField] = useState <number> (0);
  const [toShow, setToShow] = useState<level | null>(null);  


  const handCalculateButton = () => {
    if (heightField && weightField) {
      setToShow(calculateimc(heightField,weightField));
    }else{
      alert("Digite todos os campos!")
    }
  }

  const handleBackButton = () =>{
    setToShow(null);
    setHeightField(0);
    setWeightField(0);

  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={logo} alt="" width={150} />
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é uma sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

          <input 
          type="number"
          placeholder="Digite sua altura. Ex.: 1.5 (em metros)"
          value={heightField > 0 ? heightField : ""} //se a altura for maior que zero, imprime a propria altura, caso contratio, deixa o espaço vazio
          onChange={ e => setHeightField(parseFloat(e.target.value))}

          disabled = {toShow ? true : false}
          
          />

          <input 
          type="number"
          placeholder="Digite seu peso. Ex.: 60.5 (em kg)"
          value={weightField > 0 ? weightField : ""} //se a altura for maior que zero, imprime a propria altura, caso contratio, deixa o espaço vazio
          onChange={ e => setWeightField(parseFloat(e.target.value))}

          disabled = {toShow ? true : false}
          />

          <button onClick={handCalculateButton}  disabled = {toShow ? true : false} >Calcular</button>
        </div>

        <div className={styles.rigthSide}>
          {!toShow &&
          <div className={styles.grid}>
            {levels.map((item, key) =>(
              <GridItem key = {key}  item={item} />
            ))
            }
            </div>
          }
          {toShow && 
            <div className={styles.rightBig}>
              <div className={styles.rightArrow}  onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
