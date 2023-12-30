export const STATUSES = {
  'BOOKING': {
    name: 'Booking',
    code: 'BOOKING',
    color: '#0BB1C4'
  },
  'HOLD': {
    name: 'Hold',
    code: 'HOLD',
    color: '#C4C4C4'
  },
  'TERJUAL': {
    name: 'Terjual',
    code: 'TERJUAL',
    color: '#9D27C6'
  },
  'TERSEDIA': {
    name: 'Tersedia',
    code: 'TERSEDIA',
    color: '#74C627'
  },
  'IN_PROGRESS_PEMBANGUNAN': {
    name: 'In progress pembangunan',
    code: 'IN_PROGRESS_PEMBANGUNAN',
    color: '#F91DBB'
  },
  'STB': {
    name: 'Serah terima bangunan',
    code: 'STB',
    color: '#0B6BC4'
  }
}

export const STATUS_MAPPINGS = {
  'TERSEDIA': {
    'TERSEDIA': {
      name: 'Tersedia',
      code: 'TERSEDIA',
      color: '#74C627'
    },
    'HOLD': {
      name: 'Hold',
      code: 'HOLD',
      color: '#C4C4C4'
    },
  },
  'HOLD': {
    'TERSEDIA': {
      name: 'Tersedia',
      code: 'TERSEDIA',
      color: '#74C627'
    },
    'HOLD': {
      name: 'Hold',
      code: 'HOLD',
      color: '#C4C4C4'
    },
  },
  'TERJUAL': {
    'TERJUAL': {
      name: 'Terjual',
      code: 'TERJUAL',
      color: '#9D27C6'
    },
    'IN_PROGRESS_PEMBANGUNAN': {
      name: 'In progress pembangunan',
      code: 'IN_PROGRESS_PEMBANGUNAN',
      color: '#F91DBB'
    }
  },
  'TERJUAL': {
    'TERJUAL': {
      name: 'Terjual',
      code: 'TERJUAL',
      color: '#9D27C6'
    },
    'IN_PROGRESS_PEMBANGUNAN': {
      name: 'In progress pembangunan',
      code: 'IN_PROGRESS_PEMBANGUNAN',
      color: '#F91DBB'
    }
  },
  'IN_PROGRESS_PEMBANGUNAN': {
    'IN_PROGRESS_PEMBANGUNAN': {
      name: 'In progress pembangunan',
      code: 'IN_PROGRESS_PEMBANGUNAN',
      color: '#F91DBB'
    },
    'STB': {
      name: 'Serah terima bangunan',
      code: 'STB',
      color: '#0B6BC4'
    }
  }
}
