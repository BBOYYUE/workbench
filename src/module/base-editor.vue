<template>
  <div class="w-screen h-screen flex flex-col"
       @mouseup="end"
       @touchend="end"
       @mousemove="move"
       @touchmove="move">
    <div class="bg-gray-800 border-gray-800 border-b border-solid h-10"
         id="top"
         ref="top">
      <slot name="header"></slot>
    </div>
    <div class="flex flex-row justify-between">
      <!--左侧-->
      <div class="flex flex-row w-72 z-30"
           ref="left">
        <div class="flex-grow bg-gray-900 w-full h-full">
          <slot name="left"></slot>
        </div>
        <div class="bg-gray-900 w-2 cursor-e-resize"
             id="left"
             @mousedown="down"
             @touchstart="down"></div>
      </div>

      <div class="flex flex-col flex-grow">
        <div class="flex flex-row flex-grow">
          <div class="flex flex-col flex-grow bg-gray-800 z-0">
            <div ref="contentMenu">
              <slot name="content-menu"></slot>
            </div>
            <div ref="content"
                 class="flex-grow">
              <el-scrollbar always>
                <slot name="content"></slot>
              </el-scrollbar>
            </div>
          </div>
          <!--右侧-->
          <div class="flex flex-row z-10">
            <div class="bg-gray-900 w-2 cursor-w-resize  "
                 id="right"
                 @mousedown="down"
                 @touchstart="down"></div>
            <div class="bg-gray-900 min-w-4 w-72"
                 ref="right">
              <slot name="right"></slot>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-between h-72 z-20"
             ref="footer">
          <div class="bg-gray-700 h-2 cursor-n-resize "
               id="footer"
               @mousedown="down"
               @touchstart="down"></div>
          <div class="flex-grow bg-gray-700">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup () { },
  data () {
    return {
      activeBox: "",
      moveDiv: {},
      canMove: false,
      contentScrollbar: {},
      position: {
        x: 0,
        y: 0,
      },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: "",
    };
  },
  mounted () {
    let top = this.$refs.top;
    let left = this.$refs.left;
    let right = this.$refs.right;
    let contentMenu = this.$refs.contentMenu;
    let content = this.$refs.content;
    let footer = this.$refs.footer

    left.style.height = "calc(100vh - " + top.offsetHeight + "px)"
    footer.style.maxWidth = "calc(100vw - " + left.offsetWidth + "px)"
    content.style.maxWidth = "calc(100vw - " + left.offsetWidth + "px - " + right.offsetWidth + "px - 1rem)"
    content.style.maxHeight = "calc(100vh - " + top.offsetHeight + "px - " + contentMenu.offsetHeight + "px - " + footer.offsetHeight + "px - 1rem)"
    window.addEventListener('reSetEditerWindowSize', this.reSetEditerWindowSize);
  },
  methods: {
    reSetEditerWindowSize (event) {
      let layout = event.data.layout;
      let type = event.data.type;
      if (layout == 'right' && type == "maxWidth") {
        this.setRightMaxSize()
      } else if (layout == 'content' && type == "maxWidth") {
        this.setContentMaxSize()
      }
    },
    setRightMaxSize () {
      let left = this.$refs.left;
      let right = this.$refs.right;
      let content = this.$refs.content;
      let footer = this.$refs.footer
      right.style.width = "calc(" + footer.offsetWidth + "px - 18rem - .5rem)"
      content.style.maxWidth = "calc(100vw - " + left.offsetWidth + "px - " + right.offsetWidth + "px - 1rem)"
    },
    setContentMaxSize () {
      let left = this.$refs.left;
      let right = this.$refs.right;
      let content = this.$refs.content;
      right.style.width = "18rem"
      content.style.maxWidth = "calc(100vw - " + left.offsetWidth + "px - " + right.offsetWidth + "px - 1rem)"
    },
    down (event) {
      this.moveDiv = event.target;
      this.activeBox = this.moveDiv.id;
      this.canMove = true;
      let touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      this.position.x = touch.clientX;
      this.position.y = touch.clientY;
      this.dx = this.moveDiv.offsetLeft;
      this.dy = this.moveDiv.offsetTop;
      console.log("选中");
    },
    move (event) {
      if (this.canMove) {
        let touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;
        this.xPum = this.dx + this.nx;
        this.yPum = this.dy + this.ny;
        console.log(this.activeBox)
        this.setWindowSize(this.activeBox, this.xPum, this.yPum)
        setTimeout(function () {
          window.dispatchEvent(new Event('contentResize'))
        }, 25)
        // this.moveDiv.style.left = this.xPum + "px";
        // this.moveDiv.style.top = this.yPum + "px";
      }
    },
    setWindowSize (type, x, y) {
      let top = this.$refs.top;
      let left = this.$refs.left;
      let right = this.$refs.right;
      let contentMenu = this.$refs.contentMenu;
      let content = this.$refs.content;
      let footer = this.$refs.footer
      switch (type) {
        case 'right':
          if (x > window.innerWidth - 20) return;
          if (x < 200 + left.offsetWidth) return;
          right.style.width = "calc(100vw - " + x + "px - .5rem)"
          content.style.maxWidth = "calc(100vw - " + left.offsetWidth + "px - " + right.offsetWidth + "px - 1rem)"
          content.style.maxHeight = "calc(100vh - " + top.offsetHeight + "px - " + contentMenu.offsetHeight + "px - " + footer.offsetHeight + "px - 1rem)"

          break
        case "left":
          console.log(x, window.innerWidth - 200 - right.offsetWidth)
          if (x < 20) return;
          left.style.width = "calc(" + x + "px + .5rem)"
          footer.style.maxWidth = "calc(100vw - " + left.offsetWidth + "px)"
          content.style.maxWidth = "calc(100vw - " + left.offsetWidth + "px - " + right.offsetWidth + "px - 1rem)"
          content.style.maxHeight = "calc(100vh - " + top.offsetHeight + "px - " + contentMenu.offsetHeight + "px - " + footer.offsetHeight + "px - 1rem)"

          break
        case "footer":
          if (y < top.height + 200) return;
          if (y > window.innerHeight - 200 - top.offsetHeight) return;
          footer.style.height = "calc(100vh - " + y + "px)"
          content.style.maxWidth = "calc(100vw - " + left.offsetWidth + "px - " + right.offsetWidth + "px - 1rem)"
          content.style.maxHeight = "calc(100vh - " + top.offsetHeight + "px - " + contentMenu.offsetHeight + "px - " + footer.offsetHeight + "px - 1rem)"

          break

      }
    },
    end () {
      this.moveDiv = {};
      this.activeBox = {};
      this.canMove = false;
      // this.$refs.content
    },
  },
  computed: {
    bodyHeight () {
      return "";
    },
  },
};
</script>
<style scoped>
.min-w-4 {
  min-width: 1.5rem;
}
.min-h-4 {
  min-height: 2rem;
}
</style>