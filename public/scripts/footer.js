class Footer {
  constructor() {
    window.Cur = "home"
    dr.select("#home").addClass("footer-active")
    dr.select(".profile-1").css({ backgroundImage: "url(https://cdn.discordapp.com/avatars/813299347819069520/b835800881dbfe33f869dd6392dd6794.webp?size=4096)" })
  }

  handle() {
    dr.select(".footer-1").click(this.toggle)
    dr.select(".footer-1").click(this.handleNav)
  }

  toggle() {
    let el = dr.select(".footer-1").el
    el.forEach(e => e != this ? e.classList.remove("footer-active") : null)

    if (this.classList != "footer-active") {
      this.classList.add("footer-active")
    }
  }

  handleNav() {
    this.Cur = window.Cur
    let slider = $(".body2")[0]
    let width = dr.select(".body2").functions().getSliderWidth()
    let id = this.id
    let index = $(".footer-1").index(this) + 1
    let currentIndex = $(".footer-1").index($("#" + this.Cur)) + 1
    let left = index - currentIndex
    if (id === this.Cur) return;
    let Width = width * left
    window.Cur = id
    $(".body2").scrollLeft(slider.scrollLeft + (Width))
  }
}