const BASE_URL = import.meta.env.VITE_BASE_URL

export default [
  {
    url: BASE_URL + '/units',
    method: 'GET',
    response: {
      'code': 200,
      'status': 'OK',
      'data': {
        units: [
          {
            'lotNumber': 'A-12',
            'status': 'Terjual',
            'price': '2500000000',
            'type': 'Tipe 70',
          },
          {
            'lotNumber': 'A-13',
            'status': 'Booking',
            'price': '3500000000',
            'type': 'Tipe 69',
          },
          {
            'lotNumber': 'A-14',
            'status': 'Tersedia',
            'price': '4500000000',
            'type': 'Tipe 71',
          }
        ],
        minPrice: 2500000000,
        maxPrice: 4500000000
      },
      'pagination': {
        'totalUnits': 15,
        'page': 1,
        'size': 10,
        'totalPage': 2
      }
    }
  },
  {
    url: BASE_URL + '/unit',
    method: 'DELETE',
    response: {
      'code': 200,
      'status': 'OK',
      'data': true
    }
  }
]