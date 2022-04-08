const $theme = document.querySelectorAll('.theme')
const $container = document.querySelector('.container-fluid')
const themes = ['math' , 'idk' , 'english']
const $addTheme = document.querySelector('.addTheme')
const $addQuest = document.querySelector('.addQuest')
window.addEventListener('load' , () =>{
  const allThemes = JSON.parse(localStorage.getItem('themes'))
  if(allThemes){
    theTemplate(allThemes)
  }else{
    localStorage.setItem('themes' , JSON.stringify(themes)) 
  }
})

window.addEventListener('load', () => {
  const auth = localStorage.getItem('auth')
  if(!auth || auth === 'false'){
    window.open('./index.html', '_self')
  }
})

function theTemplate(database){
  const themes1 = database.map(item =>{
    return `
    <div class=" theme d-flex p-5 m-3 justify-content-center align-items-center" id="${item}" onclick="chooseT('${item}')">
    ${item}
    </div>
    `
  }).join('')
  // $container.insertAdjacentHTML("beforeend" , '<button class="btn btn-outline-danger exit">Delete</button>')
  $container.innerHTML = themes1
}
// const todo = JSON.parse(localStorage.getItem('todo'))
//     const filtered = todo.filter(item => item.id != idOfBase)
//     localStorage.setItem('todo' , JSON.stringify(filtered))
//     window.location.reload()
function chooseT(item){
  localStorage.setItem('theme', JSON.stringify(item) )
  window.open('./about.html', '_self')
}
$addQuest.addEventListener('click' , e =>{
  e.preventDefault()
  window.open('./admin.html' , '_self')
})
$addTheme.addEventListener('click' , e => {
  e.preventDefault()

  const newTheme = prompt('название темы')
  if(newTheme === '' || newTheme === ' ' || newTheme === null ){
    alert('заполни поля') 
  }else{
    const allThemes = JSON.parse(localStorage.getItem('themes'))
    const themes = [...allThemes, newTheme]
    // allThemes.push(newTheme)
    localStorage.setItem('themes' , JSON.stringify(themes))
    window.location.reload()
  }
  console.log(newTheme);
})
// $theme.forEach(item => {
//   console.dir(item);
//   item.onclick =()=>{
//    
// });


// const $math = document.querySelector('.math')
// const $biology = document.querySelector('.biology')
// const $english = document.querySelector('.english')
// $math.addEventListener('click', e =>{
//   e.preventDefault()
//   choose('math')
// })
// $biology.addEventListener('click', e =>{
//   e.preventDefault()
//   choose('idk')
// })
// $english.addEventListener('click', e =>{
//   e.preventDefault()
//   choose('english')
// })