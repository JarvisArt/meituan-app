import Router from 'koa-router'
import axios from './utils/axios'
import Province from '../dbs/models/province'
import Menu from '../dbs/models/menu'
import City from '../dbs/models/city'

let router = new Router({prefix: '/geo'})

const sign = 'a3c9fe0782107295ee9f1709edd15218'

router.get('/getPosition', async (ctx) => {
  // let { status, data: {province, city}} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  // if (status === 200) {
  //   ctx.body = {
  //     province,
  //     city
  //   }
  // } else {
  //   ctx.body = {
  //     province: '',
  //     city: ''
  //   }
  // }
  ctx.body = {
    province: '广东省',
    city: '广州市'
  }
})

router.get('/province', async (ctx) => {
  // let { status, data: {province}} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  // ctx.body = {
  //   province: status === 200 ? province : []
  // }
  let province = await Province.find()
  ctx.body = {
    province: province.map(item => {
      return {
        id: item.id,
        name: item.value[0]
      }
    })
  }
})

router.get('/menu', async (ctx) => {
  // let {status, data: {
  //   menu
  // }} = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`)
  // if (status === 200) {
  //   ctx.body = {
  //     menu
  //   }
  // } else {
  //   ctx.body = {
  //     menu: []
  //   }
  // }
  const {menu} = await Menu.findOne()
  ctx.body = {
    menu
  }
})

router.get('/city', async (ctx) => {
  const { provinceId } = ctx.query;
  if (provinceId) {
    let city = await City.findOne({ id: provinceId })
    ctx.body = {
      city: city.value
    }
  } else {
    let city = await City.find()
    let cityArr = []
    city && city.forEach((list) => {
      list.value.forEach((item) => {
        cityArr.push(item)
      })
    })
    ctx.body = {
      city: cityArr
    }
  }
})


export default router;
