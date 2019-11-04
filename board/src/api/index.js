import axios from 'axios'

const makeQS = (data = {}) => {
  let ret = Object.entries(data)
  .filter( ([key, value]) => {
    if (value === null) return false
    if (value === '') return false
    if (value === undefined) return false
    return true;
  }).map(e => e.join('=')).join('&')  // 

  return ret ? '?' + ret : '';
  
}

const api = baseURL => data => axios({
  method: data.method,
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'x-client-id': 1,
  },
  url: baseURL + data.url,
  data: data.data,
  }).then(res => {
    // console.log(res.data);
    return res.data
  }).catch(err => {
    const error = err.response;
    console.log(error)
    throw error
  })

const boardAPI = api('http://board.api.leysys.com/v2/custom')
const authAPI = api('http://auth.api.leysys.com/v2')

  // const api = data => axios({
  // method: 'get',
  // headers: {
  //   'x-client-id': 1,
  // },
  // url: 'http://board.api.leysys.com/v2/custom/post?page=1&page_length=10',
  // })
  // .then(res => {
  //   return res.data.results
  // })
  // .catch(err => {
  //   console.log(err)
  // })


// function Vault(password) {
//   var secretData = '내 통장 비밀번호는... 1234다....'
  
//   function getSecretData(pass) {
//     if (pass !== password) return false;
//     return secretData;
//   }

//   function setSecretData(pass, data) {
//     if (pass !== password) return false;
//     secretData = data;
//   }


//   return {
//     get: getSecretData,
//     set: setSecretData,
//   }
// };

// var myVault = Vault('1q2w3e');

// myVault.get('1q2w3e')
// myVault.set('1q2w3e', '새로운 비밀 정보들...') 

export { boardAPI, authAPI, makeQS }