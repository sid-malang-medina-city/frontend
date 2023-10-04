<template>
  <div class="manajemen-konsumen-create">
    <page-header
      title="Buat Konsumen Baru"
      show-back-icon
      @back="goToManajemenKonsumen"
    />

    <div class="page-content">
      <div class="manajemen-konsumen-create__wrapper">
        <div class="manajemen-konsumen-create__input-section input-section">
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label required">
                Nama Konsumen
              </div>
              <el-input
                v-model="formData.nama"
                placeholder="Masukkan nama konsumen"
                class="row__input"
              />
            </div>
            <div class="rows__row row">
              <div class="row__label required">
                Email
              </div>
              <el-input
                v-model="formData.email"
                :class="{ 'row__input--error': !!error.email }"
                placeholder="Masukkan email"
                class="row__input"
              />
              <div class="row__email">
                <el-icon
                  v-if="!!error.email"
                  color="#CC4E2E"
                >
                  <WarningFilled />
                </el-icon>
                <div class="row__email-msg">
                  {{ error.email }}
                </div>
              </div>
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label required">
                Nomor Telepon
              </div>
              <el-input
                v-model="formData.no_telp"
                :class="{ 'row__input--error': !!error.no_telp }"
                placeholder="Masukkan nomor telepon"
                class="row__input"
              />
              <div class="row__email">
                <el-icon
                  v-if="!!error.no_telp"
                  color="#CC4E2E"
                >
                  <WarningFilled />
                </el-icon>
                <div class="row__email-msg">
                  {{ error.no_telp }}
                </div>
              </div>
            </div>
            <div class="rows__row row">
              <div class="row__label required">
                Alamat
              </div>
              <el-input
                v-model="formData.alamat"
                placeholder="Masukkan alamat"
                class="row__input"
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label required">
                Unit
              </div>
              <el-select
                v-model="formData.unit_id"
                placeholder="Pilih unit"
                class="row__input"
              >
                <el-option
                  v-for="unit in units"
                  :key="unit.no_kavling"
                  :label="unit.no_kavling"
                  :value="unit.no_kavling"
                />
              </el-select>
            </div>
            <div class="rows__row row">
              <div class="row__label required">
                Marketer
              </div>
              <el-select
                v-model="formData.marketer_id"
                placeholder="Pilih marketer"
                class="row__input"
              >
                <el-option
                  v-for="marketer in marketers"
                  :key="marketer.id"
                  :label="marketer.nama"
                  :value="marketer.id"
                />
              </el-select>
            </div>
          </div>
        </div>
        <div class="manajemen-konsumen-create__submit-section">
          <el-button
            :disabled="!isAllRequiredFieldsFilled"
            type="primary"
            class="manajemen-konsumen-create__submit-btn"
            @click="submit"
          >
            Buat Konsumen
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/manajemen-konsumen-create.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";

  .manajemen-konsumen-create {
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