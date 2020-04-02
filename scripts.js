const formTrial = document.forms['form-trial']

const hideError = (input) => {
  if (input.nextElementSibling) input.nextElementSibling.remove()

  input.classList.remove('error')
}

const showError = (input, message) => {
  if (input.nextElementSibling) return

  const span = document.createElement('span')
  span.textContent = message

  input.classList.add('error')
  input.parentElement.appendChild(span)
}

const title = (string) => {
  const wordsArr = string.replace(/[-| ]/g, ' ').split(' ')
  const words = []

  wordsArr.forEach((wordArr) => {
    words.push(wordArr[0].toUpperCase() + wordArr.slice(1))
  })

  return words.join(' ');
}

const required = (inputs) => {
  inputs.forEach((input) => {
    if (input.value.trim() === '') {
      const name = input.name
      showError(input, `${title(name)} field is required.`)
    } else {
      hideError(input)
    }
  })
}

const onlyAlphabet = (inputs) => {
  const pattern = /^[a-zA-Z]+$/g
  inputs.forEach((input) => {
    const test = pattern.test(input.value)
    const name = input.name

    if (test) {
      hideError(input)
    } else {
      showError(input, `${title(name)} field must be alphabet characters.`)
    }
  })
}

const checkValidEmail = (input) => {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const test = pattern.test(input.value)

  if (!test) return showError(input, 'Please provide valid email')

  return true
}

const checkLength = (inputs, min, max) => {
  inputs.forEach((input) => {
    const value = input.value
    const name = input.name

    if (value.length < min) showError(input, `${title(name)} minimal ${min} characters.`)

    if (value.length > max) showError(input, `${title(name)} maximal ${max} characters.`)
  })
}

formTrial.addEventListener('submit', (e) => {
  e.preventDefault()

  const input = {
    firstName: formTrial['first-name'],
    lastName: formTrial['last-name'],
    emailAddress: formTrial['email-address'],
    password: formTrial['password'],
  }

  required(Object.values(input))
  onlyAlphabet([input.firstName, input.lastName])
  checkValidEmail(input.emailAddress)
  checkLength([input.password], 8, 16)
})