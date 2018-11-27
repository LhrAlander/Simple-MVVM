class Dep {
  constructor () {
    this.subs = []
  }

  addSub (sub) {
    this.subs.push(sub)
  }

  removeSub (sub) {
    if (this.subs.length) {
      const index = this.subs.indexOf(sub)
      if (index > -1) {
        return this.subs.slice(index, 1)
      }
    }
  }

  notify () {
    this.subs.forEach(_ => {
      _.update()
    })
  }
}

Dep.target = null

export default Dep