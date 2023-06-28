import React, { ChangeEvent, useState } from 'react';

// import local library
import dayjs from 'dayjs';

// import types and interfaces
import { InterfaceItemComponent } from './types/component';

// import material UI
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { red } from '@mui/material/colors';

// import MUI icons
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ItemComponent = ({ item, handleBuy }: InterfaceItemComponent) => {
  const [quantity, setQuantity] = useState(1);

  const updateCount = (mode: 'add' | 'minus') => () => {
    if (mode === 'minus') {
      if (quantity <= 0) return;
      setQuantity(quantity - 1);
      return;
    }
    setQuantity(quantity + 1);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = Number(e.target.value);
    if (isNaN(value)) return setQuantity(quantity);
    setQuantity(Number(value));
  };

  const handleBuyItem = async () => {
    if (quantity <= 0) return;
    handleBuy({ ...item, quantity });
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
          title={item.name}
          subheader={dayjs().format('DD MMM YYYY')}
        />
        <CardMedia
          component='img'
          height='194'
          image={item.image}
          alt={item.name}
        />
        <CardContent>
          <Typography>Quantity:</Typography>
          <Paper
            component='form'
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              mb: '0.5rem',
            }}
          >
            <IconButton
              sx={{ p: '10px' }}
              aria-label='menu'
              onClick={updateCount('minus')}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder='quantity'
              value={quantity}
              onChange={onInputChange}
              inputProps={{ 'aria-label': 'item quantity' }}
            />
            <IconButton
              type='button'
              sx={{ p: '10px' }}
              aria-label='search'
              onClick={updateCount('add')}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
          </Paper>
          <Button
            variant='contained'
            fullWidth
            onClick={handleBuyItem}
            disabled={quantity <= 0}
          >
            Buy
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemComponent;
