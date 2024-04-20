

const input = document.querySelector('#input')
const button = document.querySelector('#button')
const list = document.querySelector('#list')

// HTMLInputElement

button.addEventListener('click', () => {
  const obj = input.value

  console.log(
    Object.hasOwn(window, obj),
    // true если класс obj находится в window

    Object.getPrototypeOf(window[obj].prototype),
    // Возвращает прототип объекта.

    Object.getOwnPropertyDescriptors(window[obj].prototype),
    // Возвращает объект, содержащий все собственные дескрипторы свойств объекта
  )
})


