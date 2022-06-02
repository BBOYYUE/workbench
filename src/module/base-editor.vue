<template>
  <div class="w-screen h-screen flex flex-col justify-between"
       @mouseup="end"
       @touchend="end"
       @mousemove="move"
       @touchmove="move">
    <div class="bg-gray-700 border-gray-700 border-b border-solid h-10">
      <slot name="header"></slot>
    </div>
    <div class="flex flex-row justify-between flex-grow">
      <div class="flex flex-row justify-between min-w-4"
           ref="left">
        <div class="flex-grow bg-gray-900">
          <slot name="left"></slot>
        </div>
        <div class="bg-gray-900  w-1 cursor-e-resize"
             id="left"
             @mousedown="down"
             @touchstart="down"></div>
      </div>
      <div class="flex flex-col flex-grow">
        <div class="flex flex-row flex-grow">
          <div class="flex-grow bg-gray-800">
            <slot name="content"></slot>
          </div>
          <div class="flex flex-row justify-between min-w-4"
               ref="right">
            <div class="bg-gray-900 w-1 cursor-w-resize"
                 id="right"
                 @mousedown="down"
                 @touchstart="down">
            </div>
            <div class="flex-grow bg-gray-900">
              <slot name="right"></slot>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-between min-h-4"
             ref="footer">
          <div class="bg-gray-700 h-1 cursor-n-resize"
               id="footer"
               @mousedown="down"
               @touchstart="down">
          </div>
          <div class="flex-grow bg-gray-700 overflow-hidden">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  setup () {

  },
  data () {
    return {
      activeBox: "",
      moveDiv: {},
      canMove: false,
      position: {
        x: 0,
        y: 0
      },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: ""
    }
  },
  methods: {
    down (event) {
      this.moveDiv = event.target;
      this.activeBox = this.moveDiv.id
      this.canMove = true
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
      console.log("选中")
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
        switch (this.activeBox) {
          case 'left':
            this.$refs[this.activeBox].style.width = this.xPum + "px"
            console.log(this.$refs[this.activeBox].style.width, this.xPum)
            break;
          case 'right':
            this.$refs[this.activeBox].style.width = window.innerWidth - this.xPum + "px"
            console.log(this.$refs[this.activeBox].style.width)
            break;
          case 'footer':
            this.$refs[this.activeBox].style.height = window.innerHeight - this.yPum + "px"
            console.log(this.$refs[this.activeBox].style.height)
            break;
        }

        // this.moveDiv.style.left = this.xPum + "px";
        // this.moveDiv.style.top = this.yPum + "px";
      }
    },
    end () {
      console.log('移出')
      this.moveDiv = {};
      this.activeBox = {}
      this.canMove = false
    }
  },
  computed: {
    bodyHeight () {
      return ""
    }
  }
}
</script>
<style scoped>
.min-w-4 {
  min-width: 1.5rem;
}
.min-h-4 {
  min-height: 2rem;
}
</style>