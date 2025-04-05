const form = document.querySelector('#form')

// campo obrigatório
form.addEventListener('submit', function (e) {
    e.preventDefault()

    const fields = [
        {
            id: 'name',
            label: 'Nome',
            validator: nameIsValid,
        },
        {
            id: 'surname',
            label: 'Sobrenome',
            validator: nameIsValid,
        },
        {
            id: 'birthdate',
            label: 'Nascimento',
            validator: dateIsValid,
        },
        {
            id: 'email',
            label: 'E-mail',
            validator: emailIsValid,
        },
        {
            id: 'password',
            label: 'Senha',
            validator: passwordIsSecure,
        },
        {
            id: 'confirm_password',
            label: 'Confirmar senha',
            validator: passwordMatch,
        },
    ]

    const errorIcon = '<i class="fa-solid fa-circle-exclamation"></i>'
    let hasError = false

    fields.forEach(function (field) {
        const input = document.getElementById(field.id)
        const inputBox = input.closest('.input-box')
        const inputValue = input.value

        const errorSpan = inputBox.querySelector('.error')
        errorSpan.innerHTML = ''

        const fieldValidator = field.validator(inputValue)
        if (!fieldValidator.isValid) {
            errorSpan.innerHTML = `${errorIcon} ${fieldValidator.errorMessage}`
            hasError = true
        }
    })

    const genders = document.getElementsByName('gender')
    const radioContainer = document.querySelector('#radio_container')
    const genderErrorSpan = radioContainer.querySelector('.error')

    const selectedGender = [...genders].find(input => input.checked)
    if (!selectedGender) {
        radioContainer.classList.add('invalid')
        genderErrorSpan.innerHTML = `${errorIcon} Selecione um gênero!`
        hasError = true
    } else {
        radioContainer.classList.remove('invalid')
        genderErrorSpan.innerHTML = ''
    }

    if (hasError) return

    form.reset()

    document.querySelectorAll('.error').forEach(el => el.innerHTML = '')

    const successMessage = document.getElementById('success-message')
    successMessage.classList.add('show')

    setTimeout(() => {
        successMessage.classList.remove('show')
        setTimeout(() => {
            successMessage.style.display = 'none'
        }, 500) 
    }, 3000)
})


function isEmpty(value) {
    return value === ''
}

// validar nome e sobrenome
function nameIsValid(value) {
    const validator = {
        isValid: true,
        errorMessage: null
    }

    if (isEmpty(value)) {
        validator.isValid = false
        validator.errorMessage = 'O campo é obrigatório!'
        return validator
    }

    const min = 3

    if (value.length < min) {
        validator.isValid = false
        validator.errorMessage = `O campo deve ter no mínimo ${min} caracteres!`
        return validator
    }

    const regex = /^[a-zA-Z]/
    if (!regex.test(value)) {
        validator.isValid = false
        validator.errorMessage = 'O campo deve conter apenas letras!'
    }


    return validator
}

// Validar data
function dateIsValid(value) {
    const validator = {
        isValid: true,
        errorMessage: null
    }

    if (isEmpty(value)) {
        validator.isValid = false
        validator.errorMessage = 'A data de nascimento é obrigatória!'
        return validator
    }

    const year = new Date(value).getFullYear()

    if (year < 1920 || year > new Date().getFullYear()) {
        validator.isValid = false
        validator.errorMessage = 'Data inválida!'
        return validator
    }

    return validator
}

// Validar e-mail
function emailIsValid(value) {
    const validator = {
        isValid: true,
        errorMessage: null
    }

    if (isEmpty(value)) {
        validator.isValid = false
        validator.errorMessage = 'O e-mail é obrigatório!'
        return validator
    }
    const regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
    if (!regex.test(value)) {
        validator.isValid = false
        validator.errorMessage = 'O e-mail precisa ser válido!'
        return validator
    }

    return validator
}

// Validar senhas
function passwordIsSecure(value) {
    const validator = {
        isValid: true,
        errorMessage: null
    }

    if (isEmpty(value)) {
        validator.isValid = false
        validator.errorMessage = 'A senha é obrigatória!'
        return validator
    }

    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (!regex.test(value)) {
        validator.isValid = false
        validator.errorMessage = `
            Sua senha deve conter ao menos: <br/>
            8 dígitos <br/>
            1 letra minúscula <br/>
            1 letra maiúscula <br/>
            1 número <br/>
            1 caractere especial
        `
        return validator
    }

    return validator
}

function passwordMatch(value) {
    const validator = {
        isValid: true,
        errorMessage: null
    }

    const passwordValue = document.getElementById('password').value

    if (value === '' || passwordValue !== value) {
        validator.isValid = false
        validator.errorMessage = 'Senhas não condizem!'
        return validator
    }

    return validator
}

// mostrar senha e olho
const passwordIcons = document.querySelectorAll('.password-icon')

passwordIcons.forEach(icon => {
    icon.addEventListener('click', function () {
        const input = this.parentElement.querySelector('.form-control')
        input.type = input.type === 'password' ? 'text' : 'password'
        this.classList.toggle('fa-eye')
    })
})