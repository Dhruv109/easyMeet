const container = document.querySelector('.container');


window.onload = ()=>{
  let items = JSON.parse(localStorage.getItem('data'));
  console.log(items);
  if(items){
    items.forEach(item=>{
      let name = item.name;
      let link = item.link;
      let node = document.createElement('div');
      let meetLink = `https://meet.google.com/${link}`;
      node.innerHTML = `<a href=${meetLink}><div class="tiles"><h3>${name}</h3>
                        <p>${link}</p></div></a>`;
      node.classList.add('block');
      container.appendChild(node); 
    })
  }
  else{
    let node = document.createElement('div');
    node.innerHTML = '<h2 class="nolink">No links made.<br> Please make your timetable first.</h2>'
    document.querySelector('.main').appendChild(node); 
  }
}