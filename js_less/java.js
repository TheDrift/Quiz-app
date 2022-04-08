const quizData = {
  math: [
    {
      id: 1,
      question: '2 + 2',
      a: '22',
      b: '4',
      c: '2',
      d: '-',
      correct: 'b'
    },
    {
      id: 2,
      question: 'корень 64',
      a: '8',
      b: '16',
      c: '5',
      d: '20',
      correct: 'a'
    },
    {
      id: 3,
      question: 'sin30deg?',
      a: '1',
      b: '0',
      c: '1/2',
      d: '-1',
      correct: 'c'
    },
  ],
  idk: [
    {
      id: 1,
      question: 'How many kingdoms are there in the world?',
      a: '1',
      b: '2',
      c: '3',
      d: '5',
      correct: 'd'
    },
    {
      id: 2,
      question: 'Which blat cell curl up the blood at the wound?',
      a: 'trombocite',
      b: 'leikocite',
      c: 'Eritrocite',
      d: 'Fagocite',
      correct: 'a'
    },
    {
      id: 3,
      question: 'Who is a human',
      a: 'Ruslan',
      b: 'Aziz',
      c: 'Timur',
      d: 'Abdull',
      correct: 'd'
    },
  ],
  english: [
    {
      id: 1,
      question: 'This is … orange ball.',
      a: 'a',
      b: 'an',
      c: 'the',
      d: '-',
      correct: 'b'
    },
    {
      id: 2,
      question: 'I will be back … 7 o’clock in the evening.',
      a: 'in',
      b: 'on',
      c: 'at',
      d: 'buy',
      correct: 'c'
    },
    {
      id: 3,
      question: '… Pacific ocean is the most dangerous.',
      a: 'a',
      b: 'an',
      c: 'the',
      d: '-',
      correct: 'c'
    },
  ]
}

window.addEventListener('load', () => {
  const auth = localStorage.getItem('auth')
  if(!auth || auth === 'false'){
    window.open('./index.html', '_self')
  }
})

window.addEventListener('load', () =>{
  const chosenTheme = localStorage.getItem('theme')
  if(chosenTheme){
    const dbFromLocal = localStorage.getItem('quizData')
    if(dbFromLocal){
      return
    }else{
      localStorage.setItem('quizData' , JSON.stringify(quizData))
      window.location.reload()
    }
  }else{
    window.open('./themes.html' , '_self')
  }
})
const $exit = document.querySelector('.exit')
$exit.addEventListener('click' , e =>{
  e.preventDefault()
  window.open('./themes.html' , '_self')
})
const theme = JSON.parse(localStorage.getItem('theme'))
const database = JSON.parse(localStorage.getItem('quizData'))
const dbLocalQuizData = database[theme]
const $quizContainer = document.querySelector('.quizData')
const $question = document.querySelector('.question')
const $answersAll = document.querySelectorAll('.answer')
const $a_answer = document.querySelector(".a_answer")
const $b_answer = document.querySelector('.b_answer')
const $c_answer = document.querySelector(".c_answer")
const $d_answer = document.querySelector('.d_answer')
const $subminBtn = document.querySelector('.subminBtn')
// Действуещий вопрос
let currentQuiz = 0

// score 
let score = 0
function loadQuiz(){
  deselectRadio()
  const currentQuizData = dbLocalQuizData[currentQuiz]
  $question.innerHTML = currentQuizData.question
  $a_answer.innerHTML = currentQuizData.a
  $b_answer.innerHTML = currentQuizData.b
  $c_answer.innerHTML = currentQuizData.c
  $d_answer.innerHTML = currentQuizData.d
}
loadQuiz()
function selectedAnswers(){
  let answer = null
  $answersAll.forEach(item =>{
    if(item.checked){
      answer = item.id
    }
  })
  return answer
}
function deselectRadio(){
  $answersAll.forEach(item => item.checked = false)
}
let myAnswers = []
$subminBtn.addEventListener('click' , e =>{
  e.preventDefault()
  const answers = selectedAnswers()
  if(answers){
    if(answers === dbLocalQuizData[currentQuiz].correct){
      score++
    }
    myAnswers.push(answers)
    currentQuiz++
    if(currentQuiz < dbLocalQuizData.length){
      loadQuiz()
    }else{
      $quizContainer.innerHTML = `
        <h2 class="m-5"> вы ответили правильно на ${score}/${dbLocalQuizData.length} вопросовю </h2>
        <button onclick='showMeTrueAnswers()' class="btn btn-primary p-3"> Показать правильные ответы</button>
      `
    }
  }else{
    alert('выберите ответ')
  }
})
function showMeTrueAnswers(){
  const template = dbLocalQuizData.map((item, index) =>{
    return finishedTemplate(item, index)
  }).join()
  $quizContainer.innerHTML = template
  $quizContainer.insertAdjacentHTML('beforeend' , '<button onclick="resetQuiz()" class="btn btn-outline-warning text-black" p-3> начать заново </button>')
  $quizContainer.insertAdjacentHTML('beforeend' , '<button onclick="redTheme()" class="btn btn-outline-success text-black" p-3 mt-3> Выбирать тему </button>')
} 
function finishedTemplate(item , index){
  return  `
    <div>
      <div class="p-5 ">
        <ol type="a">
          <h3> ${item.question} </h3>
          <li> ${item.a} </li>
          <li> ${item.b} </li>
          <li> ${item.c} </li>
          <li> ${item.d} </li>
          <h4 class="text-center"> Правильный ответ:<span class="text-success"> ${item.correct}</span> </h4>
          <h4 class="text-center"> Ваш варинат:<span class="text-danger"> ${myAnswers[index]}</span> </h4>
        </ol>
      </div>
    </div>
  `
}
function resetQuiz(){
  window.location.reload()
}
function redTheme() {
  localStorage.removeItem('theme')
  window.open('./themes.html' , '_self')
}