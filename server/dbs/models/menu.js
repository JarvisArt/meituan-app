import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Menu = new Schema({
  id: {
    type: String,
    require: true
  },
  menu: {
    type: Array,
    require: true
  }
})

export default mongoose.model('Menu', Menu)
