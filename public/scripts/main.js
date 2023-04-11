window.addEventListener("DOMContentLoaded", () => {
  window.dram = new Utopia()
})

class Utopia {
  constructor() {
    this.init()
    this.api = new Api()
  }

  init() {
    //this.scrollFront()
    this.handleFooter()
    this.handlePosts()
  }

  scrollFront(args = {}) {
    args.times = args.times ? args.times : 1
    let el = dr.select(".c1").functions().getSliderWidth()
    $(".body").scrollLeft(args.m ? (-(el * args.times)) : (el * args.times))
  }

  handleFooter() {
    new Footer().handle()
  }

  handlePosts() {
    new postHandler().handle()
  }
  
  alert(msg) {
    alert(msg)
  }
}