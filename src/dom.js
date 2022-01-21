window.dom = {
    create(string) {
        let div = document.createElement('template');
        //  div.innerHTML = string
        div.innerHTML = string.trim();//去掉string里面的空格
        return div.content.firstChild;
    },
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling)
        //node.insertBefore(newNode, referenceNode)
        //newNode 用于插入的节点;referenceNode newNode 将要插在这个节点之前
    },
    before(node2, node) {
        node.parentNode.insertBefore(node2, node)
    },
    append(parent, child) {
        parent.appendChild(child)
    },
    wrap(child, parent) {
        dom.before(parent, child);//个人理解这一步的作用在于将创建的parent放到页面中,并指定了放置的位置
        parent.appendChild(child);//appendChild会自动将插入的元素移出原来的位置
    },
    remove(node) {
        // node.remove()
        node.parentNode.removeChild(node)
    },
    empty(node) {
        // for (let i = 0; i < node.children.length; i++) {
        //     node.children[i].remove()
        // } 
        //这个方法不对，是因为node.children.length是不断变化的
        while (node.firstChild) {
            node.firstChild.remove()
        }
        //当节点的第一个子元素存在时，移除第一个子元素
    },
    attr(node, key, value) {//arguments.length表明参数个数
        if (arguments.length === 3) {
            node.setAttribute(key, value)
        } else if (arguments.length === 2) {
            node.getAttribute(key)
            console.log(node.getAttribute(key))
        }

    },
    text(node, string) { //注意如果改变的节点里面还有子节点，那么这些节点会因为被新的文本内容取代而消失
        if ('innerText' in node) {
            if (arguments.length === 2) {
                node.innerText = string
            } else if (arguments.length === 1) {
                console.log(node.innerText)
            }

        } else {
            if (arguments.length === 2) {
                node.textContent = string
            } else if (arguments.length === 1) {
                console.log(node.textContent)
            }

        }

    },
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            console.log(node.innerHTML)
        }

    },
    style(node, string) {
        //这里可以做很多优化，但是我累了
        node.style = string
    },
    class: {
        add(node, name) {
            node.classList.add(name)
        },
        remove(node, name) {
            //不知道为什么remove之后还有class存在，只是后面没有赋值
            node.classList.remove(name)
        },
        has(node, name) {
            //晕，写了半天有固定的API,这就是读书少的后果
            // return node.classList.contains(name)
            if (node.classList.length !== 0) {
                for (let i = 0; i < node.classList.length; i++) {
                    if (name === node.classList[i]) {
                        console.log("存在该属性")
                    } else if (node.classList.length == c) {
                        console.log("不存在该属性")
                    }
                }
            } else {
                console.log("不存在该属性")
            }
        },


    },
    on(node, EvenName, fn) {
        node.addEventListener(EvenName, fn)
    },
    off(node, EvenName, fn) {
        node.removeEventListener(EvenName, fn)
    },
    find(selector, scope) {
        console.log((scope || document).querySelectorAll(selector))
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    siblings(node) {
        //为什么老师的方法如此简洁
        // siblings(node){
        //     return Array.from(node.parentNode.children)
        //     .filter(n=>n!==node)
        //   },
        let s = node.parentNode.children
        let list = [];
        let n = 0;
        for (let i = 0; i < s.length; i++) {
            if (node !== s[i]) {
                list.push(s[i])
                console.log(list[n]);
                n++;
            }
        }

    },
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
        //头脑过于简单才写出下面的代码
        // node.nextSibling
    },
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
        //同上
        //node.previousSibling
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        let list = dom.children(node.parentNode)
        for (let i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
}


