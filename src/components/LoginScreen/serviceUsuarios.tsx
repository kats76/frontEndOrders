import axios from 'axios';

export const serviceUsuarios = {
  Login: (username: string, password: string) => {
    return axios.post('http://wmonit.eastus.cloudapp.azure.com:5000/api/User/Login', {
      username: username,
      password: password
    })
    .then((response) => {
      localStorage.setItem('jwt', response.data.token);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
  }
};
