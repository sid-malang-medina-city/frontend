const BASE_URL = import.meta.env.VITE_BASE_URL

export default [
  {
    url: BASE_URL + '/konsumens',
    method: 'GET',
    response: {
      'code': 200,
      'status': 'OK',
      'data': [
        {
          'id': 1,
          'name': 'Gafi',
          'email': 'gafi@gmail.com',
          'address': 'Jl. Jenderal Sudirman No. 99',
          'status': 'BOOKING'
        },
        {
          'id': 2,
          'name': 'Ali',
          'email': 'ali@gmail.com',
          'address': 'Jl. Jenderal Sudirman No. 90',
          'status': 'TERVERIFIKASI'
        },
        {
          'id': 1,
          'name': 'Fani',
          'email': 'fani@gmail.com',
          'address': 'Jl. Jenderal Sudirman No. 96',
          'status': 'CANCEL'
        }
      ],
      'pagination': {
        'page': 1,
        'page_size': 10,
        'total_items': 3,
        'total_pages': 1
      }
    }
  },
  {
    url: BASE_URL + '/konsumen/1',
    method: 'DELETE',
    response: {
      'code': 200,
      'status': 'OK',
      'data': true
    }
  }
]