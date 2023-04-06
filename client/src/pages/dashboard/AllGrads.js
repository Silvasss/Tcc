import React, { useState } from "react"

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import { EgressosContainer, SearchAllEgressosContainer } from '../../components'


const AllGrads = () => {
  const [hidden, setHidden] = useState(true)

  return (     
    <>
      <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
              <Toolbar>
                  <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>Todos os egressos</Typography>
              
                  <Box sx={{ flexGrow: 1 }} />

                  <Stack spacing={2} direction="row">
                    <Button variant="contained" color="secondary" sx={{ color: '#fff' }} onClick={() => setHidden(s => !s)}>Filtros</Button>                            
                  </Stack>
              </Toolbar>
          </AppBar>
      </Box> 

      {!hidden ? <SearchAllEgressosContainer /> : null}         

      <EgressosContainer />    
    </>
  )
}


export default AllGrads