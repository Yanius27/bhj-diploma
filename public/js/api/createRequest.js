const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest(); 
      try {
        if(options.data) {
          if(options.method === 'GET') {
            options.url += '?';
            for(let key in options.data) {
              if(options.data[key]) {
                options.url += `${key}=${options.data[key]}&`
              }
            }
            xhr.open(options.method, options.url);
            xhr.send();
          }
          else {
            let formData = new FormData();
            for(let key in options.data) {
              formData.append(key, options.data[key]);
            }
            xhr.open(options.method, options.url);
            xhr.send(formData);
          }
        }
        
        else {
          xhr.open(options.method, options.url);
          xhr.send();
        }
        xhr.responseType = 'json';
      }
      catch {
      
      }

    xhr.addEventListener('load', ()=> {
      options.callback(xhr.response);
    });
};
