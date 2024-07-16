import axios from 'axios';

const LoginF = async (type) => {
  if (type === 'google') {
    try {
        window.location.href = 'http://localhost:80/OAuth/google';
      
    } catch (error) {
      console.error('There was an error with the OAuth request:', error);
      alert('An error occurred while trying to login with Google.');
    }
  }
};

export { LoginF };
