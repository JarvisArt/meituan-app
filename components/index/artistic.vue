<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd
        :class="{active:kind==='all'}"
        kind="all"
        keyword="酒店">全部</dd>
      <dd
        :class="{active:kind==='part'}"
        kind="part"
        keyword="美食">约会聚餐</dd>
      <dd
        :class="{active:kind==='movie'}"
        kind="movie"
        keyword="电影">电影演出</dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="(item, index) in cur"
        :key="index">
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="never">
          <img
            :src="item.img"
            class="image">
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos"><span>{{ item.pos }}</span></li>
            <li class="price">￥<em>{{ item.price }}</em><span>/起</span></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  data: () => {
    return {
      kind: 'all',
      list: {
        all: [],
        part: [],
        movie: [],
      }
    }
  },
  computed: {
    cur: function () {
      return this.list[this.kind]
    }
  },
  async mounted(){
    let self=this;
    let {status,data:{count,pois}}=await self.$axios.get('/search/resultsByKeywords',{
      params: {
        keyword:'酒店',
        city:self.$store.state.geo.position.city
      }
    })
    if(status === 200 && count > 0){
      let result = pois.map(item=>{
        return {
          title: item.name,
          pos: item.pos,
          price: item.price || '暂无',
          img: item.photoUrl || 'https://p1.meituan.net/msmerchant/9480fc7bed1f8b92f69b7f8fde219da6273275.jpg@368w_208h_1e_1c',
          url: item.url || 'https://qd.meituan.com/'
        }
      })
      self.list[self.kind] = result
    }else{
      self.list[self.kind] = []
    }
  },
  methods: {
    over: async function (e) {
      let dom = e.target
      let tag = dom.tagName.toLowerCase()
      let self = this
      if (tag === 'dd') {
        this.kind = dom.getAttribute('kind')
        let keyword = dom.getAttribute('keyword')
        let {status,data:{count,pois}}=await self.$axios.get('/search/resultsByKeywords',{
          params:{
            keyword,
            city:self.$store.state.geo.position.city
          }
        })
        if(status === 200 && count > 0){
          let result = pois.map(item=>{
            return {
              title: item.name,
              pos: item.pos,
              price: item.price || '暂无',
              img: item.photoUrl || 'https://p1.meituan.net/msmerchant/9480fc7bed1f8b92f69b7f8fde219da6273275.jpg@368w_208h_1e_1c',
              url: item.url || 'https://qd.meituan.com/'
            }
          })
          self.list[self.kind] = result
        }else{
          self.list[self.kind] = []
        }
      }
    }
  },

}
</script>
<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>
