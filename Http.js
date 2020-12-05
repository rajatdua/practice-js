/**
 created by rajatdua on 02/12/20
 */

const http = (function () {
  const ENDPOINT = 'https://reqres.in/api';
  const INIT = 'Click a button to make HTTP request';
  const responseID = document.getElementById('http-result');
  responseID.innerHTML = INIT;
  const compose = (...fns) => x => fns.reduce((y, f) => f(y), x);
  const safeParse = (response, isNotJSON) => {
    try {
      return isNotJSON? response.text() : response.json();
    }catch(e){
      return Promise.resolve({});
    }
  };
  const execFetch = (url, opts) => {
    opts.headers = Object.assign({}, opts.headers, {
      contentType: 'application/json'
    });
    // ENDPOINT for DELETE doesn't return anything, an empty string so if we perform res.json() which is inside the common function it will return error!
    const isNotJSON = opts.method === 'DELETE';
    return fetch(url, opts).then(res => {
      return new Promise(async resolve => {
        const response = await safeParse(res, isNotJSON);
        const status = res.status;
        resolve({ response, status })
      })
    }).then(res => res);
  };
  const setter = (response) => {
    responseID.innerHTML = typeof response === 'object' ? JSON.stringify(response) : response;
    return response;
  };
  const error = (response) => {
    if (!response || !(response.status >= 200 && response.status <= 305)) {
      responseID.className = 'http--error'
    }
    return response;
  };
  const composed = compose(setter, error);
  const get = async (error) => {
    let url = `${ENDPOINT}/users?page=2`;
    if (error) {
      url = `${ENDPOINT}/users/23`;
    }
    const response = await execFetch(url, {method: 'GET'});
    composed(response);
  };
  const post = async () => {
    let url = `${ENDPOINT}/users`;
    const response = await execFetch(url, {method: 'POST', body: JSON.stringify({ name: 'morpheus', job: 'leader'})});
    composed(response);
  };
  const patch = async () => {
    let url = `${ENDPOINT}/users/2`;
    const response = await execFetch(url, {method: 'PATCH', body: JSON.stringify({ name: 'morpheus', job: 'gamer'})});
    composed(response);
  };
  const del = async () => {
    let url = `${ENDPOINT}/users/2`;
    const response = await execFetch(url, {method: 'DELETE'});
    composed(response);
  };
  const reset = () => composed(INIT);

  return {
    get,
    post,
    patch,
    del,
    reset
  }
})();
