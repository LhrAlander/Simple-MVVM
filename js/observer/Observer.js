import Dep from './Dep'

class Observer {
  constructor (value) {
    this.value = value
    this.walk(value)
  }

  walk (obj) {
    const keys = Object.keys(obj)
    keys.forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

function observe (obj) {
  if (!obj || typeof obj !== 'object') return
  new Observer(obj)
}

function defineReactive(obj, key, value) {
  observe(value)
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      Dep.target && dep.addSub(Dep.target)
      return value
    },
    set: function reactiveSetter (newValue) {
      if (value !== newValue) {
        value = newValue
        dep.notify()
      }
    }
  })
}

export default Observer