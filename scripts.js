const formTrial = document.forms['form-trial']

const hideError = (input) => {
  if (input.nextElementSibling) input.nextElementSibling.remove()

  if (input.classList.contains('error')) {
    input.classList.add('success')

    setTimeout(() => {
      input.classList.remove('success')
    }, 500)
  }

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
    const name = title(input.name)

    if (input.value.trim() === '') {
      showError(input, `${name} field is required.`)
    } else {
      hideError(input)
    }
  })
}

const onlyAlphabet = (inputs) => {
  const pattern = /^[A-Z ]+$/i

  inputs.forEach((input) => {
    const name = title(input.name)

    if (pattern.test(input.value.trim())) {
      hideError(input)
    } else {
      showError(input, `${name} field must be alphabet characters.`)
    }
  })
}

const checkValidEmail = (input) => {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const test = pattern.test(input.value)

  if (!test) {
    showError(input, 'Please provide valid email')
    return
  }

  return true
}

const checkLength = (inputs, min, max) => {
  inputs.forEach((input) => {
    const value = input.value
    const name = title(input.name)

    if (value.length < min) {
      showError(input, `${name} minimal ${min} characters.`)
    }

    if (value.length > max) {
      showError(input, `${name} maximal ${max} characters.`)
    }
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