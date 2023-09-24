const BASE_URL = import.meta.env.VITE_BASE_URL

export default [
  {
    url: BASE_URL + '/users/login/',
    method: 'POST',
    response: {
      'code': 200,
      'status': 'OK',
      'data': {
        access: 'access-token',
        refresh: 'refresh-token'
      },
    }
  },
  {
    url: BASE_URL + '/users/',
    method: 'GET',
    response: {
      'code': 200,
      'status': 'OK',
      'data': [
        {
          'name': 'Gafi',
          'email': 'gafi@gmail.com',
          'divisi': 'Marketing',
          'role': 'Admin'
        },
        {
          'name': 'Ali',
          'email': 'ali@gmail.com',
          'divisi': 'Verifikasi',
          'role': 'Staff'
        },
        {
          'name': 'Fani',
          'email': 'fani@gmail.com',
          'divisi': 'Teknik',
          'role': 'Staff'
        }
      ],
      'pagination': {
        'totalUsers': 15,
        'page': 1,
        'size': 10,
        'totalPage': 2
      }
    }
  },
  {
    url: BASE_URL + '/users/',
    method: 'POST',
    response: {
      'code': 200,
      'status': 'OK',
      'data': true
    }
  }
]