import { useState } from 'react'

import { FormRow, Alert, JobsContainer, GradsContainer } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'


const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext()

  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [lastName, setLastName] = useState(user?.lastName)
  const [location, setLocation] = useState(user?.location)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !email || !lastName || !location) {
      displayAlert()

      return
    }
    updateUser({ name, email, lastName, location })
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>perfil</h3>

        {showAlert && <Alert />}

        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            labelText="nome"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />

          <FormRow
            type='text'
            labelText='sobrenome'
            name='lastName'            
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />

          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormRow
            type='text'
            name='location'
            labelText="localização"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />

          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Por favor, aguarde...' : 'salvar alterações'}
          </button>
        </div>
      </form>

      <GradsContainer />  

      <JobsContainer />     
      
    </Wrapper> 
  )
}


export default Profile