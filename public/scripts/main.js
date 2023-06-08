window.addEventListener("DOMContentLoaded", () => {
  window.dram = new Utopia();
});

class Utopia {
  constructor() {
    this.init();
    this.api = new Api();
    this.io = io();
    this.id = localStorage.getItem("chatos");
    this.io.emit("join", this.id);

    if (
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      this.alert(
        "Please access this website from a mobile device to get the best user experience.",
        true
      );
    }
  }

  init() {
    this.scrollFront();
    this.handleFooter();
    this.handlePosts();
    this.handleHome();
    this.handleProfile();
    this.handlePopper();
  }

  scrollFront(args = {}) {
    args.times = args.times ? args.times : 1;
    let el = dr.select(".c1").functions().getSliderWidth();
    $(".body").scrollLeft(args.m ? -(el * args.times) : el * args.times);
  }

  handleFooter() {
    new Footer(this).handle();
  }

  handleHome() {
    new Home(this).handle();
  }

  handlePosts() {
    new postHandler(this).handle();
  }

  handleProfile() {
    new Profile(this).handle();
  }

  async popper(html, i = true) {
    $(".popper-2").html(html);
    $(".popper").css("height", "0");

    setTimeout(() => {
      $(".popper").css("height", i ? "400px" : "calc(100% - 50px)");
    }, 200);
  }

  handlePopper() {
    let startY, endY;
    let initialHeight, currentHeight;

    $(".popper-1").on("touchstart", function (e) {
      var touch = e.originalEvent.touches[0];
      startY = touch.clientY;

      initialHeight = $(".popper").height();
    });

    $(".popper-1").on("touchmove", function (e) {
      var touch = e.originalEvent.touches[0];
      endY = touch.clientY;

      let distance = startY - endY;

      currentHeight = initialHeight + distance;

      $(".popper").css("height", currentHeight + "px");
    });

    $(".popper-1").on("touchend", function () {
      initialHeight = currentHeight;
      if (initialHeight < 100) {
        initialHeight = 0;
        currentHeight = 0;
        $(".popper").css("height", initialHeight + "px");
      }
    });

    $(".popper-1").dblclick(() => {
      $(".popper").css("height", 0 + "px");
    });
  }

  alert(msg, i = false) {
    if (!msg) return;
    let id = this.genId();

    let html = `<div class="toast ${
      i ? "red" : "green"
    }" id="${id}"><span>${msg}</span></div>`;

    $(".toast-container").append(html);

    setTimeout(function () {
      $("#" + id).css({
        display: "block",
        animation: "slideInRight 0.5s ease-in-out, fadeOut 0.5s 3.5s",
      });
    }, 100);

    setTimeout(function () {
      $("#" + id).remove();
    }, 4000);
  }

  genId() {
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
}
