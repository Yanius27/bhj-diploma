const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest(); 
      try {
        if(options.method !== 'GET') {
          xhr.open(options.method, options.url);
          xhr.send(options.data);
        }
        else if(options.method === 'GET' && options.data && typeof(options.data) === 'object') {
          options.url += '?';
          for(let key of options.data) {
             console.log(options.data[key]);
            options.url += `${key}=${options.data[key]}&`
          }
          options.url[options.url.length - 1] = '';
          xhr.open(options.method, options.url);
          xhr.send();
        }
        else {
          xhr.open(options.method, options.url);
          xhr.send();
        }
        xhr.responseType = 'json'
      }
      catch {
      
      }

    xhr.addEventListener('load', ()=> {
      options.callback(xhr.response);
    });
};
