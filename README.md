## MVVM 双向绑定实现

> 跟着源码走一遍然后自己实现了个超简陋版的 双向绑定，只实现了 v-model 指令 和 {{}} 模板编译。熟悉了发布订阅、观察者模式

````
// index.js
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

// index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <input type="text" id="v-input" v-model="person.name">
    <p id="v-text"> {{ person.name }}</p>
  </div>
  <script src="./js/index.js">
</body>
</html>
````