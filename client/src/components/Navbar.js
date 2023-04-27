import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaAlignLeft } from 'react-icons/fa'

import Wrapper from '../assets/wrappers/Navbar'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'

import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Logout from '@mui/icons-material/Logout'
import Badge from '@mui/material/Badge'
import PendingActionsIcon from '@mui/icons-material/PendingActions'


const Navbar = () => {
  const { toggleSidebar, logoutUser, user, stats } = useAppContext()
  
  const [anchorEl, setAnchorEl] = useState(null)

  let semSolicitacoes = false

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  
  if ((stats.pending + stats.declined) === 0) { semSolicitacoes = true }
  
  const navigate = useNavigate()

  function redirecionar() {
      navigate('/pendencias')
  }

  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}><FaAlignLeft /></button>

        <div>
          <Logo />
        </div>
      </div>

      <div className='pendencias'>    
        {
          (!semSolicitacoes) &&
          <Box>
            <MenuItem onClick={() => redirecionar()}>            
              <Badge color="warning" badgeContent={stats.pending + stats.declined} anchorOrigin={{ vertical: 'top', horizontal: 'left'}}>
                <PendingActionsIcon sx={{ color: '#ff9800' }} /> 
              </Badge>
            </MenuItem>
          </Box>
        }                                   

        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Account settings">            
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} >
              <Avatar sx={{ width: 32, height: 32 }}>{user?.name.charAt(0)}</Avatar>
            </IconButton>            
          </Tooltip>
        </Box>

        <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >

          <MenuItem onClick={logoutUser}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Sair
          </MenuItem>
        </Menu>                  
      </div>

    </Wrapper>
  )
}


export default Navbar