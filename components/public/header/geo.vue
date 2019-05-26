<template>
  <div class="m-geo">
    <i class="el-icon-location"/>{{ $store.state.geo.position.city }}
    <nuxt-link
      class="changeCity"
      to="/changeCity">切换城市</nuxt-link>
      [先和 兰芳 天津]
  </div>
</template>

<script>
export default {

}
</script>

<style lang="css">
</style>

