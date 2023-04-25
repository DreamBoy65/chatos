const dr = {
  select: function(el) {
    let ell = document.querySelectorAll(el)
    return new Dream(ell)
  }
}

const db = {
  getData: async function(id) {
    if (!id) {
      id = localStorage.getItem("Chatos")
    }
    let data = await fetch("/user?id=" + id).then(res => res.json())
    
    return data;
  }
}

class Dream {
  constructor(el) {
    this.el = el
    this.clickEvents = ["click"]
  }

  click(callback) {
    this.clickEvents.forEach(e => {
      this.el.forEach(el => {
        if (!callback) {
          el.dispatchEvent(e)
        } else {
          this.addEvent(el, e, callback)
        }
      })
    })

    return this;
  }

  remove() {
    this.el.forEach(e => e.remove())
    return this;
  }

  parent() {
    let parents = []
    this.el.forEach(e => {
      parents.push(e.parentNode)
    })

    console.log(parents)
  }

  html(html) {
    if (html) {
      this.el.forEach(e => {
        e.innerHTML = html
      })
      return this;
    } else {
      return this.el.length === 1 ? this.el[0].innerHTML: this.el.map(e => e.innerHTML)
    }
  }

  text(text) {
    if (text) {
      this.el.forEach(e => {
        e.innerText = text
      })
      return this;
    } else {
      return this.el.length === 1 ? this.el[0].innerText: this.el.map(e => e.innerText)
    }
  }

  css(obj) {
    Object.keys(obj).forEach(e => {
      this.el.forEach(el => {
        el.style[e] = obj[e]
      })
    })

    return this;
  }

  append(ele) {
    ele = ele.trim()
    let f = ele.split("")[0] === "<"

    let doc = document.createElement(f ? "div": f)

    if (f) {
      doc.innerHTML = ele
    }

    this.el.forEach(el => {
      el.appendChild(doc)
    })

    return new Child(doc)

  }

  addEvent(el, event, callback) {
    el.addEventListener(event, callback)

    return this;
  }

  removeEvent(events) {
    if (typeof events === "array") {
      events.forEach(e => {
        this.el.forEach(el => {
          el.removeEventListener(e)
        })
      })
    } else {
      this.el.forEach(el => {
        el.removeEventListener(events)
      })
    }

    return this;
  }

  animate(obj, config = {}) {
    this.el.forEach(el => {
      el.style.transition = `all ${config.time ? config.time: "1s"} ${config.type ? config.type: "linear"}`
    })

    this.css(obj)

    return this;
  }

  letterize() {
    for (let e of this.el) {
      let array = []
      let text = e.innerText.replace(/ /g, '&').split("")

      text.forEach(f => {
        let n = document.createElement("span")
        n.innerText = f === "&" ? "\u00A0": f

        array.push(n)
      })

      e.innerHTML = ""
      array.forEach(i => {
        e.appendChild(i)
      })
    }

    return this;
  }

  addClass(clas) {
    this.el.forEach(e => {
      e.classList.add(clas)
    })

    return this;
  }

  removeClass(clas) {
    this.el.forEach(e => {
      e.classList.remove(clas)
    })

    return this;
  }

  toggleClass(clas) {
    this.el.forEach(e => {
      e.classList.toggle(clas)
    })

    return this;
  }

  animation(con) {
    return new Animation(this, con)
  }

  functions() {
    return new Functions(this)
  }
}


class Functions {
  constructor(el) {
    this.el = el
  }

  getSliderWidth() {
    let widths = []
    let docs = this.el.el
    docs.forEach(el => {
      const style = window.getComputedStyle(el)
      const width = style.width.split("px")[0]
      return widths.push(parseInt(width))
    })

    return widths.length === 1 ? widths[0]: widths
  }

  getSliderHeight() {
    let heights = []
    let docs = document.querySelectorAll(this.el.el)
    docs.forEach(el => {
      const style = window.getComputedStyle(el)
      const height = style.height.split("px")[0]
      return heights.push(parseInt(height))
    })

    return heights.length === 1 ? heights[0]: heights
  }
}



class Animation {
  constructor(el, config = {}) {
    this.el = el
    this.c = config
  }

  circle() {
    this.el.animate({
      borderRadius: "50%"
    }, this.c)

    return this;
  }

  square(s) {
    this.el.animate({
      width: s,
      height: s
    }, this.c)

    return this;
  }

  rectangle(w, h) {
    this.el.animate({
      height: h,
      width: w
    }, this.c)

    return this;
  }
}


class Child {
  constructor(child) {
    this.c = child
  }

  classed(cla) {
    this.c.classList.add(cla)
    return this;
  }

  id(id) {
    this.c.id = id
    return this;
  }

  remove() {
    return this.c.remove()
  }

  html(html) {
    this.c.innerHTML = html
    return this;
  }

  text(text) {
    this.c.innerText = text
    return this;
  }
}