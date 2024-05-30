import React from 'react';
import Counter from './components/Counter'; // Import the Counter component
import UserForm from './components/UserForm'; // Import the UserForm component
import RichTextEditor from './components/RichTextEditor'; // Import the RichTextEditor component
import { Container, Grid } from '@mui/material'; // Import Grid for layout
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing

const App = () => {
  return (
    <BrowserRouter> {/* Wrap the App in BrowserRouter for routing */}
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Counter />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserForm />
          </Grid>
          <Grid item xs={12}>
            <RichTextEditor />
          </Grid>
        </Grid>
      </Container>
    </BrowserRouter>
  );
};

export default App;
