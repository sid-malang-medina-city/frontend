<template>
  <div class="manajemen-spk-non-unit-edit">
    <page-header
      title="Edit SPK Non Unit"
      show-back-icon
      @back="goToManajemenSPKNonUnit"
    />

    <div class="page-content">
      <div class="manajemen-spk-non-unit-edit__wrapper">
        <div class="manajemen-spk-non-unit-edit__input-section input-section">
          <div class="input-section__header">
            <img
              :src="icons.receipt"
              alt=""
              class="input-section__header-icon"
            >
            <div class="input-section__header-text">
              Info General
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label required">
                Vendor
              </div>
              <el-select
                v-model="formData.vendor"
                v-loading="visibleLoading.vendorDropdown"
                placeholder="Pilih vendor"
                class="row__input"
                clearable
              >
                <el-option
                  v-for="vendor in vendors"
                  :key="vendor.id"
                  :label="vendor.nama"
                  :value="vendor.id"
                />
              </el-select>
            </div>
            <div class="rows__row">
              <div class="row__label required">
                Nomor
              </div>
              <el-input
                v-model="formData.nomor"
                placeholder="Masukkan nomor SPK Non Unit"
                class="row__input"
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label required">
                Nama
              </div>
              <el-input
                v-model="formData.nama"
                placeholder="Masukkan nama"
                class="row__input"
              />
            </div>
            <div class="rows__row">
              <div class="row__label required">
                Waktu Pelaksanaan
              </div>
              <el-input
                v-model="formData.waktu_pelaksanaan"
                placeholder="Masukkan waktu pelaksanaan (contoh: 4 hari)"
                class="row__input"
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Cara Pembayaran
              </div>
              <el-input
                v-model="formData.cara_pembayaran"
                :rows="10"
                resize="none"
                placeholder="Masukkan cara pembayaran"
                type="textarea"
                class="row__input"
              />
            </div>
            <div class="rows__row">
              <div class="row__label">
                Syarat
              </div>
              <el-input
                v-model="formData.syarat"
                :rows="10"
                resize="none"
                placeholder="Masukkan syarat"
                type="textarea"
                class="row__input"
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Lampiran
              </div>
              <el-input
                v-model="formData.lampiran"
                :rows="10"
                resize="none"
                placeholder="Masukkan syarat"
                type="textarea"
                class="row__input"
              />
            </div>
            <div class="rows__row">
              <div class="row__label">
                Harga Total
              </div>
              <el-input
                :value="'Rp ' + helpers.convertPriceToRupiah(totalPrice, false)"
                placeholder="Masukkan pekerjaan terlebih dahulu"
                class="row__input"
                disabled
              />
            </div>
          </div>
          <div class="input-section__header input-section__header--flex">
            <div class="input-section__header-left">
              <img
                :src="icons.briefcase"
                alt=""
                class="input-section__header-icon"
              >
              <div class="input-section__header-text">
                Pekerjaan
              </div>
            </div>
            <el-button
              type="primary"
              @click="toggleDrawer()"
            >
              Tambah Pekerjaan
              <el-icon class="el-icon--right">
                <Plus />
              </el-icon>
            </el-button>
          </div>
          <el-empty
            v-if="!formData.pekerjaans.length"
            description="Belum ada pekerjaan"
          />
          <el-table
            v-else
            :data="formData.pekerjaans"
            class="input-section__table table general-table"
            header-row-class-name="general-table__header-gray"
            row-key="id_table"
            stripe
            default-expand-all
          >
            <el-table-column
              prop="nama"
              label="Uraian Pekerjaan"
              min-width="150"
            />
            <el-table-column
              prop="volume"
              label="Volume"
              width="80"
            >
              <template #default="scope">
                {{ helpers.convertToTwoDecimalPoint(scope.row.volume) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="satuan_ukuran"
              label="Satuan" 
              width="80"
            />
            <el-table-column
              prop="harga_satuan"
              label="Harga"
            >
              <template #default="scope">
                {{ helpers.convertPriceToRupiah(scope.row.harga_satuan) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="harga_total"
              label="Jumlah"
            >
              <template #default="scope">
                {{ helpers.convertPriceToRupiah(scope.row.harga_total, true) }}
              </template>
            </el-table-column>
            <el-table-column
              label="Action"
              align="center"
              fixed="right"
            >
              <template #default="scope">
                <div class="table__actions">
                  <el-button
                    v-if="scope.row.id_table-1"
                    :icon="icons.arrowUp"
                    type="primary"
                    class="table__actions-edit"
                    text
                    @click.stop="movePekerjaan(scope.row.id_table-1, 'UP')"
                  />
                  <el-button
                    v-if="scope.row.id_table-1 !== formData.pekerjaans.length-1"
                    :icon="icons.arrowDown"
                    type="primary"
                    class="table__actions-edit"
                    text
                    @click.stop="movePekerjaan(scope.row.id_table-1, 'DOWN')"
                  />
                  <el-button
                    :icon="icons.edit"
                    type="primary"
                    class="table__actions-edit"
                    text
                    @click.stop="toggleDrawer(scope.row)"
                  />
                  <el-button
                    :icon="icons.delete"
                    type="primary"
                    class="table__actions-delete"
                    text
                    @click.stop="deletePekerjaan(scope.$index)"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="manajemen-spk-non-unit-edit__submit-section">
          <el-button
            type="secondary"
            class="manajemen-spk-non-unit-edit__cancel-btn"
            @click="goToManajemenSPKNonUnit"
          >
            Cancel
          </el-button>
          <el-button
            :disabled="!isAllRequiredFieldsFilled"
            :loading="visibleLoading.submitButton"
            type="primary"
            class="manajemen-spk-non-unit-edit__submit-btn"
            @click="submit"
          >
            Simpan SPK
          </el-button>
        </div>
      </div>
    </div>

    <el-drawer
      v-model="visibleDrawer"
      :size="800"
      class="manajemen-spk-non-unit-edit__drawer drawer"
    >
      <template #header>
        <div class="drawer__header">
          {{ !isEditMode ? 'Tambah Pekerjaan' : 'Ubah Pekerjaan' }}
        </div>
      </template>
      <el-scrollbar class="drawer__scrollbar">
        <div class="drawer__form form">
          <div class="form__label required">
            Nama Pekerjaan
          </div>
          <el-input
            v-model="form.nama"
            placeholder="Masukkan nama pekerjaan"
            class="form__input"
          />
          
          <div class="form__input-flex">
            <div class="form__input-flex-wrapper">
              <div class="form__label required">
                Satuan Ukuran
              </div>
              <el-select
                v-model="form.satuan_ukuran"
                placeholder="Pilih satuan ukuran"
                class="form__input"
                clearable
              >
                <el-option
                  v-for="satuanUkuran in satuanUkurans"
                  :key="satuanUkuran"
                  :label="satuanUkuran"
                  :value="satuanUkuran"
                />
              </el-select>
            </div>
            <div class="form__input-flex-wrapper">
              <div class="form__label required">
                Volume
              </div>
              <el-input
                v-model="form.volume"
                placeholder="Masukkan qty"
                class="form__input"
                @input="calculateHargaTotalPekerjaan"
              />
            </div>
          </div>
          
          <div class="form__input-flex">
            <div class="form__input-flex-wrapper">
              <div class="form__label required">
                Harga Satuan
              </div>
              <el-input
                v-model="form.harga_satuan"
                :formatter="(value) => {
                  const parts = value.toString().split(',');
                  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                  return `Rp ${parts.slice(0,2).join(',')}`;
                }"
                :parser="(value) => value.replace(/[^\d,]/g, '')"
                placeholder="Masukkan harga satuan"
                class="form__input"
                @input="calculateHargaTotalPekerjaan"
              />
            </div>
            <div class="form__input-flex-wrapper">
              <div class="form__label required">
                Harga Total
              </div>
              <el-input
                :value="'Rp ' + helpers.convertPriceToRupiah(form.harga_total, false)"
                placeholder="Masukkan harga satuan dan volume terlebih dahulu"
                class="form__input"
                disabled
              />
            </div>
          </div>

          <div class="drawer__actions actions">
            <el-button
              type="secondary"
              class="actions__cancel-btn"
              @click="toggleDrawer()"
            >
              Cancel
            </el-button>
            <el-button
              :disabled="!isAddPekerjaanFormIsFilled"
              type="primary"
              class="actions__submit-btn"
              @click="!isEditMode ? addPekerjaan() : updatePekerjaan()"
            >
              Simpan
            </el-button>
          </div>
        </div>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script src="./js/manajemen-spk-non-unit-edit.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
@import "~/assets/scss/table.scss";

  .manajemen-spk-non-unit-edit {
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

      &__label {
        margin-top: 30px;
        margin-bottom: 8px;
        color: #434343;
        font-family: Plus Jakarta Sans;
        font-size: 12px;
        font-weight: 600;
      }

      &__input {
        // width: 400px;
        width: 100%;

        &--error {
          :deep(.el-input__wrapper) {
            border: 1px solid #FF613A;
          }
        }
      }

      &__header {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 20px;

        &--flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        &-left {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        &-text {
          color: #555;
          font-size: 16px;
          font-weight: 600;
        }
      }

      .table {
        &__actions {
          display: flex;
          justify-content: center;
          gap: 5px;

          &-edit, &-delete {
            padding: 0;
          }
        }

        &__keterangan, &__spesifikasi {
          white-space: pre-wrap;
        }

        &__spesifikasi-label {
          margin-top: 5px;
          font-weight: 600;
        }

        &__nama-pekerjaan {
          padding-left: 30px;
        }
      }
    }

    &__submit-section {
      padding: 20px;
      display: flex;
      justify-content: end;
    }

    .rows {
      display: flex;
      gap: 24px;
      margin-bottom: 32px;

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
          // width: 100%;

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

    .drawer {
      &__header {
        color: #282828;
        font-size: 20px;
        font-weight: 600;
      }

      &__table {
        z-index: 0;
        margin-bottom: 60px;
      }

      &__scrollbar {
        z-index: 1;
      }

      &__table-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }

      &__table-title {
        color: #555;
        font-size: 14px;
        font-weight: 600;
      }

      .form {
        padding-bottom: 50px;

        &__label {
          margin-bottom: 8px;
          color: #434343;
          font-family: Plus Jakarta Sans;
          font-size: 12px;
          font-weight: 600;
        }
  
        &__input {
          width: 100%;
          margin-bottom: 20px;

          &-flex {
            display: flex;
            gap: 10px;

            &-wrapper {
              width: 100%;
            }
          }

          &--error {
            :deep(.el-input__wrapper) {
              border: 1px solid #FF613A;
            }
          }
        }

        &__button {
          width: 100%;
          margin-bottom: 30px;
        }

        &__tag {
          width: 100%;
          // padding: 20px;
          // height: 100px;
          font-size: 14px;

          margin-bottom: 15px;
        }
      }

      .table {
        &__actions {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;

          &-edit, &-delete {
            padding: 0;
            margin: 0;
          }

          &-trigger {
            cursor: pointer;
          }
        }

        &__edit-mode {
          filter: opacity(0.3);
        }
      }

      .actions {
        box-shadow: 0px -3px 3px rgb(110 108 108 / 20%);
        position: fixed;
        bottom: 20px;
        right: 0;
        width: 800px;
        padding-top: 20px;
        background-color: white;
        display: flex;
        justify-content: center;

        // &__cancel-btn {
        //   width: 45%;
        // }

        &__submit-btn {
          // width: 45%;
          width: 150px;
        }
      }
    }
    
    :deep(.el-drawer__header) {
      padding-bottom: 12px;
      margin-bottom: 12px;
      border-bottom: 1px solid #E9E9E9;
    }

    :deep(.el-table__placeholder) {
      display: none;
    }
    
    :deep(.el-table__indent) {
      display: none;
    }

    :deep(.el-date-editor) {
      width: 400px;
    }
    
    .required::after {
      content: "*";
      color: #FF613A;
    }
  }
</style>