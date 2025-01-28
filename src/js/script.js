const form = document.querySelector('#form')

form.addEventListener('submit', function (e) {
    e.preventDefault()

    const errorIcon = '<i class="fa-solid fa-circle-exclamation"></i>'

    const name = document.querySelector('#name')
    const inputBox = name.closest('.input-box')
    const nameValue = name.value

    const errorSpan = inputBox.querySelector('.error')
    errorSpan.innerHTML = ''

    if (isEmpty(nameValue)) {
        errorSpan.innerHTML = `${errorIcon} O campo é obrigatório`
        return
    }
})

function isEmpty(value) {
    return value === ''
}



const passwordIcons = document.querySelectorAll('.password-icon')

passwordIcons.forEach(icon => {
    icon.addEventListener('click', function () {
        const input = this.parentElement.querySelector('.form-control')
        input.type = input.type === 'password' ? 'text' : 'password'
        this.classList.toggle('fa-eye')
    })
})