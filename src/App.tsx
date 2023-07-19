/* eslint-disable @typescript-eslint/no-unsafe-return */
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { api } from './api/api';
import "./app.css";
interface Conta {
  id: number;
  nomeResponsavel: string;
}

interface Transacao {
  id: 1
  dataTransferencia: Date;
  valor: number;
  tipo: string;
  nomeOperadorTransacao: string
  conta: Conta
}

interface ResponseData {
  content: Transacao[]
}

const formSchema = yup.object({
  contaId: yup.string().required(),
  dataInicio: yup.date()
  .nullable()
  .transform((curr, orig) => orig === '' ? null : curr),
  dataFim: yup.date()
  .nullable()
  .transform((curr, orig) => orig === '' ? null : curr),
  nomeOperador: yup.string().nullable().transform((_, value) => {
    return value === "" ? null : value;
  })
})

type FormSchema = yup.InferType<typeof formSchema>;

function App() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit,  formState: { isValid } } = useForm({
    resolver: yupResolver(formSchema), 
    
  });
  const [data, setData] = useState<Transacao[]>([])


  function handleCloseMessage() {
    setErrorMessage(undefined)
  }

  async function search({ contaId, dataFim, dataInicio, nomeOperador }: FormSchema) {
    try {
      setIsLoading(true)
      const dataInicioFormatada = dataInicio? dayjs(dataInicio).format("YYYY-MM-DD") : dataInicio
      const dataFimFormatada =  dataFim  ?  dayjs(dataFim).format("YYYY-MM-DD") : dataFim
      const { data } = await api.get<ResponseData>(`/transferencias/${contaId}`, {
        params: {
          dataFim :dataFimFormatada,
          dataInicio: dataInicioFormatada,
          nomeOperador
         }
       })
      setData(data.content)
      setErrorMessage(undefined)
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError && error.response) {
        if ((error.response?.status >= 400 && error.response?.status <= 499)) {
          const { userMessage  }  = error.response.data as { userMessage: string }
          return setErrorMessage(userMessage)
        }
      } 
      setErrorMessage("Erro ao realizar consulta, contete o administrador")
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <main className="app-screen" >
      <div className="app-screen__container" >
        {!!errorMessage && (
          <div className='error-container'>
            {errorMessage}
            <button onClick={handleCloseMessage}>&#10005;</button>
          </div>
        )}
        <form className="form-container" onSubmit={handleSubmit(search)}>
          <div className="form-container__inputs">
            <div className="form-container__input_group">
              <label htmlFor="">Id da Conta <span className='label-span'>*</span></label>
              <input className="form-input" {...register('contaId')} />
            </div>
            <div className="form-container__input_group">
              <label htmlFor="">Data de início</label>
              <input className="form-input" type="date" {...register("dataInicio")} />
            </div>
            <div  className="form-container__input_group">
              <label htmlFor="">Data de Fim</label>
              <input className="form-input" type="date" {...register("dataFim")}/>
            </div>
            <div  className="form-container__input_group">
              <label htmlFor="">Nome Operador transacionado</label>
              <input className="form-input" {...register("nomeOperador")}/>
            </div>
          </div>
          <button className="form-button" type="submit" disabled={!isValid || isLoading}>{ isLoading? "Carregando": "Pesquisar"}</button>
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
            <tbody>
              {data.length > 0 ? (
                data.map(item => (
                  <tr key={ item.id}>
                    <td>{Intl.DateTimeFormat('pt-BR' ).format(new Date(item.dataTransferencia))}</td>
                    <td>R$ {Intl.NumberFormat('pt-BR', {
                    
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    
                  }).format(item.valor)}</td>
                    <td>{ item.tipo}</td>
                    <td>{ item.nomeOperadorTransacao}</td>
                  </tr>
                  )
                )
              ) : (<tr >
                <td className='text-center' colSpan={4}>Nenhum resultado encontrado.</td>
              </tr>)}
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
