const BASE_URL = import.meta.env.VITE_BASE_URL

export default [
  {
    url: BASE_URL + '/marketing/laporan-marketing',
    method: 'GET',
    response: {
      'code': 200,
      'status': 'OK',
      'data': [
        {
          'id': 'LM006',
          'marketer': {
            'id': 4,
            'created_at': '2023-10-07T11:36:50.182006Z',
            'updated_at': '2023-10-07T11:36:50.182036Z',
            'nama': 'Marketer External 1',
            'email': 'marketer.external.1@gmail.com',
            'alamat': 'Jalan Menuju Surga No.7',
            'nomor_telepon': '0859101726387126',
            'status': 'EXTERNAL',
            'created_by': 1,
            'updated_by': 1
          },
          'status_fee': 'TERBAYAR',
          'jumlah_fee': 795,
          'keterangan': 'Use the neural XML application, then you can transmit the multi-byte firewall!',
          'created_at': '2023-10-07T12:33:55.975173Z',
          'updated_at': '2023-10-07T12:33:55.975205Z',
          'created_by': null,
          'updated_by': 11
        },
        {
          'id': 'LM007',
          'marketer': {
            'id': 5,
            'created_at': '2023-10-07T11:36:58.289578Z',
            'updated_at': '2023-10-07T11:36:58.289612Z',
            'nama': 'Marketer External 2',
            'email': 'marketer.external.2@gmail.com',
            'alamat': 'Jalan Menuju Surga No.7',
            'nomor_telepon': '0859101726387126',
            'status': 'EXTERNAL',
            'created_by': 1,
            'updated_by': 1
          },
          'status_fee': 'TERBAYAR',
          'jumlah_fee': 283,
          'keterangan': 'The FTP panel is down, compress the optical interface so we can back up the PCI circuit!',
          'created_at': '2023-10-07T12:33:58.931377Z',
          'updated_at': '2023-10-07T12:33:58.931408Z',
          'created_by': null,
          'updated_by': 11
        },
        {
          'id': 'LM010',
          'marketer': {
            'id': 4,
            'created_at': '2023-10-07T11:36:50.182006Z',
            'updated_at': '2023-10-07T11:36:50.182036Z',
            'nama': 'Marketer External 1',
            'email': 'marketer.external.1@gmail.com',
            'alamat': 'Jalan Menuju Surga No.7',
            'nomor_telepon': '0859101726387126',
            'status': 'EXTERNAL',
            'created_by': 1,
            'updated_by': 1
          },
          'status_fee': 'TERBAYAR',
          'jumlah_fee': 668,
          'keterangan': 'The SQL sensor is down, quantify the online alarm so we can reboot the RSS interface!',
          'created_at': '2023-10-07T12:34:08.106379Z',
          'updated_at': '2023-10-07T12:34:08.106409Z',
          'created_by': null,
          'updated_by': 11
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
    url: BASE_URL + '/marketing/laporan-marketing/LM006',
    method: 'GET',
    response: {
      'code': 200,
      'status': 'OK',
      'data': {
        'id': 'LM002',
        'marketer': {
            'id': 3,
            'created_at': '2023-10-07T11:36:33.394175Z',
            'updated_at': '2023-10-07T11:36:33.394213Z',
            'nama': 'Marketer Inhouse 2',
            'email': 'marketer.inhouse.2@gmail.com',
            'alamat': 'Jalan Menuju Surga No.7',
            'nomor_telepon': '0859101726387126',
            'status': 'INHOUSE',
            'created_by': 1,
            'updated_by': 1
        },
        'status_fee': 'TERBAYAR',
        'jumlah_fee': 12839127,
        'keterangan': 'Test 12312312',
        'created_at': '2023-10-07T12:28:52.917361Z',
        'updated_at': '2023-10-07T12:28:52.917372Z',
        'created_by': null,
        'updated_by': 11
      }
    }
  },
  {
    url: BASE_URL + '/marketing/laporan-marketing/LM006',
    method: 'PUT',
    response: {
      'code': 200,
      'status': 'OK',
      'data': true
    }
  }
]