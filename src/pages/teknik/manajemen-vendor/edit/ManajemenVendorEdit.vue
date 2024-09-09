<template>
  <div class="manajemen-vendor-edit">
    <page-header
      title="Ubah Vendor"
      show-back-icon
      @back="goToManajemenVendor"
    />

    <div class="page-content">
      <div class="manajemen-vendor-edit__wrapper">
        <div class="manajemen-vendor-edit__input-section input-section">
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label required">
                Nama Vendor
              </div>
              <el-input
                v-model="formData.nama"
                placeholder="Masukkan nama vendor"
                class="row__input"
              />
            </div>
            <div class="rows__row">
              <div class="row__label required">
                Jabatan
              </div>
              <el-input
                v-model="formData.jabatan"
                placeholder="Masukkan jabatan vendor"
                class="row__input"
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row row">
              <div class="row__label">
                Nama Perusahaan
              </div>
              <el-input
                v-model="formData.nama_perusahaan"
                placeholder="Masukkan nama perusahaan"
                class="row__input"
              />
            </div>
            <div class="rows__row">
              <div class="row__label required">
                Alamat
              </div>
              <el-input
                v-model="formData.alamat"
                :rows="3"
                maxlength="130"
                resize="none"
                placeholder="Masukkan alamat"
                type="textarea"
                class="row__input"
                show-word-limit
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row row">
              <div class="row__label">
                Nomor NIK/NIB
              </div>
              <el-input
                v-model="formData.nomor_ktp"
                placeholder="Masukkan nomor NIK/NIB"
                class="row__input"
              />
            </div>
            <div class="rows__row row">
              <div class="row__label">
                Nama Bank
              </div>
              <el-input
                v-model="formData.rekening_bank"
                placeholder="Masukkan nama bank"
                class="row__input"
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Nomor Rekening Bank
              </div>
              <el-input
                v-model="formData.nomor_rekening"
                placeholder="Masukkan nomor rekening"
                class="row__input"
              />
            </div>
            <div class="rows__row row">
              <div class="row__label">
                Nama Rekening Bank
              </div>
              <el-input
                v-model="formData.nama_rekening"
                placeholder="Masukkan nama rekening bank"
                class="row__input"
              />
            </div>
          </div>
        </div>
        <div class="manajemen-vendor-edit__submit-section">
          <el-button
            type="secondary"
            class="manajemen-vendor-edit__cancel-btn"
            @click="goToManajemenVendor"
          >
            Cancel
          </el-button>
          <el-button
            :disabled="!isAllRequiredFieldsFilled"
            :loading="visibleLoading"
            type="primary"
            class="manajemen-vendor-edit__submit-btn"
            @click="submit"
          >
            Simpan
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/manajemen-vendor-edit.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";

  .manajemen-vendor-edit {
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