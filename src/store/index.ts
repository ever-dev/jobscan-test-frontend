import { createStore } from 'vuex'

import jobModule from './jobModule'

export default createStore({
  modules: {
    job: jobModule as any,
  },
})
