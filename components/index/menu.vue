<template>
  <div class="e-menu-wrap">
    <dl class="m-menu">
      <dt>全部分类</dt>
      <dd v-for="(item, idx) in menu" :key="idx">
        <i class="item.type"/>{{ item.title }}<span class="arrow"/>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          type: 'food',
          title: '美食'
        },
        {
          type: 'takeout',
          title: '外卖'
        },
        {
          type: 'hotel',
          title: '酒店'
        }
      ]
    }
  }
}
</script>

<style lang=css>
</style>

