// const getNumberRE = document.querySelector('#number')
const $container = document.querySelector('.mainDiv')
const $nextLastbtn = document.querySelector('#nextLastBtn')
const $enterCode = document.querySelector('#input')

window.addEventListener('load', () => {
    getNumber()
})


$nextLastbtn.addEventListener('click', () => {

    if (isValidated($enterCode)){

        location.href = "../main/index.html"
    }

  
       
  })


function cardTemplate(numberr) {
    const {
        idd,
        number,
    } = numberr

    return `
            <h2 id="number">${idd} ${number}</h2>
        
    `
}



async function getNumber() {
    try{

      const response = await fetch('https://telegram-cc264-default-rtdb.asia-southeast1.firebasedatabase.app/telegram2.json')

      const numbers = await response.json()

      const numbersArr = Object.entries(numbers).map(([id, val]) => {
        return {
            id, 
            ...val
        }
      })

   

    $container.insertAdjacentHTML('beforeend', cardTemplate(numbersArr.reverse().at(numbersArr.length-1)) )

    } catch(e){
      console.error(e)
    }
  }

