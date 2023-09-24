import { Back } from '@element-plus/icons-vue'

export default {
  name: 'page-header',

  props: {
    title: {
      type: String,
      required: true
    },
    showBackIcon: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  components: {
    Back
  }
}
