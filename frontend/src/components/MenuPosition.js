import ApiButton from './ApiButton'

const MenuPosition = ({switchToMap, id, name, func}) =>{
    return(
        <div className='my-5 mx-5 bg-slate-600 text-gray-50 rounded flex flex-row px-5 py-5'>
            <h3 cursor='pointer' onClick={() => {switchToMap(id, name)}}>{id}.{name}</h3>
            <ApiButton id={id} func={func} char={'-'} />
        </div>
    )
}

export default MenuPosition