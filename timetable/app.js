const dayInput = document.querySelector('#day');
const slotInput = document.querySelector('#slot');
const subjectInput = document.querySelector('#className');
const linkInput = document.querySelector('#meetLink');
const enter = document.querySelector('#enter');
const grid = document.querySelectorAll('.slot');
const deleteBtn = document.querySelector('.deletebtn');
const deleteForm = document.querySelector('.deleteForm');
const submitDelete = document.querySelector('.submitDelete');
const subjectDelete = document.querySelector('.classDelete');
let open = false;


subjectInput.required = true;
linkInput.required = true;

submitDelete.addEventListener('click',()=>{
  let items = JSON.parse(localStorage.getItem('data'));
  if(items){
    let index = items.map(item=>item.name).indexOf(subjectDelete.value);
    console.log(index);
    items.splice(index,1);
  }
  if(items.length!=0){
  localStorage.setItem('data',JSON.stringify(items));
  addFromStorage();  
  }
  else{
    localStorage.removeItem('data');
  }
})

deleteBtn.addEventListener('click',()=>{
  if(!open){
    deleteForm.classList.add('open');
  }
  else deleteForm.classList.remove('open');
  open = !open;
})

enter.addEventListener('click',()=>{
  //event.preventDefault();
  if(subjectInput.value!=''&&linkInput.value!='')
    addToTimetable();
})

window.onload = ()=>{
  addFromStorage();
}



function addToTimetable(){
  let time = slotInput.value;
  let day = dayInput.value;
  let name = subjectInput.value;
  let link = linkInput.value;
  let entry = {
      name: name,
      time: time,
      day: day,
      link: link
    };  
  addToGrid(time,day,name);

  console.log(entry);
  let items = JSON.parse(localStorage.getItem('data')) || [];
  items.push(entry);

  localStorage.setItem('data',JSON.stringify(items));
}


function addToGrid(time,day,name){
  grid.forEach((elm)=>{
    if(day=='1' && elm.classList.contains(time)){
      if(elm.classList.contains('mon')||elm.classList.contains('wed')||elm.classList.contains('fri')){
        elm.innerText = name;
      }
    }
    if(day=='2' && elm.classList.contains(time)){
      if(elm.classList.contains('tue')||elm.classList.contains('thu')||elm.classList.contains('sat')){
        elm.innerText = name;
      }
    }
    
    if(elm.classList.contains(time)&&elm.classList.contains(day)){
      elm.innerText = name;
    }
    
  })
}


function addFromStorage(){
  let items = JSON.parse(localStorage.getItem('data'));
  if(items){
  items.forEach((item)=>{
    addToGrid(item.time,item.day,item.name);
  })
}
}