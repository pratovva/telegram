const editIconBtn = document.querySelector('.editIcon')
const modalWindow = document.querySelector('.modal-window')
const cancelIconBtn = document.querySelector('.cancel-icon')
const addFoldersBtn = document.querySelector('.addFoldersBtn')
const secondModalWindow = document.querySelector('.secondModal-window')
const cancelIconBtn2 = document.querySelector('.cancel-icon2')
const burgerMenu = document.querySelector('.burger-menu')
const messageContainer = document.querySelector('.chat-message-container')
const input = document.querySelector('.chat-input-field input')
const sendButton = document.querySelector('.chat-input-send')
const $contacts = document.querySelector('.contacts') 
const $userNumber = document.querySelector('#userNumber')
const $userName = document.querySelector('#userName')
const $userInformation = document.querySelector('.contactsInformation')
const $left = document.querySelector('.left-side')
const $penIcon = document.querySelector('.pen-icon')
const $newMessagePage = document.querySelector('.newMessage')
const $backtackPage = document.querySelector('.backtack')
const $backtack = document.querySelector('.chat-input-clip')
const $moreInfoPage = document.querySelector('.moreInfo')
const $moreInfo = document.querySelector('.moreImg')
const $deleteBtn = document.querySelector('.deleteBTN')

window.addEventListener('load', () => {
    getNumber()
})

function addMessage(message) {
	const newMessage = document.createElement('div')
	newMessage.classList.add('chat-message')
	newMessage.textContent = message
	messageContainer.prepend(newMessage)
}


let messages = JSON.parse(localStorage.getItem('chat-messages')) || []

messages.forEach((message) => {
	addMessage(message)
})


sendButton.addEventListener('click', () => {
	const messageText = input.value
	messages.unshift(messageText)
	localStorage.setItem('chat-messages', JSON.stringify(messages))
	addMessage(messageText)
	input.value = ''
})



// -------------------------------------------


$deleteBtn.addEventListener('click', () => {
    const confirmDelete = confirm('Are you sure?')

    if (!confirmDelete) return

  localStorage.removeItem('chat-messages');

  // Refresh the page to update the localStorage
  location.reload();
});

// ---------------------------------------




editIconBtn.addEventListener('click', () => {
	modalWindow.style.display = "flex"
	openModal()
})

cancelIconBtn.addEventListener('click', () => {
	modalWindow.style.display = "none"
})


addFoldersBtn.addEventListener('click', () => {
	secondModalWindow.style.display = "flex"
})

cancelIconBtn2.addEventListener('click', () =>{
	secondModalWindow.style.display = "none"
})

// ------------penIcon

$penIcon.addEventListener('click', () => {
    $newMessagePage.style.display = 'block'
})

$backtack.addEventListener('click', () =>{
    $backtackPage.style.display ='block'
})

$moreInfo.addEventListener('click', () =>{
    $moreInfoPage.style.display ='block'
})




document.addEventListener('keydown', e => {
    // if($contacts.style.display === 'none') return

    if(e.key === 'Escape' && $contacts.style.display === 'block'){
        closeModal()
    }

    if(e.key === 'Escape' && $newMessagePage.style.display === 'block'){
        closeModal()
    }


    if(e.key === 'Escape' && $backtackPage.style.display === 'block'){
        closeModal()
    }

    if(e.key === 'Escape' && $moreInfoPage.style.display === 'block'){
        closeModal()
    }




    // if(e.key === 'Enter') {
    //     closeModal()
    // }
})


function openModal() {
    $contacts.style.display = 'block'
    
}

function closeModal() {
    $contacts.style.display = 'none'
    $newMessagePage.style.display = 'none'
    $backtackPage.style.display = 'none'
    $moreInfoPage.style.display = 'none'
}


function contactTemplate(numberr) {
    const {
        fullName,
        idd,
        number,
    } = numberr

    return `
	<div class="contactsContainer">
		<div class="contactsImg">
			<img src="./img/user.png"/>
		</div>
			
		<div class="contactsInformation">
             <h4 id="userName">${fullName}</h4>
			<p id="userNumber">${idd} ${number}</p>
			 <span>last seen recently</span>
		</div>
	</div>
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

     numbersArr.reverse().forEach(numberr => {
        $userInformation.insertAdjacentHTML('beforeend', contactTemplate(numberr) )
     })

    } catch(e){
      console.error(e)
    }
  }

//   ----------------------------------------------------------

