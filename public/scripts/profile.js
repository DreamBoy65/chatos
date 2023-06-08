class Profile {
  constructor(dram) {
    this.dram = dram;
  }

  async handle() {
    this.user = await db.getData();

    await this.handleProfile();
  }

  async handleTop() {}

  async handleProfile() {
    for (const post of this.user.data.posts.reverse()) {
      await this.Post(post);
    }
  }

  async Post(post) {
    let user = user.data;
    let date = moment(post.date);
    let html = [
      `<div class="post-card" id="${post.id}">`,
      `<div class="post-card-1">`,
      `<img src="${user.pfp}">`,
      `<div>`,
      `<span>${user.name}</span>`,
      `<span class="post-time">${date.fromNow()}</span>`,
      `</div>`,
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

    $(".f4").append(html);
  }
}
