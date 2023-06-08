class Home {
  constructor(dram) {
    this.dram = dram;
    this.startIndex = 0;
    this.chunkSize = 15;
  }

  async handle() {
    this.data = await db.getData();
    this.fyp = this.data.data.fyp.reverse();

    await this.handlefyp();
    await this.handleScroll();

    this.dram.io.on("postAdded", async (post, user) => {
      await this.Post(post, user, false);
    });
  }

  async handleScroll() {
    $(".f1").on("scroll", async (e) => {
      if (
        $(".f1").scrollTop() + $(".f1").innerHeight() <
        $(".f1")[0].scrollHeight - 5
      )
        return;

      await this.nextChunk();
    });
  }

  async handlefyp() {
    await this.nextChunk();
  }

  async handleOpts(id) {
    $(`#${id}_tdots`).click(async () => {
      await this.dram.popper("hello");
    });
  }

  async Post(post, user, iii = true) {
    let date = moment(post.date);
    let html = [
      `<div class="post-card" id="${post.id}">`,
      `<div class="post-card-1">`,
      `<img src="${user.pfp}">`,
      `<div>`,
      `<span>${user.name}</span>`,
      `<span class="post-time">${date.fromNow()}</span>`,
      `</div>`,
      `<div class="Tdots" id="${post.id}_tdots"><i class="fas fa-ellipsis"></i></div>`,
      `</div>`,
      `<div class="post-card-2">`,
      `<div>${post.text}</div>`,
      `</div>`,
      `<div class="post-card-3" id="${post.id}_imgs">`,
      `${post.images
        .map(
          (e, i = 1) =>
            `<div><div id="imgss"><span>${i + 1}</span>/${
              post.images.length
            }</div><img id="${e.name}" src="${e.path}"></div>`
        )
        .join("")}`,
      `</div>`,
      `<div class="post-card-5">`,
      `<div class="like ${post.id}_like"><i class="${
        post.likes.find((c) => c === this.dram.id)
          ? "fas fa-heart"
          : "far fa-heart"
      }"></i> <span>${post.likes.length}</span></div>`,
      `</div>`,
      `</div>`,
    ].join("");

    if (iii) {
      $(".f1").append(html);
    } else {
      $(".f1").prepend(html);
    }

    await this.handleOpts(post.id);
    await this.handleScrollImage(post.id);
  }

  async handleScrollImage(id) {
    $("#" + id + "_imgs").on("scroll", async (e) => {
      $("#" + id + "_counter > #imgss > span").text(
        `${
          Math.floor(
            $("#" + id + "_imgs").scrollLeft() / $("#" + id + "_imgs").width()
          ) + 1
        }`
      );
    });
  }

  async nextChunk() {
    const endIndex = Math.min(
      this.startIndex + this.chunkSize,
      this.fyp.length
    );

    for (let i = this.startIndex; i < endIndex; i++) {
      let post = this.fyp[i];
      let user = await db.getData(post.user);
      if (post && user) {
        let p = user.data.posts.find((c) => c.id === post.post);
        if (p) {
          this.Post(p, user.data);
        }
      }
    }

    this.startIndex = endIndex;
  }
}
