<template>
  <div class="manajemen-marketer-edit">
    <page-header
      title="Edit Marketer"
      show-back-icon
      @back="goToManajemenMarketer"
    />

    <div class="page-content">
      <div class="manajemen-marketer-edit__wrapper">
        <div class="manajemen-marketer-edit__input-section input-section">
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label required">
                Nama Marketer
              </div>
              <el-input
                v-model="formData.nama"
                placeholder="Masukkan nama marketer"
                class="row__input"
              />
            </div>
            <div class="rows__row">
              <div class="row__label required">
                Nomor Telepon
              </div>
              <el-input
                v-model="formData.nomor_telepon"
                :class="{ 'row__input--error': !!error.nomor_telepon }"
                placeholder="Masukkan nomor telepon"
                class="row__input"
              />
              <div class="row__email">
                <el-icon
                  v-if="!!error.nomor_telepon"
                  color="#CC4E2E"
                >
                  <WarningFilled />
                </el-icon>
                <div class="row__email-msg">
                  {{ error.nomor_telepon }}
                </div>
              </div>
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label required">
                Status
              </div>
              <el-select
                v-model="formData.status"
                :class="{ 'row__input--error': !!error.status }"
                placeholder="Pilih status"
                class="row__input"
              >
                <el-option
                  v-for="status in statuses"
                  :key="status.code"
                  :label="status.name"
                  :value="status.code"
                />
              </el-select>
            </div>
            <div class="rows__row row">
              <div class="row__label required">
                Nama Bank
              </div>
              <el-input
                v-model="formData.rekening_bank"
                :class="{ 'row__input--error': !!error.rekening_bank }"
                placeholder="Masukkan nama bank"
                class="row__input"
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label required">
                Nomor Rekening Bank
              </div>
              <el-input
                v-model="formData.nomor_rekening"
                :class="{ 'row__input--error': !!error.nomor_rekening }"
                placeholder="Masukkan nomor rekening bank"
                class="row__input"
              />
            </div>
            <div class="rows__row row">
              <div class="row__label required">
                Nama Rekening Bank
              </div>
              <el-input
                v-model="formData.nama_rekening"
                :class="{ 'row__input--error': !!error.nama_rekening }"
                placeholder="Masukkan nama rekening bank"
                class="row__input"
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row row">
              <div class="row__label required">
                NPWP
              </div>
              <el-input
                v-model="formData.npwp"
                placeholder="Masukkan nomor NPWP"
                class="row__input"
              />
            </div>
            <div class="rows__row">
              <div class="row__label required">
                Alamat
              </div>
              <el-input
                v-model="formData.alamat"
                :class="{ 'row__input--error': !!error.alamat }"
                :rows="5"
                resize="none"
                placeholder="Masukkan alamat"
                type="textarea"
                class="row__input"
              />
            </div>
          </div>
        </div>
        <div class="manajemen-marketer-edit__submit-section">
          <el-button
            type="secondary"
            class="manajemen-marketer-edit__cancel-btn"
            @click="goToManajemenMarketer"
          >
            Cancel
          </el-button>
          <el-button
            :disabled="!isAllRequiredFieldsFilled"
            :loading="visibleLoading"
            type="primary"
            class="manajemen-marketer-edit__submit-btn"
            @click="submit"
          >
            Simpan
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/manajemen-marketer-edit.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";

  .manajemen-marketer-edit {
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
