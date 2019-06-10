<template>
  <div class="page-changeCity">
   <el-row>
     <el-col :span="24">
       <iSelect />
     </el-col>
   </el-row>
   <el-row>
     <el-col :span="24">
       <Hot />
     </el-col>
   </el-row>
   <el-row>
     <el-col :span="24">
       <Categroy />
     </el-col>
   </el-row>
  </div>
</template>

<script  type='text/ecmascript-6'>
import iSelect from '@/components/changeCity/iselect'
import Hot from '@/components/changeCity/hot'
import Categroy from '@/components/changeCity/categroy'
export default {
  components: {
    iSelect,
    Hot,
    Categroy
  }
}
</script>

<style scoped lang='scss'>

</style>
