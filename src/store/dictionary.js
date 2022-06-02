import axios from 'axios'

import { normalize, schema } from 'normalizr'

const product_type = new schema.Entity('product_type')
const work_type = new schema.Entity('work_type')
const dictionary = new schema.Entity('dictionary', {
  product_types: [product_type],
  work_types: [work_type]
})
const dataSchema = new schema.Array(dictionary)
export default {
  namespaced: true,
  state: {
    productType: {},
    workType: {}
  },
  getters: {},
  actions: {
    getDictionary (context) {
      context.commit('getDictionary');
    }
  },
  mutations: {
    getDictionary (state) {
      axios.get('http://192.168.10.10/api/v2/getDictionary')
        .then((res) => {
          state.productType = normalize(res.data.data, dictionary).entities.product_type
          state.workType = normalize(res.data.data, dictionary).entities.work_type
        })
    }
  }
}