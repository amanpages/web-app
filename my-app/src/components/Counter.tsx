import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(() => {
    const storedCount = localStorage.getItem('count');
    return storedCount !== null ? parseInt(storedCount, 10) : 0;
  });

  const navigate = useNavigate();

  // Save count to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('count', count.toString());
  }, [count]);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 0 ? count - 1 : 0);
  const reset = () => setCount(0);

  const backgroundProps = useSpring({
    backgroundColor: `rgba(0, 150, 255, ${Math.min(count / 100, 1)})`,
    config: { tension: 170, friction: 26 },
  });

  useEffect(() => {
    document.body.style.transition = 'background-color 0.5s ease';
    document.body.style.backgroundColor = `rgba(0, 150, 255, ${Math.min(count / 100, 1)})`;
  }, [count]);

  return (
    <Container maxWidth="sm">
      <animated.div style={backgroundProps}>
        <Box
          sx={{
            p: 3,
            mt: 3,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Counter: {count}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button variant="contained" color="primary" onClick={increment}>
              Increment
            </Button>
            <Button variant="contained" color="secondary" onClick={decrement}>
              Decrement
            </Button>
            <Button variant="outlined" color="error" onClick={reset}>
              Reset
            </Button>
          </Box>
        </Box>
      </animated.div>
    </Container>
  );
};

export default Counter;
