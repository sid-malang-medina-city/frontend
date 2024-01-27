<template>
  <div class="manajemen-template-spk-edit">
    <page-header
      title="Edit Template SPK"
      show-back-icon
      @back="goToManajemenTemplateSPK"
    />

    <div class="page-content">
      <div class="manajemen-template-spk-edit__wrapper">
        <div class="manajemen-template-spk-edit__input-section input-section">
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
                Nama Template
              </div>
              <el-input
                v-model="formData.nama"
                placeholder="Masukkan nama template"
                class="row__input"
              />
            </div>
            <div class="rows__row">
              <div class="row__label required">
                Tipe Unit
              </div>
              <el-select
                v-model="formData.tipe_unit"
                placeholder="Pilih tipe unit"
                class="row__input"
                clearable
              >
                <el-option
                  v-for="tipe_unit in tipeUnits"
                  :key="tipe_unit.id"
                  :label="tipe_unit.nama"
                  :value="tipe_unit.id"
                />
              </el-select>
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
            v-if="!formData.jenis_pekerjaans.length"
            description="Belum ada pekerjaan"
          />
          <el-table
            v-else
            :data="formData.jenis_pekerjaans"
            class="input-section__table table general-table"
            header-row-class-name="general-table__header-gray"
            row-key="id"
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
                {{ scope.row.nama }}
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
            >
              <template #default="scope">
                {{ helpers.convertPriceToRupiah(scope.row.harga_satuan) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="harga_total"
              label="Harga Total"
            >
              <template #default="scope">
                {{ helpers.convertPriceToRupiah(scope.row.harga_total, true, scope.row.hasOwnProperty('actions')) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="persentase_pekerjaan"
              label="Persentase Pekerjaan"
            >
              <template #default="scope">
                {{ helpers.convertDecimalToPercentage(scope.row.persentase_pekerjaan, scope.row.hasOwnProperty('actions')) }}
              </template>
            </el-table-column>
            <el-table-column
              label="Action"
              width="150"
              align="center"
              fixed="right"
            >
              <template #default="scope">
                <div class="table__actions">
                  <el-button
                    v-if="scope.row.actions"
                    :icon="icons.edit"
                    type="primary"
                    class="table__actions-edit"
                    text
                    @click.stop="toggleDrawer(scope.row.nama)"
                  />
                  <el-button
                    v-if="scope.row.actions"
                    :icon="icons.delete"
                    type="primary"
                    class="table__actions-delete"
                    text
                    @click.stop="deleteJenisPekerjaan(scope.row.nama)"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="manajemen-template-spk-edit__submit-section">
          <el-button
            type="secondary"
            class="manajemen-template-spk-edit__cancel-btn"
            @click="goToManajemenTemplateSPK"
          >
            Cancel
          </el-button>
          <el-button
            :disabled="!isAllRequiredFieldsFilled"
            :loading="visibleLoading"
            type="primary"
            class="manajemen-template-spk-edit__submit-btn"
            @click="submit"
          >
            Simpan Template SPK
          </el-button>
        </div>
      </div>
    </div>

    <el-drawer
      v-model="visibleDrawer"
      :size="800"
      class="manajemen-template-spk-edit__drawer drawer"
    >
      <template #header>
        <div class="drawer__header">
          {{ !isEditMode ? 'Tambah Pekerjaan' : 'Ubah Pekerjaan' }}
        </div>
      </template>
      <el-scrollbar class="drawer__scrollbar">
        <div class="drawer__form form">
          <div class="form__label required">
            Jenis Pekerjaan
          </div>
          <el-input
            v-model="form.jenisPekerjaan"
            placeholder="Masukkan jenis pekerjaan"
            class="form__input"
          />
          
          <div class="form__input-flex">
            <div class="form__input-flex-wrapper">
              <div class="form__label required">
                Nama Pekerjaan
              </div>
              <el-input
                v-model="namaPekerjaan"
                placeholder="Masukkan nama pekerjaan"
                class="form__input"
              />
            </div>
            <div class="form__input-flex-wrapper">
              <div class="form__label required">
                Satuan Ukuran
              </div>
              <el-select
                v-model="satuanUkuran"
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
          </div>
          
          <div class="form__input-flex">
            <div class="form__input-flex-wrapper">
              <div class="form__label required">
                Volume
              </div>
              <el-input
                v-model="volume"
                placeholder="Masukkan volume"
                class="form__input"
                type="number"
              />
            </div>
            <div class="form__input-flex-wrapper">
              <div class="form__label required">
                Harga Satuan
              </div>
              <el-input
                v-model="hargaSatuan"
                :formatter="(value) => {
                  const parts = value.toString().split(',');
                  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                  return `Rp ${parts.slice(0,2).join(',')}`;
                }"
                :parser="(value) => value.replace(/[^\d,]/g, '')"
                placeholder="Masukkan harga satuan"
                class="form__input"
              />
            </div>
          </div>
  
          <el-button
            type="primary"
            class="form__button"
            @click="addPekerjaan"
          >
            Tambah Pekerjaan
          </el-button>

          <div class="drawer__table-header">
            <div class="drawer__table-title">
              List Pekerjaan
            </div>
            <el-button
              :disabled="!form.pekerjaans.length"
              type="danger"
              class="drawer__delete-all-btn"
              link
              @click="deleteAllPekerjaan"
            >
              Hapus Semua
            </el-button>
          </div>
  
          <el-tag class="form__tag" size="large">
            <div>
              Persentase Pekerjaan akan terkalkulasi setelah menambahkan jenis dan detail pekerjaan ke dalam tabel utama
            </div>
          </el-tag>
  
          <el-table
            :data="form.pekerjaans"
            class="drawer__table table general-table"
            header-row-class-name="general-table__header-gray"
            stripe
          >
            <el-table-column
              prop="nama"
              label="Nama Pekerjaan"
              min-width="150"
            />
            <el-table-column
              prop="satuan_ukuran"
              label="Satuan Ukuran"
              min-width="50"
            />
            <el-table-column
              prop="volume"
              label="Volume"
              min-width="50"
            />
            <el-table-column
              prop="harga_satuan"
              label="Harga Satuan"
            >
              <template #default="scope">
                {{ helpers.convertPriceToRupiah(scope.row.harga_satuan) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="harga_total"
              label="Harga Total"
            >
              <template #default="scope">
                {{ helpers.convertPriceToRupiah(scope.row.harga_total) }}
              </template>
            </el-table-column>
            <el-table-column
              label="Action"
              width="90"
              align="center"
              fixed="right"
            >
              <template #default="scope">
                <div class="table__actions">
                  <el-button
                    :icon="icons.delete"
                    type="primary"
                    class="table__actions-delete"
                    text
                    @click.stop="deletePekerjaan(scope.row.nama)"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>
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
              :loading="visibleLoading"
              type="primary"
              class="actions__submit-btn"
              @click="!isEditMode ? addJenisPekerjaan() : updateJenisPekerjaan()"
            >
              Simpan
            </el-button>
          </div>
        </div>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script src="./js/manajemen-template-spk-edit.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
@import "~/assets/scss/table.scss";

  .manajemen-template-spk-edit {
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

      .table {
        &__actions {
          display: flex;
          justify-content: center;
          gap: 5px;

          &-edit, &-delete {
            padding: 0;
          }
        }
      }
    }

    &__submit-section {
      padding: 20px;
      display: flex;
      justify-content: end;
    }

    &__submit-btn {
      width: 150px;
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
    
    .required::after {
      content: "*";
      color: #FF613A;
    }
  }
</style>