<template>
  <div id="footer">Made by Austin Chiu 2021</div>
</template>

<script>
export default {
  name: "MyFooter",
};
</script>

<style lang="scss" scoped>
#footer {
  // position: absolute;
  // bottom: 0;
  width: 100%;
  height: 25px;
  margin: 0px;
  background: #fff;
  text-align: center;
  @media (max-width: $mediumSizeView) {
    // display: none;
  }
}
</style>