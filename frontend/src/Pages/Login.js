import * as React from 'react';
import Card from '@mui/material/Card';
import { CardHeader, List, ListItem } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';
import { LoginF } from '../Functions/LoginFuctions';
import '../App.css';

export default function Login() {
  const handleLogin = () => {
    LoginF('google');
  };

  return (
    <div className="middle">
      <Card sx={{ maxWidth: 545, minWidth: 300 }}>
        <CardHeader
          title="Login"
        />
        <CardContent>
          <List>
            <ListItem>
              <Button
                onClick={handleLogin}
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{
                  width: '90%',
                  color: 'black',
                  borderColor: 'black',
                  '&:hover': {
                    borderColor: 'black',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                Google
              </Button>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  );
}
