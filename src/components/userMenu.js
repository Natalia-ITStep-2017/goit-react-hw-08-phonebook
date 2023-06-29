import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from "react-redux";
import { userLogOutThunk } from "../redux/auth/uathOperations";
import { useNavigate } from "react-router-dom";
import { selectUser } from 'redux/selectors';
import { toast } from 'react-hot-toast';
import { logOut } from '../redux/auth/authSlice';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { name } = useSelector(selectUser);
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleGoToMyAccount = () => {
    setAnchorEl(null);
    navigate("/account");
  };
  const dispatch = useDispatch();
  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(userLogOutThunk()).unwrap().then(() => {
      toast.success('You are logged out.')
      navigate('/');
    }).catch(() => {
      dispatch(logOut())
      toast.error('You are logged out.')
    });

  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleGoToMyAccount}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
