import { useState, useMemo } from 'react'

import { useAppContext } from '../context/appContext'

import { FormRowSelect } from '.'
import Wrapper from '../assets/wrappers/SearchContainer'


// Filtros da página de graduações do usuário
const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('')

  const { isLoading, searchUserStatus, sortUser, sortOptions, handleChange, clearUSERFilters, statusOptions, userGrads } = useAppContext()

  const handleSearch = (e) => {

    handleChange({ name: e.target.name, value: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setLocalSearch('')

    clearUSERFilters()
  }

  const debounce = () => {
    let timeoutID
    
    return (e) => {
      setLocalSearch(e.target.value)

      clearTimeout(timeoutID)      

      timeoutID = setTimeout(() => { handleChange({ name: e.target.name, value: e.target.value }) }, 1000)
    }
  }

  const optimizedDebounce = useMemo(() => debounce(), [])

  const listaNomesInstituicoes = userGrads.filter((arr, index, self) => index === self.findIndex((t) => (t.instituicao === arr.instituicao)))
  
  return (
    <Wrapper>      
      <form className='form'>

        <h4>filtros</h4>

        <div className='form-center'>
          <FormRowSelect name='searchUser' labelText="Selecione uma instituição" value={localSearch} handleChange={optimizedDebounce} list={listaNomesInstituicoes.map((grad) => {return grad.instituicao})}/>

          <FormRowSelect labelText='situação' name='searchStatus' value={searchUserStatus} handleChange={handleSearch} list={['Todos', ...statusOptions]} />
          
          <FormRowSelect name='sort' labelText="Filtro" value={sortUser} handleChange={handleSearch} list={sortOptions} />
          
          <button className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}> limpar filtros </button>
        </div>
      </form>

    </Wrapper>
  )
}


export default SearchContainer