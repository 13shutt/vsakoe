const meal = document.getElementById('meal'),
      calories  = document.getElementById('calories'),
      itemsList = document.getElementById('item-list'),
      addBtn = document.querySelector('.btn-add'),
      updBtn = document.querySelector('.btn-upd'),
      delBtn = document.querySelector('.btn-del'),
      backBtn = document.querySelector('.btn-back');
      
var id = 0;

document.querySelector('.btn-add').addEventListener('click', (e) => {
  if(meal.value != '' && calories.value != '') {
    itemsList.innerHTML += `
    <li class="collection-item" id=${id++}>
      <strong>${meal.value}</strong>: <em class="calories">${calories.value}</em> <em>calories</em>
      <a href="#" class="secondary-content">
      <i class="fa fa-pencil"></i>
      </a>
    </li>
    `
    meal.value = ''
    calories.value = ''
    totalCalories()
  } else {
    alert('Fill the form')
  }
  e.preventDefault()
})

var currentId = 0;
document.querySelector('#item-list').addEventListener('click', (e) => {
  if(e.target.classList.contains('fa-pencil')) {
    addBtn.classList.add('nope');
    updBtn.classList.remove('nope');
    delBtn.classList.remove('nope');
    backBtn.classList.remove('nope');     

    meal.value = e.target.parentElement.parentElement.childNodes[1].textContent
    calories.value = e.target.parentElement.parentElement.childNodes[3].textContent
    currentId = e.target.parentElement.parentElement.id;
    totalCalories()
  }
})

document.querySelector('.btn-back').addEventListener('click', (e) => {
  addBtn.classList.remove('nope');
  updBtn.classList.add('nope');
  delBtn.classList.add('nope');
  backBtn.classList.add('nope');

  meal.value = ''
  calories.value = ''

  e.preventDefault()
})

document.querySelector('.btn-del').addEventListener('click', (e) => {
  addBtn.classList.remove('nope');
  updBtn.classList.add('nope');
  delBtn.classList.add('nope');
  backBtn.classList.add('nope');

  document.getElementById(currentId).remove();

  meal.value = ''
  calories.value = ''
  totalCalories()

  e.preventDefault()
})

document.querySelector('.btn-upd').addEventListener('click', (e) => {
  addBtn.classList.remove('nope');
  updBtn.classList.add('nope');
  delBtn.classList.add('nope');
  backBtn.classList.add('nope');
  
  document.getElementById(currentId).childNodes[1].textContent = meal.value;
  document.getElementById(currentId).childNodes[3].textContent = calories.value;
  meal.value = ''
  calories.value = ''
  totalCalories()

  e.preventDefault()
})

const totalCalories = () => {
  const list = document.querySelectorAll('.calories');
  var result = 0;

  list.forEach(element => {
    result = result + parseInt(element.innerHTML, 10)
  })

  document.querySelector('.total-calories').innerHTML = result;
}