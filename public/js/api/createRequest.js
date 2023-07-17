const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest(); 
    const formData = new FormData();

    if(options.data && options.method === 'GET') {
      options.url += '?';
      for(let key in options.data) {
        if(options.data[key]) {
          options.url += `${key}=${options.data[key]}&`
        }
      }
      options.url = options.url.slice(0, -1);
    }
    else if(options.method !== 'GET') {
      for(let key in options.data) {
        formData.append(key, options.data[key]);
      }
    }
    xhr.responseType = 'json';
    try {
      xhr.open(options.method, options.url);
      if(formData) {
        xhr.send(formData);
      }
      else {
        xhr.send();
      }
    }
    catch(err) {
      options.callback(err, xhr.response);
    }

    xhr.addEventListener('load', ()=> {
      options.callback(xhr.response);
    });
};
