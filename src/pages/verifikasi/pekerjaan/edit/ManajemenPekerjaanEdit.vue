<template>
  <div class="manajemen-pekerjaan-edit">
    <page-header
      title="Edit Pekerjaan"
      show-back-icon
      @back="goToManajemenPekerjaan"
    />

    <div class="page-content">
      <div class="manajemen-pekerjaan-edit__wrapper">
        <div class="manajemen-pekerjaan-edit__input-section input-section">
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label required">
                Nama Pekerjaan
              </div>
              <el-input
                v-model="formData.nama"
                placeholder="Masukkan nama pekerjaan"
                class="row__input"
              />
            </div>
          </div>
        </div>
        <div class="manajemen-pekerjaan-edit__submit-section">
          <el-button
            type="secondary"
            class="manajemen-pekerjaan-edit__cancel-btn"
            @click="goToManajemenPekerjaan"
          >
            Cancel
          </el-button>
          <el-button
            :disabled="!isAllRequiredFieldsFilled"
            :loading="visibleLoading"
            type="primary"
            class="manajemen-pekerjaan-edit__submit-btn"
            @click="submit"
          >
            Simpan
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/manajemen-pekerjaan-edit.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";

  .manajemen-pekerjaan-edit {
    &__wrapper {
      background: white;
      border-radius: 12px;
      border: 1px solid #EAEAEA;
      background: #FFF;
      box-shadow: 0px 4px 8px 0px rgba(224, 224, 224, 0.20);
    }

    .input-section {
      padding: 20px 20px 32px 20px;
      border-bottom: 1px solid #E9E9E9;
    }

    &__submit-section {
      padding: 20px;
      display: flex;
      justify-content: end;
    }

    &__submit-btn {
      width: 130px;
    }

    .rows {
      display: flex;
      gap: 24px;
      margin-bottom: 16px;

      .row {
        &__label {
          margin-bottom: 8px;
          color: #434343;
          font-family: Plus Jakarta Sans;
          font-size: 12px;
          font-weight: 600;
        }
  
        &__input {
          width: 400px;

          &--error {
            :deep(.el-input__wrapper) {
              border: 1px solid #FF613A;
            }
          }
        }

        &__confirm-password {
          margin-top: 8px;
          display: flex;
          gap: 4px;

          &-msg {
            color: #7B7B7B;
            font-size: 12px;
            font-weight: 400;

            &--success {
              color: #5D9E1F;
            }
          }
        }
        
        &__email, &__password {
          margin-top: 4px;
          display: flex;
          gap: 4px;

          &-msg {
            color: #CC4E2E;
            font-size: 12px;
            font-weight: 400;
          }
        }
      }
    }

    .required::after {
      content: "*";
      color: #FF613A;
    }
  }
</style>