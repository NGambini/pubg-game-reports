import { createStore, applyMiddleware, compose } from 'redux'
import axiosMiddleware from 'redux-axios-middleware'
import thunk from 'redux-thunk'
import axios, { AxiosInstance } from 'axios'

import rootReducer from './rootReducer'
// import IStoreState from './IStoreState'

const composeEnhancers = (
  process.env.NODE_ENV === 'development' &&
  window && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
) || compose

const pubgApiClient: AxiosInstance = axios.create({
  baseURL:'https://api.playbattlegrounds.com/',
  responseType: 'json',
  headers: {
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4ZDg3ODMyMC0yYWU4LTAxMzYtOGU1MS0wN2YzZTFlZWIzZmMiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTI0NjgyNzAzLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InJlYWN0LXB1YmctdmlzdWFsaXplciIsInNjb3BlIjoiY29tbXVuaXR5IiwibGltaXQiOjEwfQ.D707fLxSqaDgm2bYhQr5luTTdQogSISO11gTuGqtKZQ',
    'Accept': 'application/vnd.api+json'
  }
})

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      axiosMiddleware(pubgApiClient),
      thunk
    )
  )
)

// export store singleton instance
export default store
