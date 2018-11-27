import Watcher from './Watcher'

const CompileUtil = {
  getValue (vm, prop) {
    prop = prop.split('.')
    return prop.reduce((obj, key) => obj[key.trim()], vm.data)
  },
  getTextValue (vm, prop) {
    return prop.replace(/\{\{([^\}]+)\}\}/g, function () {
      return CompileUtil.getValue(vm, arguments[1].trim())
    })
  },
  text: function (node, vm, prop) {
    prop.trim()
    node.textContent = this.getTextValue(vm, prop)
    let reg = /\{\{([^\}]+)\}\}/g
    prop.replace(reg, function () {
      let key = arguments[1]
      new Watcher(vm, key, newValue => {
        node.textContent = newValue
      })
    })
  },
  setValue: function (vm, prop, value) {
    prop = prop.trim().split('.')
    let length = prop.length - 1
    prop.reduce((obj, key, index) => {
      if (index === length) {
        return obj[key.trim()] = value
      }
      return obj[key.trim()]
    }, vm.data)
  },
  model: function (node, vm, prop) {
    new Watcher(vm, prop, newValue => {
      node.value = newValue
    })
    node.value = this.getValue(vm, prop)
    node.addEventListener('input', e => {
      let newValue = e.target.value
      this.setValue(vm, prop, newValue)
    })
  }
}

class Compile {
  constructor (el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    if (this.el) {
      let fragment = this.node2fragment(this.el)
      this.compile(fragment)
      this.el.appendChild(fragment)
    }
  }

  isElementNode (node) {
    return node.nodeType === 1
  }

  isDirective (name) {
    return name.includes('v-')
  }

  node2fragment (el) {
    let fragment = document.createDocumentFragment()
    let firstChild = null
    while (firstChild = el.firstChild) {
      fragment.appendChild(firstChild)
    }
    return fragment
  }

  compileElement (node) {
    let attrs = node.attributes
    Array.from(attrs).forEach(attr => {
      let attrName = attr.name
      if (!this.isDirective(attrName)) return
      let prop = attr.value
      let type = attrName.split('-')[1]
      CompileUtil[type](node, this.vm, prop)
    })
  }

  compileText (node) {
    let prop = node.textContent
    let reg = /\{\{([^\}]+)\}\}/
    if (reg.test(prop)) {
      CompileUtil.text(node, this.vm, prop)
    }
  }

  compile (fragment) {
    let childNodes = fragment.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isElementNode(node)) {
        this.compileElement(node)
        this.compile(node)
      } else {
        this.compileText(node)
      }
    })
  }
}

export default Compile
