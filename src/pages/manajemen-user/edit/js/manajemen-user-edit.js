import { mapActions } from 'pinia'
import { userStore } from '~/store/users'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import AclHandler from '~/mixins/acl-handler'

import keyIcon from '/key.svg'
import userIcon from '/user.svg'

import { WarningFilled } from '@element-plus/icons-vue'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default {
  name: 'manajemen-user-edit',

  mixins: [RouterHandler, ToastHandler, AclHandler],

  components: {
    PageHeader,
    WarningFilled
  },

  data () {
    return {
      formData: {
        name: '',
        role_id: null,
        division_ids: []
      },
      error: {
        email: ''
      },
      roles: [],
      divisions: [],
      visibleLoading: false,
      keyIcon,
      userIcon
    }
  },

  created () {
    this.getRoles()
    this.getDivisions()
    this.getUser()
  },

  computed: {
    id () {
      return this.$route.params.id
    }
  },

  methods: {
    ...mapActions(userStore, [
      'fetchUser',
      'editUser',
      'fetchDivisions',
      'fetchRoles',
    ]),

    async getRoles () {
      try {
        const { data } = await this.fetchRoles()
        this.roles = JSON.parse(JSON.stringify(data.filter(role => role.code !== 'ADMINISTRATOR')))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    async getDivisions () {
      try {
        const { data } = await this.fetchDivisions()
        this.divisions = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    async getUser () {
      try {
        const { data } = await this.fetchUser(this.id)
        this.initFormData(JSON.parse(JSON.stringify(data)))        
      } catch (e) {
        this.showErrorResponse(e)
      }
    },

    initFormData (data) {
      const {
        divisions,
        role,
        ...formData
      } = data

      this.formData = {
        ...formData,
        division_ids: divisions.map(division => division.id),
        role_id: role.id
      }
    },

    validateEmail () {
      if (!EMAIL_REGEX.test(String(this.formData.email).toLowerCase())) {
        this.error.email = 'Gunakan format yang sesuai (contoh: user@gmail.com)'
        return false
      }

      this.error.email = ''
      return true
    },

    async submit () {
      if (this.validateEmail()) {
        this.visibleLoading = true
        try {
          await this.editUser(this.formData.id, this.formData)
          this.showToast('Data user berhasil diperbarui!')
          this.goToManajemenUser()
        } catch (e) {
          this.showErrorResponse(e)
        } finally {
          this.visibleLoading = false
        }
      }
    },

    goToManajemenUser () {
      this.$router.back()
    },
    
    goToManajemenUserEditChangePassword () {
      this.redirectTo('ManajemenUserEditChangePassword')
    },
  }
}
