import React, { useState, useEffect } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

interface UserData {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}

const UserForm: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    id: '',
    name: '',
    address: '',
    email: '',
    phone: '',
  });

  const [submittedUserData, setSubmittedUserData] = useState<UserData | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    address: false,
    email: false,
    phone: false,
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData: UserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }

    const storedSubmittedUserData = localStorage.getItem('submittedUserData');
    if (storedSubmittedUserData) {
      const parsedSubmittedUserData: UserData = JSON.parse(storedSubmittedUserData);
      setSubmittedUserData(parsedSubmittedUserData);
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsDirty(true);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {
      name: userData.name === '',
      address: userData.address === '',
      email: !validateEmail(userData.email),
      phone: !validatePhone(userData.phone),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const existingUserData: UserData = JSON.parse(storedUserData);
        const isDuplicateData = existingUserData.name === userData.name &&
                                existingUserData.address === userData.address &&
                                existingUserData.email === userData.email &&
                                existingUserData.phone === userData.phone;

        if (isDuplicateData) {
          // Data is identical, user already exists
          alert('User already exists!');
        } else {
          const userId = uuidv4();
          const userWithId = { ...userData, id: userId };
          localStorage.setItem('userData', JSON.stringify(userWithId));
          setSubmittedUserData(userWithId);
          localStorage.setItem('submittedUserData', JSON.stringify(userWithId));
          setIsDirty(false);
        }
      } else {
        const userId = uuidv4();
        const userWithId = { ...userData, id: userId };
        localStorage.setItem('userData', JSON.stringify(userWithId));
        setSubmittedUserData(userWithId);
        localStorage.setItem('submittedUserData', JSON.stringify(userWithId));
        setIsDirty(false);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
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
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" gutterBottom>
          User Data Form
        </Typography>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          value={userData.name}
          onChange={handleChange}
          error={errors.name}
          helperText={errors.name ? 'Name is required' : ''}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          name="address"
          label="Address"
          variant="outlined"
          value={userData.address}
          onChange={handleChange}
          error={errors.address}
          helperText={errors.address ? 'Address is required' : ''}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          value={userData.email}
          onChange={handleChange}
          error={errors.email}
          helperText={errors.email ? 'Invalid email format' : ''}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          name="phone"
          label="Phone"
          variant="outlined"
          value={userData.phone}
          onChange={handleChange}
          error={errors.phone}
          helperText={errors.phone ? 'Phone number should be 10 digits' : ''}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default UserForm;
