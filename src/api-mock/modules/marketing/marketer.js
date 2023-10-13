const BASE_URL = import.meta.env.VITE_BASE_URL

export default [
  {
    url: BASE_URL + '/marketing/marketer',
    method: 'GET',
    response: {
      'code': 200,
      'status': 'OK',
      'data': [
        {
          id: 1,
          nama: 'Gafi',
          status: 'INHOUSE',
          no_telp: '081290222',
          email: 'gafi@gmail.com',
          alamat: 'Jl. Jend Sudirman No. 99'
        },
        {
          id: 2,
          nama: 'Ali',
          status: 'EXTERNAL',
          no_telp: '0814390222',
          email: 'ali@gmail.com',
          alamat: 'Jl. Jend Sudirman No. 99'
        },
        {
          id: 1,
          nama: 'Fani',
          status: 'INHOUSE',
          no_telp: '08132290222',
          email: 'fani@gmail.com',
          alamat: 'Jl. Jend Sudirman No. 99'
        }
      ],
      'pagination': {
        'page': 1,
        'page_size': 10,
        'total_items': 3,
        'total_pages': 1
      }
    }
  }
]