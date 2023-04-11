class postHandler {
  constructor() {
    this.imgs = []
    this.maxSize = 1200
  }

  handle() {
    this.handleClose()
    this.handleTextArea()
    this.handleImage()
    this.handleDate()
    this.handleQuote()
    this.handleCicle()
  }

  handleClose() {
    dr.select(".c1-7").click(() => {
      window.dram.scrollFront({
        m: false,
        times: 1
      })
    })
  }

  handleTextArea() {
    $(".c1-4 > textarea").each(function() {
      this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
    }).on("input", function() {
      if (this.scrollHeight > 250) return;
      this.style.height = 0;
      this.style.height = (this.scrollHeight) + "px";
    }).on("input", () => this.progress())
  }

  handleCicle() {
    this.bar = new ProgressBar.Circle("#c1-prog", {
      color: 'blue',
      strokeWidth: 10,
      easing: 'easeInOut'
    })
  }

  progress() {
    let text = $(".c1-4 > textarea").val()
    let p = (text.length / this.maxSize)
    if ((p * 100) >= 100) {
      this.bar.animate(1)
      $(".c1-prog > span").text("100%")
      return;
    }
    p = p.toFixed(2)
    this.bar.animate(p)
    $(".c1-prog > span").text((p * 100).toFixed(0) + "%")
  }

  handleQuote() {
    dr.select(".c1-quote").click(async () => {
      let data = await window.dram.api.getQuote()
      data = data[0]
      if (!data) {
        $(".c1-quote").click()
        return;
      }
      $(".c1-4 > textarea").val($(".c1-4 > textarea").val() + ` ${data.quote} - ${data.author}`)

      this.changeTextarea()
    })
  }

  changeTextarea() {
    $(".c1-4 > textarea").each(function() {
      if (this.scrollHeight > 250) return;
      this.setAttribute("style", "height:" + (this.scrollHeight) + "px;");
    })
    this.progress()
  }

  handleDate() {
    dr.select(".c1-date").click(() => {
      $(".c1-4 > textarea").val($(".c1-4 > textarea").val() + " " + moment().format("MMMM Do YYYY, dddd - h:mm:ss a"))
      this.changeTextarea()
    })
  }

  handleImage() {
    $(".c1-66 > input").on("change", () => {
      let files = $(".c1-66 > input").prop("files")
      if (this.imgs.length + files.length > 10) return window.dram.alert("Max Image Limit is 10")

      Object.keys(files).forEach(i => {
        if (this.imgs.length > 10) return;

        let url = URL.createObjectURL(files[i])
        let id = url.split("localhost")[1].split("/")[1]

        this.imgs.push({
          url: url,
          id: id
        })

        dr.select(".c1-5").append(`<div id="${id}"><i class="fas fa-skull-crossbones"></i></div><img src="${url}">`).classed("c1-55").id(id + "-1")

        $(`#${id}`).click((e) => {
          let id = e.target.id
          this.imgs = this.imgs.filter(c => c.id !== id)
          $(`#${id}-1`).remove()
        })
      })
    })
  }
}