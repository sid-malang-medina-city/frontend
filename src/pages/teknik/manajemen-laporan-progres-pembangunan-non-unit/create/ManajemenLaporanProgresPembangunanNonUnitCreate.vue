<template>
  <div class="manajemen-laporan-progres-pembangunan-non-unit-create">
    <page-header
      title="Buat Laporan Progres Pembangunan Non Unit Baru"
      show-back-icon
      @back="goToManajemenLaporanProgresPembangunanNonUnit"
    />

    <div class="page-content">
      <div class="manajemen-laporan-progres-pembangunan-non-unit-create__wrapper">
        <div class="manajemen-laporan-progres-pembangunan-non-unit-create__input-section input-section">
          <div class="input-section__header">
            <img
              :src="icons.receipt"
              alt=""
              class="input-section__header-icon"
            >
            <div class="input-section__header-text">
              Informasi Utama
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label required">
                SPK Non Unit
              </div>
              <el-select
                v-model="selectedSPKId"
                v-loading="visibleLoading.spkDropdown"
                placeholder="Pilih SPK"
                class="row__input"
                remote-show-suffix
                filterable
                remote
                reserve-keyword
                @change="getSPK"
              >
                <el-option
                  v-for="SPK in SPKs"
                  :key="SPK.id"
                  :label="SPK.nomor"
                  :value="SPK.id"
                />
              </el-select>
            </div>
            <div class="rows__row">
              <div class="row__label required">
                Tanggal
              </div>
              <el-date-picker
                v-model="formData.tanggal"
                :key="keyForMingguPicker"
                :disabled="!isSPKFetched"
                :disabled-date="disabledDate"
                type="date"
                placeholder="Pilih tanggal"
                format="DD-MM-YYYY"
                value-format="YYYY-MM-DD"
                class="row__input"
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label required">
                Status
              </div>
              <el-select
                v-model="formData.status"
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
            <div class="rows__row">
              <div class="row__label required">
                Termin
              </div>
              <el-input
                v-model="formData.termin"
                placeholder="Masukkan termin"
                type="number"
                min="1"
                class="row__input"
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Periode Pekerjaan
              </div>
              <el-date-picker
                v-model="periodeValue"
                v-loading="!isDataFetched"
                :clearable="false"
                type="daterange"
                range-separator="-"
                start-placeholder="Tanggal awal"
                end-placeholder="Tanggal akhir"
                format="DD-MM-YYYY"
                value-format="YYYY-MM-DD"
                @change="handleDateRangeChange"
              />
            </div>
            <div class="rows__row">
              <div class="row__label">
                Keterangan
              </div>
              <el-input
                v-model="formData.keterangan"
                :rows="3"
                resize="none"
                placeholder="Masukkan keterangan"
                type="textarea"
                class="row__input"
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
                Tabel Progres Pembangunan Non Unit
              </div>
            </div>
          </div>
          <!-- <el-empty
            v-if="!formData.jenis_pekerjaans.length"
            description="Pilih SPK terlebih dahulu"
          /> -->
          <el-table
            v-loading="visibleLoading.table"
            :data="formData.pekerjaans"
            class="input-section__table table general-table"
            header-row-class-name="general-table__header-gray"
            row-key="id_table"
            empty-text="Pilih SPK terlebih dahulu"
            stripe
            default-expand-all
          >
            <el-table-column
              prop="nama"
              label="Nama Pekerjaan" 
              fixed="left"
              width="200"
            >
              <template #default="scope">
                <div class="table__nama-pekerjaan">
                  {{ scope.row.sequence }}. {{ scope.row.nama }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="satuan_ukuran"
              label="Satuan Ukuran"
              width="80"
            />
            <el-table-column
              prop="volume"
              label="Volume" 
              width="80"
            />
            <el-table-column
              prop="harga_satuan"
              label="Harga Satuan"
              min-width="150"
            >
              <template #default="scope">
                <el-tooltip
                  :content="helpers.convertPriceToRupiah(scope.row.harga_satuan, true, false, true)"
                  class="box-item"
                  effect="dark"
                  placement="top"
                >
                {{ helpers.convertPriceToRupiah(scope.row.harga_satuan) }}
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="harga_total"
              label="Harga Total"
              min-width="150"
            >
              <template #default="scope">
                <el-tooltip
                  :content="helpers.convertPriceToRupiah(scope.row.harga_total, true, false, true)"
                  class="box-item"
                  effect="dark"
                  placement="top"
                >
                  {{ helpers.convertPriceToRupiah(scope.row.harga_total) }}
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="persentase_pekerjaan"
              label="Persentase Pekerjaan"
              min-width="150"
            >
              <template #default="scope">
                <el-tooltip
                  :content="helpers.convertDecimalToPercentage(scope.row.persentase_pekerjaan, false, true)"
                  class="box-item"
                  effect="dark"
                  placement="top"
                >
                  {{ helpers.convertDecimalToPercentage(scope.row.persentase_pekerjaan, false) }}
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="harga_minggu_lalu"
              label="Harga minggu lalu"
              min-width="150"
            >
              <template #default="scope">
                <el-tooltip
                  :content="helpers.convertPriceToRupiah(scope.row.harga_minggu_lalu, true, false, true)"
                  class="box-item"
                  effect="dark"
                  placement="top"
                >
                  {{ helpers.convertPriceToRupiah(scope.row.harga_minggu_lalu, true, false) }}
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="persentase_minggu_lalu"
              label="Progres minggu lalu"
              min-width="150"
            >
              <template #default="scope">
                <el-tooltip
                  :content="helpers.convertDecimalToPercentage(scope.row.persentase_minggu_lalu, false, true)"
                  class="box-item"
                  effect="dark"
                  placement="top"
                >
                  {{ helpers.convertDecimalToPercentage(scope.row.persentase_minggu_lalu, false) }}
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="harga_progres_total"
              label="Harga Sampai Minggu Ini"
              min-width="150"
            >
              <template #default="scope">
                <el-tooltip
                  :content="helpers.convertPriceToRupiah(scope.row.harga_progres_total, true, false, true)"
                  class="box-item"
                  effect="dark"
                  placement="top"
                >
                  {{ helpers.convertPriceToRupiah(scope.row.harga_progres_total, true, false) }}
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="persentase_progres_total"
              label="Progres Sampai Minggu Ini"
              min-width="150"
            >
              <template #default="scope">
                <el-tooltip
                  :content="helpers.convertDecimalToPercentage(scope.row.persentase_progres_total, false, true)"
                  class="box-item"
                  effect="dark"
                  placement="top"
                >
                  {{ helpers.convertDecimalToPercentage(scope.row.persentase_progres_total, false) }}
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              label="Harga Minggu Ini"
              min-width="150"
              fixed="right"
            >
              <template #default="scope">
                <el-input
                  v-if="!false"
                  v-model="scope.row.harga_minggu_ini"
                  :disabled="scope.row.persentase_progres_sebelumnya >= 99.9"
                  :formatter="(value) => {
                    const parts = value.toString().split(',');
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                    return `Rp ${parts.slice(0,2).join(',')}`;
                  }"
                  :parser="(value) => value.replace(/[^\d,]/g, '')"
                  :class="{ 'table__input--error': !!scope.row.error }"
                  class="table__input"
                  @input="handleHargaMingguIniChange(scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="persentase_progres_minggu_ini"
              label="Progres minggu ini"
              min-width="150"
              fixed="right"
            >
              <template #default="scope">
                <el-input
                  v-if="!false"
                  v-model="scope.row.persentase_progres_minggu_ini"
                  :disabled="scope.row.persentase_progres_sebelumnya >= 99.9"
                  :class="{ 'table__input--error': !!scope.row.error }"
                  :max="100.1"
                  class="table__input"
                  type="number"
                  @input="handlePersentaseMingguIniChange(scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="manajemen-laporan-progres-pembangunan-non-unit-create__submit-section">
          <el-button
            :disabled="isSubmitButtonDisabled"
            :loading="visibleLoading.submitButton"
            type="primary"
            class="manajemen-laporan-progres-pembangunan-non-unit-create__submit-btn"
            @click="submit"
          >
            Buat Laporan Progres Pembangunan Non Unit
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/manajemen-laporan-progres-pembangunan-non-unit-create.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
@import "~/assets/scss/table.scss";

  .manajemen-laporan-progres-pembangunan-non-unit-create {
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

      &__import-template {
        border-color: #E7B10A;
        background-color: #E7B10A;
      }

      .table {
        &__input {
          &--error {
            :deep(.el-input__wrapper) {
              border: 1px solid #FF613A;
            }
          }
        }

        &__actions {
          display: flex;
          justify-content: center;
          gap: 5px;

          &-edit, &-delete {
            padding: 0;
          }
        }

        // &__nama-pekerjaan {
        //   padding-left: 30px;
        // }
      }
    }

    &__submit-section {
      padding: 20px;
      display: flex;
      justify-content: end;
    }

    // &__submit-btn {
    //   width: 150px;
    // }

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

    .dialog {
      &__label {
        color: #434343;
        font-family: Plus Jakarta Sans;
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 8px;
      }

      &__input {
        width: 100%;
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
    
    .required::after {
      content: "*";
      color: #FF613A;
    }

    :deep(.el-date-editor--date) {
      width: 400px;
    }
    
    :deep(.el-date-editor--daterange) {
      width: 380px;
    }
  }
</style>