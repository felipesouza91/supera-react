import "./app.css"
function App() {
  return (
    <main className="flex h-screen" >
      <div className="flex flex-col mx-auto w-2/4 gap-5 justify-center" >
        <form className="flex flex-col w-full justify-center gap-5">
          <div className="flex justify-between ">
            <div className="flex flex-col">
              <label htmlFor="">Data de início</label>
              <input className="border-2 border-gray-800 rounded-md h-11 p-3"/>
            </div>
            <div  className="flex flex-col">
              <label htmlFor="">Data de Fim</label>
              <input className="border-2 border-gray-800 rounded-md h-11 p-3"/>
            </div>
            <div  className="flex flex-col">
              <label htmlFor="">Nome do Operador transacionado</label>
              <input className="border-2 border-gray-800 rounded-md h-11 p-3"/>
            </div>
          </div>
          <button className="self-end border p-3 rounded-lg bg-slate-600 text-white hover:bg-slate-500" type="button">Pesquisar</button>
        </form>
        <div className="flex flex-col justify-center items-center border dark:border-neutral-500 ">
          <span className="py-3">Saldo total: R$ 50,00 Saldo no período: R$ 50,00</span>
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
              <tr >
                <td>14/02/2019</td>
                <td>R$ 30895,46</td>
                <td>depósito</td>
                <td></td>
              </tr>
              <tr>
                <td>12/04/2019</td>
                <td>R$ 12,24</td>
                <td>Transferência Entrada</td>
                <td>Fulano</td>
              </tr>
              <tr>
                <td>11/06/2020</td>
                <td>R$ -500,50</td>
                <td>Transferência Saída</td>
                <td>Sicrano</td>
              </tr>
              <tr>
                <td>11/06/2020</td>
                <td>R$ -1234,00</td>
                <td>Saque</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className="py-3 flex gap-3">
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
