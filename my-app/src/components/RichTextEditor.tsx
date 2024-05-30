import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box, Button, Container, Typography } from '@mui/material';

const RichTextEditor: React.FC = () => {
  const [editorHtml, setEditorHtml] = useState('');

  useEffect(() => {
    const fetchSubmittedUserData = async () => {
      try {
        const savedData = localStorage.getItem('submittedUserData');
        if (savedData) {
          const { id, name, address, email, phone } = JSON.parse(savedData);
          const htmlContent = `<p><strong>ID:</strong> ${id}</p>
                               <p><strong>Name:</strong> ${name}</p>
                               <p><strong>Address:</strong> ${address}</p>
                               <p><strong>Email:</strong> ${email}</p>
                               <p><strong>Phone:</strong> ${phone}</p>`;
          setEditorHtml(htmlContent);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchSubmittedUserData(); // Call the function on component mount
  }, []);

  const handleChange = (html: string) => {
    setEditorHtml(html);
    localStorage.setItem('richTextData', html); // Store updated data in localStorage
  };

  const handleClear = () => {
    setEditorHtml('');
    localStorage.removeItem('richTextData');
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          p: 3,
          mt: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Rich Text Editor
        </Typography>
        <ReactQuill
          value={editorHtml}
          onChange={handleChange}
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image', 'video'],
              ['clean'],
            ],
          }}
          placeholder="Write something amazing..."
        />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleClear}>
            Clear Editor
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RichTextEditor;
