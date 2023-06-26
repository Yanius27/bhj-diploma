const createRequest = (options = {}) => {
    let err;
    const xhr = new XMLHttpRequest();
    if(options.method === 'GET') {
      try {
        xhr.open(options.method, `${options.url}?mail=${options.data.mail}&password=${options.data.password}`);
        xhr.send();
      }
      catch(error) {
        err = error;
      }
    }
    else {
      const formData = new FormData();
      formData.append('mail', options.data.mail);
      formData.append('password', options.data.password);
      try {
        xhr.open(options.method, options.url);
        xhr.send(formData);
      }
      catch(error) {
        err = error;
      }
    }

  xhr.responseType = 'json';

  xhr.addEventListener('load', ()=> {
    callback(err, xhr.response);
  });
};
