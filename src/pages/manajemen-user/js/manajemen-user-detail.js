import { mapActions } from 'pinia'
import { userStore } from '~/store/users'

import {
  Delete,
  EditPen,
  View,
  Hide
} from '@element-plus/icons-vue'

import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

export default {
  name: 'manajemen-user-detail',

  mixins: [RouterHandler, ToastHandler],

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
      visiblePassword: false
    }
  },

  created () {
    // TODO: need to get data from API
    this.user = {
      id: 1,
      name: 'Gafirazi',
      divisi: 'Marketing',
      role: 'Staff',
      email: 'gafi@gmail.com',
      password: 'gafi1234'
    }
  },

  methods: {
    ...mapActions(userStore, [
      'fetchUsers',
      'deleteUser'
    ]),

    toggleVisiblePassword () {
      this.visiblePassword = !this.visiblePassword
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
      this.redirectTo('ManajemenUser')
    }
  }
}