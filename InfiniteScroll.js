/**
 created by rajatdua on 02/12/20
 */
(function(){
  const ENDPOINT = 'https://reqres.in/api/users';
  let list = [], page = 1, loading = true, isMore = false;
  const generateLayout = (list) => {
    const element = document.getElementById('scrollable-items');
    const style = " width:100%;height:50px;background-color:#e3e3e3;margin-bottom:20px;display:flex;justify-content:center;align-items:center;";
    let layout = [];
    for(let i = 0; i < list.length; i++) {
      layout.push(`<div style=${style}>${list[i].first_name}</div>`);
    }
    element.innerHTML = layout.join('');
  };
  const call = (pageSize) => {
    loading = true;
    return http.execFetch(`${ENDPOINT}?page=${pageSize}`, { method: 'GET' });
  };
  const set = (response, concat = false) => {
    loading = false;
    isMore = response.response.total_pages >= page;
    if(concat){
      list = list.concat(response.response.data);
    }else{
      list = response.response.data;
    }
    generateLayout(list);
  };
  // Initial
  call(page).then(set);
  ++page;

  window.onscroll = async function(){
    const isBottom = Math.ceil(window.pageYOffset + window.innerHeight) >= document.documentElement.offsetHeight;
    if(isBottom){
      if(!loading && isMore){
        const response = await call(page);
        ++page;
        set(response, true);
      }
    }
  }
})();
