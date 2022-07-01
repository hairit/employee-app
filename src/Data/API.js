import axios from 'axios';
const call = (method, path, body) => {
  if (
    (method === 'PUT' || method === 'POST' || method === 'PATCH') &&
    body === null
  ) {
    console.log('This method need body data');
    return;
  }
  return axios({
    method: method,
    url: process.env.REACT_APP_URL + '/' + path,
    data: body,
  });
};
export default call;
