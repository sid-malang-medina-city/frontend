import axios from 'axios'

import MockAdapter from 'axios-mock-adapter'

import data from './modules'

const mock = new MockAdapter(axios)

const methodMap = {
  GET: 'onGet',
  PUT: 'onPut',
  POST: 'onPost',
  DELETE: 'onDelete'
}

data.forEach(d => {
  const params = [d.url]

  switch (d.method) {
    case 'GET': params.push({ params: d.params })
      break
    case 'PUT' || 'POST': params.push(d.body)
      break
  }
  mock[methodMap[d.method]](...params).reply(200, d.response)
})

export default mock
