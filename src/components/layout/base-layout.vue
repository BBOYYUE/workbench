<template>
  <div class="
            w-screen
            h-screen
            absolute
            top-0
            flex flex-col flex-auto
            divide-y divide-solid divide-gray-200
        ">
    <!--header-->
    <div class="bg-gray-800 w-full h-16 flex-grow-0 border-b-2 shadow-lg">
      <slot name="header"></slot>
    </div>
    <!--body-->
    <div class="bg-gray-50 flex-grow">
      <div class="flex flex-row h-full">
        <div class="border-r-2 shadow-lg">
          <slot name="left-menu"></slot>
        </div>
        <!--navigation-->
        <div class="flex-grow">
          <div class="bg-gray-100 w-full h-10 flex-grow-0 border-b-2  shadow-lg">
            <slot name="navigation"></slot>
          </div>
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PanoramaEditBaseLayout",
};
</script>