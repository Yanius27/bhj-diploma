const createRequest = (options = {}) => {
    let err;
    const xhr = new XMLHttpRequest(); 
      try {
        if(options.method === 'GET') {
          const url = options.url;
          xhr.open(options.method, url);
          if('mail' in options.data && 'password' in options.data) {
            url + `?mail=${options.data.mail}` + `&password=${options.data.password}`
            xhr.send();
          }
        }
        else {
          const formData = new FormData();
          xhr.open(options.method, options.url);
          if('mail' in options.data && 'password' in options.data) {
            formData.append('mail', options.data.mail);
            formData.append('password', options.data.password);
            xhr.send(formData);
          }
        }
        xhr.responseType = 'json';
      }
    catch {
      
    }

    xhr.addEventListener('load', ()=> {
      callback(err, xhr.response);
    });
};
