const div = dom.create("<div id='div1'></div>")
console.log(div)
dom.after(test, div)
dom.after(div, test)
dom.append(test, div)
const div3 = dom.create("<div id='div3'></div>")
dom.wrap(test, div3)
// dom.remove(test)
// dom.empty(empty)
dom.attr(ex, 'style', 'color:red')
dom.attr(ex, 'style')
dom.text(test, 'hello')
dom.text(test)
dom.html(test, "<div>11</div>")
dom.style(test, 'font-size:30px;background-color:pink')
dom.class.add(test, 'xxx')
dom.class.remove(test, 'xxx')
dom.class.has(test, 'xxx')
let fn = function fn() {
    console.log("点击函数")
}
dom.on(window, 'click', fn)
dom.off(window, 'click', fn)
dom.find('div')
dom.siblings(ss)
dom.next(test)
dom.previous(test)