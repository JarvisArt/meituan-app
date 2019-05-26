import Router from 'koa-router'
import axios from './utils/axios'
import Poi from '../dbs/models/poi'

let router = new Router({prefix: '/search'})

const sign = 'a3c9fe0782107295ee9f1709edd15218'

router.get('/top', async (ctx) => {
  // let {status, data: {top}} = await axios.get(`http://cp-tools.cn/search/top`, {
  //   params: {
  //     input: ctx.query.input,
  //     city: ctx.query.city,
  //     sign
  //   }
  // })
  // ctx.body = {
  //   top: status === 200 ? top : []
  // }
  try {
    let top = await Poi.find({
      'name': new RegExp(ctx.query.input),
      // city: ctx.query.city
    })
    ctx.body = {
      code: 0,
      top: top.map(item =>{
        return {
          name: item.name,
          type: item.type
        }
      }),
      type: top.length ? top[0].type : ''
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      top: []
    }
  }
})

router.get('/hotPlace', async (ctx) => {
  // // let city = !ctx.store ? ctx.store.geo.position.city : ctx.query.city
  // let {status, data: {result}} = await axios.get(`http://cp-tools.cn/search/hotPlace`, {
  //   params: {
  //     sign,
  //     // city
  //   }
  // })
  // ctx.body = {
  //   result: status === 200 ? result.slice(0, 5) : []
  // }


  // let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  try {
    let result = await Poi.find().limit(5)

    ctx.body = {
      code: 0,
      result: result.map(item => {
        return {
          name: item.name,
          type: item.type
        }
      })
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      result: []
    }
  }
})

export default router;
