class Profile {
  constructor(dram) {
    this.dram = dram;
    this.startIndex = 0;
    this.chunkSize = 15;
  }

  async handle() {
    this.user = await db.getData().then((d) => d.data);
    await this.handleTop();

    this.fyp = this.user.posts.reverse();
    await this.handlefyp();
    await this.handleScroll();

    this.dram.io.on("postAdded", async (post, user) => {
      if (
        user.id !== this.data.data.id ||
        !user.fyp.find((c) => c.id === post.id)
      )
        return;
      await this.Post(post, user, false);
    });
  }

  async handleTop() {
    $(".f4").append(`<div class="pro-1">
    <img class="pro-2" src="${this.user.banner}">
    <img class="pro-3" src="${this.user.pfp}">
    <div class="pro-4">
    <div class="pro-5">${this.user.name}</div>
    <div class="pro-6">${this.user.bio}</div>
    </div>
    <div class="pro-7">
    <div><span id="postsSize">${this.user.posts.length}</span><br>Posts</div>
    <div><span id="followersSize">${this.user.followers.length}</span><br>Followers</div>
    <div><span id="followingSize">${this.user.following.length}</span><br>Following</div>
    </div>
    <div class="pro-9"><i class="fas fa-pen"></i></div>
    </div>`);
  }

  async handleScroll() {
    $(".f4").on("scroll", async (e) => {
      if (
        $(".f4").scrollTop() + $(".f4").innerHeight() <
        $(".f4")[0].scrollHeight - 5
      )
        return;

      await this.nextChunk();
    });
  }

  async handlefyp() {
    await this.nextChunk();
  }

  async handleOpts(id, us) {
    $(`#${id}_tdots`).click(async (e) => {
      await this.dram.popper(`<div class="post-opts"> 
      ${
        us._id === this.user._id
          ? `<div class="post-del hover-1" id="${id}_del"><i class="fas fa-trash"></i> Delete</div>`
          : ""
      }
      </div>`);

      $("#" + id + "_del").click(async (e) => {
        let id = e.currentTarget.id.split("_")[0];

        let data = await fetch(
          `/postDelete?userId=${us._id}&postId=${id}`
        ).then((e) => e.json());

        if (data?.data?.done) {
          this.dram.alert("Successfully Deleted Post.");
          $("#" + id).remove();
          $("#postsSize").text(data.data.postCount);
        } else {
          this.dram.alert("Failed to delete");
        }
      });
    });
  }

  async Post(post, user, iii = true) {
    let date = moment(post.date);

    let html = `<div class="post-card" id="${post.id}">
    <div class="post-card-1">
    <img src="${user.pfp}">
    <div>
      <span>${user.name}</span>
      <span class="post-time">${date.fromNow()}</span>
    </div>
    <div class="Tdots" id="${
      post.id
    }_tdots"><i class="fas fa-ellipsis"></i></div>
    </div>
    <div class="post-card-2">
    <div>${post.text}</div>
    </div>
    <div class="post-card-3" id="${post.id}_imgs">
    ${post.images
      .map(
        (e, i = 1) =>
          `<div><div id="imgss"><span>${i + 1}</span>/${
            post.images.length
          }</div><img id="${e.name}" src="${e.path}"></div>`
      )
      .join("")}
      </div>
      <div class="post-card-5">
      <div class="like ${post.id}_${user._id}_like"><i class="${
      post.likes.find((c) => c === this.dram.id)
        ? "fas fa-heart"
        : "far fa-heart"
    }"></i> <span>${post.likes.length}</span></div>
    </div>
    </div>`;

    if (iii) {
      $(".f4").append(html);
    } else {
      $(".f4").prepend(html);
    }
    await this.handleLike(post.id, user._id);
    await this.handleOpts(post.id, user);
    await this.handleScrollImage(post.id);
  }

  async handleLike(id, uid) {
    $("." + id + "_" + uid + "_like").click(async (e) => {
      let pid = e.currentTarget.classList[1].split("_");

      let data = await fetch(
        `/like?userId=${this.user._id}&likedId=${pid[1]}&postId=${pid[0]}`
      ).then((res) => res.json());

      if (data.error) {
        this.dram.alert(data.error);
        return;
      }

      if (data.data.liked) {
        $("." + e.currentTarget.classList[1] + "> i").attr(
          "class",
          "fas fa-heart"
        );
      } else {
        $("." + e.currentTarget.classList[1] + "> i").attr(
          "class",
          "far fa-heart"
        );
      }

      $("." + e.currentTarget.classList[1] + "> span").text(
        data.data.totalLikes
      );
    });
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
      await this.Post(post, this.user);
    }

    this.startIndex = endIndex;
  }
}
