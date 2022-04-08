const $login = document.querySelector('#login')
const $password = document.querySelector('#password')
const $subBtn = document.querySelector(".subBtn")
window.addEventListener('load', () =>{
  if(!localStorage.getItem('auth')){
    localStorage.setItem('auth', false)
  }else{
    if(localStorage.getItem('auth') === 'true'){
      window.open('themes.html', '_self')
    }
  }
})
$subBtn.addEventListener('click' , e =>{
  e.preventDefault()
  if($login.value.length === 0 || $password.value.length === 0){
    if($login.value.length === 0){
        alert('заполни поля')
    }

    if($password.value.length === 0){
        alert('заполни поля')
    }
}else {
    if($login.value === 'admin' && $password.value === 'admin'){
        localStorage.setItem('auth' , true)
        setTimeout(() => {
            window.open('./index.html' , '_self')
        } , 2000)
    }else {
        alert('нет')
    }
}
})