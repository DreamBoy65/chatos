class postHandler {
  constructor(dram) {
    this.imgs = [];
    this.maxSize = 1200;
    this.pfp();
    this.dram = dram;
  }

  handle() {
    this.handleClose();
    this.handleTextArea();
    this.handleImage();
    this.handleDate();
    this.handleQuote();
    this.handleCicle();
    this.handleKeyboard();
    this.handlePost();
  }

  async url2File(url, fileName) {
    const blob = await (await fetch(url)).blob();
    return new File([blob], fileName, { type: blob.type });
  }

  id() {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };

    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  }

  async readLoad(url) {
    let id = this.id();

    this.imgs.push({
      url: url,
      id: id,
    });

    dr.select(".c1-5")
      .append(
        `<div id="${id}"><i class="fas fa-skull-crossbones"></i></div><img src="${url}">`
      )
      .classed("c1-55")
      .id(id + "-1");

    $(`#${id}`).click(async (e) => {
      let id = await e.currentTarget.id;
      this.imgs = this.imgs.filter((c) => c.id !== id);
      $(`#${id}-1`).remove();
    });
  }

  async pfp() {
    let data = await db.getData();
    dr.select(".c1-3").css({
      backgroundImage: `url(${data.data.pfp})`,
    });
  }

  handlePost() {
    dr.select(".c1-8").click(async (e) => {
      let text = $(".c1-4 > textarea").val();

      const form = new FormData();
      form.append("text", text);

      for (const e of this.imgs) {
        let file = await this.url2File(e.url);
        form.append("posts", file);
      }

      let req = await fetch("/postCreate?id=" + window.dram.id, {
        body: form,
        method: "POST",
      }).then((res) => res.json());

      if (req.error) {
        window.dram.alert(req.error);
      }

      if (req.data) {
        window.dram.alert("Successfully posted your post.", false);
        this.imgs = [];
        $(".c1-4 > textarea").val("");
        $(".c1-5").empty();
        this.progress()
      }
    });
  }

  handleKeyboard() {
    $(window).on("resize", () => {
      let h = window.visualViewport.height - $(".c1-6").height();
      let w = $(window).height() - $(".c1-6").height();

      $(".c1-6").css({
        bottom: h < w ? h + "px" : 0,
      });
    });
  }

  handleClose() {
    dr.select(".c1-7").click(() => {
      this.dram.scrollFront();
    });
  }

  handleTextArea() {
    $(".c1-4 > textarea")
      .each(function () {
        this.setAttribute(
          "style",
          "height:" + this.scrollHeight + "px;overflow-y:hidden;"
        );
      })
      .on("input", function () {
        if (this.scrollHeight > 250) return;
        this.style.height = 0;
        this.style.height = this.scrollHeight + "px";
      })
      .on("input", () => this.progress());
  }

  handleCicle() {
    this.bar = new ProgressBar.Circle("#c1-prog", {
      color: "blue",
      strokeWidth: 10,
      easing: "easeInOut",
    });
  }

  progress() {
    let text = $(".c1-4 > textarea").val();
    let p = text.length / this.maxSize;
    if (p * 100 >= 100) {
      this.bar.animate(1);
      $(".c1-prog > span").text("100%");
      return;
    }
    p = p.toFixed(2);
    this.bar.animate(p);
    $(".c1-prog > span").text((p * 100).toFixed(0) + "%");
  }

  handleQuote() {
    dr.select(".c1-quote").click(async () => {
      let data = await window.dram.api.getQuote();
      data = data[0];
      if (!data) {
        $(".c1-quote").click();
        return;
      }
      $(".c1-4 > textarea").val(
        $(".c1-4 > textarea").val() + ` ${data.quote} - ${data.author}`
      );

      this.changeTextarea();
    });
  }

  changeTextarea() {
    $(".c1-4 > textarea").each(function () {
      if (this.scrollHeight > 250) return;
      this.setAttribute("style", "height:" + this.scrollHeight + "px;");
    });
    this.progress();
  }

  handleDate() {
    dr.select(".c1-date").click(() => {
      $(".c1-4 > textarea").val(
        $(".c1-4 > textarea").val() +
          " " +
          moment().format("MMMM Do YYYY, dddd - h:mm:ss a")
      );
      this.changeTextarea();
    });
  }

  handleImage() {
    $(".c1-66 > input").on("change", () => {
      let files = $(".c1-66 > input").prop("files");
      if (this.imgs.length + files.length > 10)
        return window.dram.alert("Max Image Limit is 10", true);

      Object.keys(files).forEach((i) => {
        if (this.imgs.length > 10) return;
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          this.readLoad(reader.result);
        });

        reader.readAsDataURL(files[i]);
      });
    });
  }
}
