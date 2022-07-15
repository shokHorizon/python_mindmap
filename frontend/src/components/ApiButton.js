const ApiButton = ({ id, func, char }) => {
    return(
        <button 
            className="bg-white text-slate-600 rounded px-5 mx-5 border"
            onClick={() => func(id)}>{char}
        </button>
    )
}

export default ApiButton