import * as React from 'react';
import '../App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {ReturnNames,AddData} from '../Functions/FunctionsItem';
import NameItem from '../Components/NameItem';
import { Paper } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import '../App.css';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DeleteData,SecData,ViewData } from '../Functions/FunctionsItem';
import ActionDialog from '../Components/ActionDialog';
import Alert from '@mui/material/Alert';

export default function Dashboard() {
    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(currentUrl);
    //const token = urlParams.get('token');
    const token = currentUrl.split('=')[1]
    debugger
    const[text,setText] = useState('');
    const [names, setNames] = useState([]);
    const [nameIn, setNameIn] = useState('');
    const [mailIn, setmailIn] = useState('');
    const [passIn, setpassIn] = useState([]);
    const [nameID,setNameId] = useState(-1);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
      setOpen(false);
      setText('');
    };
    const [fun,setFun] = useState('');//delete or view
    const handleName = (event) => {
      setNameIn(event.target.value); 
    };
    const handleMail = (event) => {
      setmailIn(event.target.value); 
    };
    const handlePass = (event) => {
      setpassIn(event.target.value); 
    };
    const HandleAdd=async()=>{
      let result = await AddData(token,nameIn,mailIn,passIn);
      setNames(result);
    }
    const handleFunUpdate=async(idTemp,funTemp)=>{
      setFun(funTemp);
      setNameId(idTemp);
      let result = await SecData(token)
      setDialogOpen(true)
    }
    const TakeActions=async(codeValue)=>{//call delete or view
      try
      {
      if(fun==='delete'){
        let result = await DeleteData(codeValue,token,nameID)
        setNames(result);
      }
      else if(fun==='view')
      {
       let result =  await ViewData(codeValue,token,nameID)
       let TextTemp = `Name: ${result.name}   Email: ${result.email} Password: ${result.password}`;
       setText(TextTemp);
       setOpen(true);
       debugger;
      }
      }
      catch(error)
      {
          console.log("Error"+error.message);
      }

    }
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          let res = await ReturnNames(token);
        
          if (!Array.isArray(res)) {
            res = Object.values(res);
          }
          if (res.length < 1) {
            res = [];
          }
          setNames(res);
          console.log(res)
          debugger
        } catch (error) {
          setNames([])
          console.error('Error calling data', error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <div className="middle">
              {open && (
          <Alert severity="error" onClose={handleClose}>
            {text}
          </Alert>
        )}
            <div className='BigTekst'>DASH|BOARD</div>
            <Paper elevation={3} class='FOrmInput'>
            <Box
              component="form" className='Input'
            >
              <div className='InputGroup'>
              <TextField id="outlined-basic" label="Name" variant="outlined"  value={nameIn} onChange={handleName}/>
              <TextField id="outlined-basic" label="Email" variant="outlined"value={mailIn} onChange={handleMail} />
              <TextField id="outlined-basic" label="Password" variant="outlined" value={passIn} onChange={handlePass}/></div>
              <div>
              <Button variant="outlined" startIcon={<AddIcon />} onClick={HandleAdd}>
                Add
              </Button>
              </div>
            </Box>
            </Paper>
            <Paper elevation={3} className='Holder'>
                <List>
            {names.map(el => (
                <ListItem >
            <NameItem key={el.id} name={el.name} id={el.id}  token={token} functioN={handleFunUpdate}/>
            </ListItem>
            ))}
            </List>
            </Paper>
            <ActionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAction={TakeActions}
      />
    </div>
  );
}