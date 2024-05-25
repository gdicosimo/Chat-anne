const environment = {
  
  "development" : {  
    production: false,
    hostBackend: 'http://localhost:5000'
  },

    
  "production" : {  
    production: true,
    hostBackend: '/api'
  },

};

export default environment[process.env.NODE_ENV];
