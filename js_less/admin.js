const $Alloption = document.querySelectorAll(".option")
const $question = document.querySelector('.question')
const $subminBtn = document.querySelector('.subminBtn')
const $themes = document.querySelector('#themes')
const $right = document.querySelector('#pravAnswer')
const $exit = document.querySelector('.exit')

window.addEventListener('load', () => {
  const auth = localStorage.getItem('auth')
  if(!auth || auth === 'false'){
    window.open('./index.html', '_self')
  }
})

$exit.addEventListener('click' , e =>{
  e.preventDefault()
  window.open('./themes.html' , '_self')
})
window.addEventListener('load' , () =>{
  const themes2 = JSON.parse(localStorage.getItem('themes'))
  const allThemes = themes2.map(item => {
    return `
      <option value="${item}">${item}</option>
    `
  })
  $themes.innerHTML = allThemes
})  
let chooseTheme = 'math'
let rightAnswers = 'a'
$themes.addEventListener('change' , e =>{
  const val = e.target.value
  chooseTheme = val
  console.log(chooseTheme);
})
$right.addEventListener('change' , e =>{
  const val = e.target.value 
  rightAnswers = val
  console.log(rightAnswers);
})
$subminBtn.addEventListener('click' , e =>{
  e.preventDefault()
  const database = JSON.parse(localStorage.getItem('quizData'))
  const ques = newObj()
  if(ques){
    database[chooseTheme].push(ques)
    localStorage.setItem('quizData' , JSON.stringify(database))
    console.log(database);
  }else{
    alert('заполни поля')
  }
})
function newObj(){
  let obj = {
    question:$question.value,
    correct:$right.value
  }
  let areAllInputsFull = true
  $Alloption.forEach(({id, value}) =>{
    if(value){
      obj[id] = value
    }else{
      areAllInputsFull = false
    }
  })
  if(areAllInputsFull && $question.value){
    obj.question = $question.value
    obj.correct = $right.value
    return obj
  }else{
    console.log('error');
  }
}