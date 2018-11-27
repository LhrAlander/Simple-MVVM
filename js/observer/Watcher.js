import Dep from './Dep'

class Watcher {
  constructor (vm, prop, cb) {
    this.vm = vm
    this.prop = prop
    this.cb = cb
    this.value = this.get()
  }

  update () {
    const value = this.getValue(this.vm, this.prop)
    const oldValue = this.value
    if (value === oldValue) return
    this.value = value
    this.cb(value)
  }

  getValue (vm, prop) {
    prop = prop.split('.')
    return prop.reduce((obj, key) => obj[key.trim()], vm.data)
  }

  get () {
    Dep.target = this
    const value = this.getValue(this.vm, this.prop)
    Dep.target = null
    return value
  }
}

export default Watcher