const BASE_URL = import.meta.env.VITE_BASE_URL

export default [
  {
    url: BASE_URL + '/user/login',
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
    url: BASE_URL + '/user',
    method: 'GET',
    response: {
      'code': 200,
      'status': 'OK',
      'data': [
        {
          'id': 1,
          'name': 'Gafi',
          'email': 'gafi@gmail.com',
          'division': 'Marketing',
          'role': 'Administrator'
        },
        {
          'id': 2,
          'name': 'Ali',
          'email': 'ali@gmail.com',
          'division': 'Verifikasi',
          'role': 'Staff'
        },
        {
          'id': 3,
          'name': 'Fani',
          'email': 'fani@gmail.com',
          'division': 'Teknik',
          'role': 'Staff'
        }
      ],
      'pagination': {
        'page': 1,
        'page_size': 10,
        'total_items': 2,
        'total_pages': 1
      }
    }
  },
  {
    url: BASE_URL + '/user/1',
    method: 'GET',
    response: {
      'is_active': true,
      'is_superuser': true,
      'last_login': '2023-09-28T10:50:13.797377Z',
      'date_joined': '2023-09-27T04:19:48.440249Z',
      'id': 1,
      'name': 'Gafi',
      'email': 'gafi@gmail.com',
      'division': 'MARKETING',
      'role': 'ADMINISTRATOR'
    }
  },
  {
    url: BASE_URL + '/user',
    method: 'POST',
    response: {
      'code': 200,
      'status': 'OK',
      'data': true
    }
  },
  {
    url: BASE_URL + '/user/1',
    method: 'PUT',
    response: {
      'code': 200,
      'status': 'OK',
      'data': true
    }
  },
  {
    url: BASE_URL + '/user/1',
    method: 'DELETE',
    response: {
      'code': 200,
      'status': 'OK',
      'data': true
    }
  },
  {
    url: BASE_URL + '/user/roles',
    method: 'GET',
    response: [
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
  },
  {
    url: BASE_URL + '/user/divisions',
    method: 'GET',
    response: [
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
]