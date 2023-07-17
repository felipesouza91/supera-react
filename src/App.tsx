import { useState } from "react";
import "./app.css";
function App() {

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [operatorName, setOperatorName] = useState();
  const [data, setData] = useState([
    { id: 1, data: new Date(), valencia: 30895.46, type: "depósito", nomeOperador: "" },
    { id: 2, data: new Date(), valencia: 12.24, type: "Transferência Entrada", nomeOperador: "Fulano" },
    { id: 3, data: new Date(), valencia: -500.50, type: "Transferência Saída", nomeOperador: "Sicrano" },
    { id: 4, data: new Date(), valencia: -1234.00, type: "Saque", nomeOperador: "" },
  ])

  return (
    <main className="app-screen" >
      <div className="app-screen__container" >
        <form className="form-container">
          <div className="form-container__inputs">
            <div className="form-container__input_group">
              <label htmlFor="">Data de início</label>
              <input className="form-input" type="date" placeholder=""/>
            </div>
            <div  className="form-container__input_group">
              <label htmlFor="">Data de Fim</label>
              <input className="form-input" type="date"/>
            </div>
            <div  className="form-container__input_group">
              <label htmlFor="">Nome do Operador transacionado</label>
              <input className="form-input"/>
            </div>
          </div>
          <button className="form-button" type="button">Pesquisar</button>
        </form>
        <div className="table-container">
          <span className="table-title">Saldo total: R$ 50,00 Saldo no período: R$ 50,00</span>
          <table className="min-w-full">
            <thead>
              <tr>
                <th >Dados</th>
                <th>Valencia</th>
                <th>Tipo</th>
                <th>Nome do operador transacionado</th>
              </tr>
            </thead>
            <tbody >
              {data.map(item => (
                <tr key={ item.id}>
                  <td>{Intl.DateTimeFormat('pt-BR' ).format(item.data)}</td>
                  <td>R$ {Intl.NumberFormat('pt-BR', {
                  
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  
                }).format(item.valencia)}</td>
                  <td>{ item.type}</td>
                  <td>{ item.nomeOperador}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-pagination-panel">
            <button>{"<<"}</button>
            <button>{"<"}</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>{">"}</button>
            <button>{">>"}</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
