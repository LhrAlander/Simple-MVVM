import Observer from './Observer'
import Compile from './Complie'

class MVue {
  constructor (options) {
    this.el = options.el
    this.data = options.data
    new Observer(this.data)
    new Compile(this.el, this)
  }
}

export default MVue