import { createStore } from 'vuex'

import jobModule from './jobModule'

export default createStore({
  modules: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    job: jobModule as any,
  },
})
