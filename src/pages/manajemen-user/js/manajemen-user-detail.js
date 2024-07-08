import { mapActions } from 'pinia'
import { userStore } from '~/store/users'

import helpers from '~/utils/helpers'

import {
  Delete,
  EditPen,
  View,
  Hide
} from '@element-plus/icons-vue'

import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import AclHandler from '~/mixins/acl-handler'
import { STATUS_USER } from '~/data/user'

export default {
  name: 'manajemen-user-detail',

  mixins: [RouterHandler, ToastHandler, AclHandler],

  components: {
    Delete,
    EditPen,
    View,
    Hide
  },

  data () {
    return {
      user: {},
      icons: {
        delete: Delete
      },
      userStatuses: STATUS_USER,
      helpers
    }
  },

  computed: {
    id () {
      return this.$route.params.id
    }
  },

  created () {
    this.getUser()
  },

  methods: {
    ...mapActions(userStore, [
      'fetchUser',
      'deleteUser'
    ]),

    async getUser () {
      try {
        const { data } = await this.fetchUser(this.id)
        this.user = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToEditPage () {
      this.redirectTo('ManajemenUserEdit', {
        params: {
          id: this.user.id
        }
      })
    },

    async openModalConfirmation () {
      try {
        await this.$confirm(
          'Apakah anda yakin ingin menghapus user ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus user berarti menghilangkan progress data dan akses mereka',
          'Hapus User',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteUser()
        this.showToast('User berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteUser() {
      try {
        await this.deleteUser({ id: this.user.id })
        this.redirectTo('ManajemenUser')
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenUser () {
      this.$router.back()
    }
  }
}