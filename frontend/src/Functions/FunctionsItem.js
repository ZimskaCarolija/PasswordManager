import axios from "axios";

const ReturnNames = async (token) => {
  try {
    const res = await axios.post('http://localhost:80/Item/ReturnAllName', {
    }, {
      headers: {
        'jwt': `${token}` 
      }
    });
    debugger
    return res.data; 
  } catch (error) {
    console.error('Error calling ReturnAllName', error);
    throw error; 
  }
};
const AddData = async (token, name, email, pass) => {
  try {
    const res = await axios.post(
      'http://localhost:80/Item/Insert',
      {
        name: name,
        email: email,
        password: pass
      },
      {
        headers: {
          'jwt': token
        }
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error calling Add data', error);
    return []
  }
};
const DeleteData = async (code,token, id) => {
  try {
    const res = await axios.delete(
      'http://localhost:80/Item/Delete/'+id,
      {
        headers: {
          'jwt': token,
          'code':code
        }
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error calling Add data', error);
    return []
  }
};
const SecData = async (token) => {
  console.log("token is "+token)
  try {
    const res = await axios.post(
      'http://localhost:80/User/SecurityMail/',{},
      {
        headers: {
          'jwt': token
        }
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error calling Add data', error);
    return []
  }
};
const ViewData = async (code,token, id) => {
  try {
    const res = await axios.get(
      'http://localhost:80/Item/ReturnOne/'+id,
      {
        headers: {
          'jwt': token,
          'code':code
        }
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error calling Add data', error);
    return []
  }
};
export  {ReturnNames,AddData,DeleteData,ViewData,SecData};
