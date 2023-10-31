import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useUpdateRating, useUser } from '@/framework/user';



export default function BasicRating() {
  const [value, setValue] = useState<number | null>(0);
  const { mutate: UpdateRating, isLoading } = useUpdateRating();
  const { me } = useUser();

  return (
    <Box
      sx={{
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // Center vertically if needed
        textAlign: 'center', // Center-align the text
        flexDirection: 'column'
      }}
    >
      <Typography component="legend">Muchas gracias por tu pedido!</Typography>
      <Typography component="legend">¿Con que probabilidad le recomendarias Buenos Aires Raw Food a un amigo o conocido?</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, rate) => {
          setValue(rate);
          
          UpdateRating({ clientid: me?.id.toString() || "", rating: rate?.toString() || ""})
          
        }}
      />
     
     
    </Box>
  );
}
