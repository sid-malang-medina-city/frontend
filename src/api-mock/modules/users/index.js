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
          'id': 1,
          'name': 'Gafi',
          'email': 'gafi@gmail.com',
          'divisi': 'MARKETING',
          'role': 'ADMINISTRATOR'
        },
        // {
        //   'id': 2,
        //   'name': 'Ali',
        //   'email': 'ali@gmail.com',
        //   'divisi': 'Verifikasi',
        //   'role': 'Staff'
        // },
        // {
        //   'id': 3,
        //   'name': 'Fani',
        //   'email': 'fani@gmail.com',
        //   'divisi': 'Teknik',
        //   'role': 'Staff'
        // }
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
  },
  {
    url: BASE_URL + '/users/1',
    method: 'PUT',
    response: {
      'code': 200,
      'status': 'OK',
      'data': true
    }
  },
  {
    url: BASE_URL + '/users/',
    method: 'DELETE',
    response: {
      'code': 200,
      'status': 'OK',
      'data': true
    }
  },
  {
    url: BASE_URL + '/users/roles/',
    method: 'GET',
    response: {
      'code': 200,
      'status': 'OK',
      'data': [
        {
            'id': 1,
            'name': 'Administrator',
            'code': 'ADMINISTRATOR'
        },
        {
            'id': 2,
            'name': 'Manager',
            'code': 'MANAGER'
        },
        {
            'id': 3,
            'name': 'Staff',
            'code': 'STAFF'
        }
      ]
    }
  },
  {
    url: BASE_URL + '/users/divisions/',
    method: 'GET',
    response: {
      'code': 200,
      'status': 'OK',
      'data': [
        {
            'id': 1,
            'name': 'Admin',
            'code': 'ADMIN'
        },
        {
            'id': 2,
            'name': 'Marketing',
            'code': 'MARKETING'
        },
        {
            'id': 3,
            'name': 'Verifikasi',
            'code': 'VERIFIKASI'
        },
        {
            'id': 4,
            'name': 'Teknik',
            'code': 'TEKNIK'
        }
      ]
    }
  }
]