import MVue from './observer/MVue'

let options = {
  el: '#app',
  data: {
    person: {
      name: 'Nicholas',
      age: 22
    }
  }
}
let vm = new MVue(options)