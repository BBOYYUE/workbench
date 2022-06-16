<template>
  <div>
    <vue-codemirror v-model="optionString"
                    :extensions="editorExtensions" />
  </div>
</template>
<script>
export default {
  props: {
    optionString: String
  },
  setup () {

  },
}
</script>