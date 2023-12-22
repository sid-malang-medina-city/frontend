import { Back } from '@element-plus/icons-vue'
import gearIcon from '/gear.svg'

export default {
  name: 'page-header',

  emits: ['back'],

  props: {
    title: {
      type: String,
      required: true
    },
    showBackIcon: {
      type: Boolean,
      required: false,
      default: false
    },
    filter: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  components: {
    Back
  },

  data () {
    return {
      gearIcon
    }
  },

  methods: {
    back () {
      this.$emit('back')
    },
    handleFilterClick () {
      this.$emit('filter-click')
    }
  }
}
