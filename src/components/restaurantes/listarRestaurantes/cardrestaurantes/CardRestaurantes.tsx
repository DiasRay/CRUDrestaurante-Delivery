import { Link } from 'react-router-dom'
import Restaurante from '../../../../models/Restaurante'

interface CardRestaurantesProps{
    restaurante: Restaurante
}

function CardRestaurantes({restaurante}: CardRestaurantesProps) {
    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-indigo-800 text-white font-bold text-2xl'>
                Restaurante
            </header>
            <p className='p-8 text-3xl bg-slate-200 h-full'>{restaurante.razaoSocial}</p>
            <p className='p-8 text-3xl bg-slate-200 h-full'>{restaurante.endereco}</p>
            <p className='p-8 text-3xl bg-slate-200 h-full'>{restaurante.status}</p>
            <p className='p-8 text-3xl bg-slate-200 h-full'>{restaurante.horarioAbertura} - {restaurante.horarioFechamento}</p>

            <div className="flex">
                <Link to={`/editarrestaurante/${restaurante.id}`} 
                    className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
                        flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletarrestaurante/${restaurante.id}`} className='text-slate-100 bg-red-400 hover:bg-red-700 w-full 
                    flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>

        </div>
    )
}

export default CardRestaurantes