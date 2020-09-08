const box = document.querySelector('.meet-box');
const days = ['sun','mon','tue','wed','thu','fri','sat'];
const container = document.querySelector('.boxes');
window.onload = ()=>{
  setFromStorage();
}

function setFromStorage(){
  let items = JSON.parse(localStorage.getItem('data'));
  let d = new Date();
  let day = d.getDay();
  let hour = d.getHours();
  hour = hour%12;

  let minutes = d.getMinutes();
  console.log(day,hour,minutes);

  let todayClasses = [];
  if(items) {
    todayClasses = items.filter(item=>item.day==days[day]);
  }
  let flag = false;


  todayClasses.forEach(subject=>{
    let classTime = (parseInt(subject.time[5])+7)%12;
    let meetLink = `https://meet.google.com/${subject.link}`;
    if(classTime==hour){
      let node = document.createElement('div');

      box.innerHTML = `<h3 class='boxText'>You have a class.</h3>`
      node.innerHTML=
     `<a href=${meetLink}>
      <h2 class='subName'>
      ${subject.name.toUpperCase()}</h2>
      <p>${subject.link}</p>
      </a>`;
      node.classList.add('block');
      box.appendChild(node);
      flag = true;
    }
   
  })
  if(!flag){
    box.innerHTML = `<h3 class='boxText'>You have no class right now.</h3>`
  }

}