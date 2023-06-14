let axios = require('axios')

module.exports = axios.create({
    //baseURL: 'https://bukappweb.com:3000/api',
     baseURL: 'https://api.bukappweb.com:3000/api',    
    timeout: 10000,
    'maxContentLength': Infinity,
    'maxBodyLength': Infinity
})
