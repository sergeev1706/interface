

const input = document.querySelector('#input')
const button = document.querySelector('#button')
const list = document.querySelector('#list')
const errorsBlock = document.querySelector('#errors')

class MyError extends Error { }

input.addEventListener('focus', () => {

  errorsBlock.textContent = ''
  input.classList.remove('is-invalid')
})

button.addEventListener('click', () => {
  const value = input.value
  list.textContent = ''

  try {
    // если в window нет такого класса 
    if (!Object.hasOwn(window, value)) {
      throw new MyError(`В Window нет класса: ${value}`)
    }

    // если свойство не является функцией
    if (typeof window[value] !== 'function') {
      throw new MyError(`${window[value]} не является функцией`)
    }
    // показать прототип
    showPrototype(window[value].prototype)

    // показать цепочку
    showChain(window[value].prototype)

  } catch (error) {

    errorsBlock.textContent = error.message
    input.classList.add('is-invalid')
  }
})

// показать прототип
function showPrototype(prototypeClass) {

  const listItem = document.createElement('li')
  listItem.textContent = prototypeClass.constructor ? prototypeClass.constructor.name : 'Без названия'

  // добавить в DOM
  listItem.append(showListPropsProto(prototypeClass))
  list.append(listItem)
}

// показать цепочку
function showChain(prototypeClass) {

  if (Object.getPrototypeOf(prototypeClass) !== null) {
    const objPrototype = Object.getPrototypeOf(prototypeClass)

    const listItem = document.createElement('li')
    listItem.textContent = objPrototype.constructor ? objPrototype.constructor.name : 'Без названия'

    // добавить в DOM
    listItem.append(showListPropsProto(objPrototype))
    list.append(listItem)

    showChain(objPrototype)
  }
}

// список свойств прототипа
function showListPropsProto(currentPrototype) {

  const list = document.createElement('ol')
  const descr = Object.getOwnPropertyDescriptors(currentPrototype)
  console.log(Object.entries(descr))

  Object.entries(descr).map(([prop, value]) => {

    const item = document.createElement('li')
    item.textContent = `Свойство - "${prop}", тип - "${value.get ? typeof value.get : typeof value.value}"`

    // добавить в DOM
    list.append(item)
  })
  return list
}

