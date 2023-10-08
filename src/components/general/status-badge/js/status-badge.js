export default {
  name: 'status-badge',

  props: {
    color: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'list'
    }
  }
}