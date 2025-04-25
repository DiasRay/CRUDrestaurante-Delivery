import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Restaurante from '../../../models/Restaurante'
import { AuthContext } from '../../../contexts/AuthContext'
import { buscar, deletar } from '../../../services/Service'
import { RotatingLines } from 'react-loader-spinner'
import { ToastAlerta } from '../../../utils/ToastAlerta'

function DeletarRestaurante() {
    const navigate = useNavigate()

    const [restaurante, setRestaurante] = useState<Restaurante>({} as Restaurante)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/restaurantes/${id}`, setRestaurante, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta("Você precisa estar logado!", "aviso")
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarRestaurante() {
        setIsLoading(true)

        try {
            await deletar(`/restaurantes/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta("Restaurante apagado com sucesso !", "sucesso")

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }else {
                ToastAlerta("Erro ao deletar o restaurante!", "erro")
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/restaurantes")
    }
    
    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar restaurante</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o restaurante a seguir?</p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    Restaurante
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{restaurante.razaoSocial}</p>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{restaurante.endereco}</p>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{restaurante.status}</p>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{restaurante.horarioAbertura} - {restaurante.horarioFechamento}</p>

                <div className="flex">
                    <button 
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    <button 
                        className='w-full text-slate-100 bg-indigo-400 
                                   hover:bg-indigo-600 flex items-center justify-center'
                                   onClick={deletarRestaurante}>
                        {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>Sim</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarRestaurante