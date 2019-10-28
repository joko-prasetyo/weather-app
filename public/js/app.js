const form = document.querySelector('form')
const input = document.querySelector('input')
const messageOne  = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address=' + input.value).then(response => {
        response.json().then(({ forecast, location, error })=> {
            if(error) messageOne.textContent = error
            else {
                messageOne.textContent = forecast
                messageTwo.textContent = location
            }
        })
    })    
})
