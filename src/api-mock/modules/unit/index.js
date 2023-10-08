const BASE_URL = import.meta.env.VITE_BASE_URL

export default [
  {
    url: BASE_URL + '/unit',
    method: 'GET',
    response: {
      'code': 200,
      'status': 'OK',
      'data': [
        {
          'id': 1,
          'nomor_kavling': 'A-12',
          'status': 'TERJUAL',
          'harga': '2500000000',
          'tipe': 'Tipe 70',
        },
        {
          'id': 2,
          'nomor_kavling': 'A-13',
          'status': 'BOOKING',
          'harga': '3500000000',
          'tipe': 'Tipe 69',
        },
        {
          'id': 3,
          'nomor_kavling': 'A-14',
          'status': 'TERSEDIA',
          'harga': '4500000000',
          'tipe': 'Tipe 71',
        }
      ],
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
  },
  {
    url: BASE_URL + '/unit',
    method: 'POST',
    response: {
      'code': 200,
      'status': 'OK',
      'data': true
    }
  },
  {
    url: BASE_URL + '/unit/1',
    method: 'GET',
    response: {
      'code': 200,
      'status': 'OK',
      'data': {
        'id': 1,
        'nomor_kavling': 'KAV-01',
        'harga': 2000000000,
        'tipe': 'TIPE-01',
        'luas_bangunan': '150',
        'luas_tanah': '100',
        'fasilitas': 'kolam renang',
        'daya_listrik': '1500',
        'jumlah_kamar_tidur': 3,
        'jumlah_kamar_mandi': 2,
        'created_at': '2023-10-04T16:40:18.340323Z',
        'updated_at': '2023-10-04T16:40:18.340346Z',
        'created_by': 1,
        'updated_by': 1,
        'foto_1': '',
        'foto_2': '',
        'foto_3': '',
        'status': 'TERSEDIA',
        'foto_1_access_url': '/house.jpg',
        'foto_2_access_url': '/house.jpg',
        'foto_3_access_url': '/house.jpg',
        'created_by_name': 'Gafi',
        'updated_by_name': 'Ali',
        'created_at': '2023-10-04T16:40:18.340323Z',
        'updated_at': '2023-10-04T16:40:18.340346Z',
        'created_by': 1,
        'updated_by': 1,
      }
    }
  },
  {
    url: BASE_URL + '/unit/1',
    method: 'PUT',
    response: {
      'code': 200,
      'status': 'OK',
      'data': true
    }
  }
]