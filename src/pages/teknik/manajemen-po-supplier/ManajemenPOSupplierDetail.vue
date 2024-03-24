<template>
  <div class="manajemen-po-supplier-detail">
    <page-header
      title="Detail PO Supplier"
      show-back-icon
      @back="goToManajemenPOSupplier"
    />

    <div class="page-content">
      <div class="manajemen-po-supplier-detail__wrapper">
        <div class="manajemen-po-supplier-detail__header header">
          <div class="header__title">
            <div class="header__title-po-supplier">
              PO Supplier
            </div>
            <div class="header__title-name">
              {{ POSupplier.nomor }}
            </div>
          </div>
          <div class="header__actions actions">
            <el-button
              v-if="hasAccess('UPDATE_PO_SUPPLIER')"
              type="primary"
              class="actions__edit-btn"
              plain
              @click="goToEditPage"
            >
              Edit PO Supplier
              <el-icon class="el-icon--right">
                <EditPen />
              </el-icon>
            </el-button>
            <el-dropdown trigger="click">
              <el-button
                :icon="icons.moreFilled"
                class="actions__delete-btn"
                plain
              >
              </el-button>
              <template #dropdown>
                <el-dropdown-menu class="actions__dropdown-menu">
                  <div class="actions__generate-wrapper">
                    <el-icon class="actions__generate-icon">
                      <Stamp />
                    </el-icon>
                    <div class="actions__generate">
                      Generate
                    </div>
                  </div>
                  <el-dropdown-item @click="generatePOSupplierPDF">PDF</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>

        <div class="manajemen-po-supplier-detail__content content">
          <div class="content__informasi-umum-wrapper">
            <div class="content__header">
              <img
                :src="icons.receipt"
                alt="Image Icon"
              />
              <div class="content__header-title">
                Info General
              </div>
            </div>
  
            <div class="content__informasi-utama informasi-utama">
              <div class="informasi-utama__column column">
                <div class="column__label">
                  No PO Supplier
                </div>
                <div class="column__value">
                  {{ POSupplier.nomor }}
                </div>
              </div>
              <div class="informasi-utama__column column">
                <div class="column__label">
                  Tanggal
                </div>
                <div class="column__value">
                  {{ POSupplier.tanggal }}
                </div>
              </div>
            </div>
          </div>
          
          <div class="content__informasi-umum-wrapper">
            <div class="content__header">
              <img
                :src="icons.receipt"
                alt="Image Icon"
              />
              <div class="content__header-title">
                Info Supplier
              </div>
            </div>
  
            <div class="content__rows rows last-row">
              <div class="rows__row">
                <div class="row__label required">
                  Nama Penanggung Jawab
                </div>
                <div class="row__value">
                  <u
                    class="row__link"
                    @click="goToSupplierDetailPage"
                  >
                    {{ helpers.convertEmptyValueWithDash(POSupplier.supplier_nama_penanggung_jawab) }}
                  </u>
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Nama Perusahaan
                </div>
                <div class="row__value">
                  <u
                    class="row__link"
                    @click="goToSupplierDetailPage"
                  >
                    {{ helpers.convertEmptyValueWithDash(POSupplier.supplier_nama_perusahaan) }}
                  </u>
                </div>
              </div>
            </div>
          </div>          
          
          <div class="content__informasi-umum-wrapper">
            <div class="content__header">
              <img
                :src="icons.receipt"
                alt="Image Icon"
              />
              <div class="content__header-title">
                Info Biaya dan Harga
              </div>
            </div>
  
            <div class="content__rows rows">
              <div class="rows__row">
                <div class="row__label required">
                  Harga Sub Total
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(POSupplier.harga_total) }}
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  PPN Masukan
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(POSupplier.harga_total_ppn) }}
                </div>
              </div>
            </div>
            
            <div class="content__rows rows">
              <div class="rows__row">
                <div class="row__label required">
                  Biaya Kirim
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(POSupplier.biaya_kirim) }}
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Biaya Lainnya
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(POSupplier.biaya_lainnya) }}
                </div>
              </div>
            </div>
            
            <div class="content__rows rows last-row">
              <div class="rows__row">
                <div class="row__label required">
                  Harga Total
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(POSupplier.harga_final) }}
                </div>
              </div>
            </div>
          </div>

          <div class="content__informasi-umum-wrapper">
            <div class="content__header">
              <img
                :src="icons.receipt"
                alt="Image Icon"
              />
              <div class="content__header-title">
                Info Catatan
              </div>
            </div>
  
            <div class="content__rows rows last-row rows--no-flex">
              <div class="row__label">Catatan Tambahan</div>
              <div class="row__value row__value--pre-line">{{ helpers.convertPriceToRupiah(POSupplier.catatan) }}</div>
            </div>
          </div>  

          <div class="content__informasi-pendukung-wrapper informasi-pendukung-wrapper--top">
            <div class="content__header">
              <img
                :src="icons.briefcase"
                alt="Image Icon"
              />
              <div class="content__header-title">
                Barang
              </div>
            </div>
  
            <div class="content__rows rows last-row">
              <el-table
                v-loading="!isDataFetched"
                :data="POSupplier.barangs"
                class="input-section__table table general-table"
                header-row-class-name="general-table__header-gray"
                row-key="id_table"
                stripe
                default-expand-all
              >
              <el-table-column
                prop="nama"
                label="Barang"
                width="150"
              />
              <el-table-column
                prop="keterangan"
                label="Keterangan"
                width="300"
              >
                <template #default="scope">
                  <div class="table__keterangan">
                    {{ scope.row.keterangan }}
                  </div>
                  <div class="table__spesifikasi">
                    {{ scope.row.spesifikasi }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="volume"
                label="Qty"
                width="80"
              >
                <template #default="scope">
                  {{ helpers.convertToTwoDecimalPoint(scope.row.volume) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="satuan"
                label="Satuan" 
                width="80"
              />
              <el-table-column
                prop="harga"
                label="Harga Satuan (Rp)"
              >
                <template #default="scope">
                  {{ helpers.convertPriceToRupiah(scope.row.harga) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="harga_total"
                label="Total"
              >
                <template #default="scope">
                  {{ helpers.convertPriceToRupiah(scope.row.harga_total, true) }}
                </template>
              </el-table-column>
              </el-table>
            </div>
          </div>
        </div>

        <div class="manajemen-po-supplier-detail__author-info author-info">
          <div class="author-info__label">
            Dibuat oleh
          </div>
          <div class="author-info__value">
            <div class="author-info__author">
              {{ POSupplier.created_by_name }}
            </div>
            <div class="author-info__date-time">
              {{ helpers.convertDateTimeZoneToDateTimeString(POSupplier.created_at) }}
            </div>
          </div>
          <div class="author-info__label">
            Dimodifikasi oleh
          </div>
          <div class="author-info__value">
            <div class="author-info__author">
              {{ POSupplier.updated_by_name }}
            </div>
            <div class="author-info__date-time">
              {{ helpers.convertDateTimeZoneToDateTimeString(POSupplier.updated_at) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/manajemen-po-supplier-detail.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
@import "~/assets/scss/table.scss";

  .manajemen-po-supplier-detail {
    &__wrapper {
      background-color: white;
      border: 1px solid #EAEAEA;
      box-shadow: 0px 4px 8px 0px rgba(224, 224, 224, 0.20);
      border-radius: 12px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;

      &__actions {
        display: flex;
        gap: 12px;
      }

      &__title {
        color: #434343;
        font-family: Plus Jakarta Sans;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        display: flex;
        gap: 6px;

        &-name {
          color: #61876E;
        }
      }
    }

    .content {
      border-top: 1px solid #E9E9E9;
      border-bottom: 1px solid var(--neutral-gray-100, #E9E9E9);

      &__header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 24px;

        &-title {
          color: #555;
          font-size: 16px;
          font-weight: 600;
        }
      }

      &__informasi-pendukung-wrapper, &__informasi-umum-content {
        padding: 20px;
      }

      &__informasi-utama-wrapper {
        padding: 20px 20px 0px 20px;
      }

      &__informasi-umum-wrapper {
        padding: 20px 20px 0px 20px;
        border-bottom: 1px solid var(--neutral-gray-100, #E9E9E9);
      }

      &__informasi-pendukung-wrapper {
        border-top: 1px solid #E9E9E9;
      }

      .informasi-pendukung-wrapper--top {
        border-top: none;
        border-bottom: 1px solid #E9E9E9;
      }

      .informasi-umum-keterangan {
        margin-top: 16px;
        padding: 16px 22px;
        border: 1px solid #E9E9E9;
        background: #F5F5F5;
        border-radius: 8px;

        &__header {
          margin-bottom: 4px;
          color: #434343;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          gap: 4px;
          align-items: center;
        }

        &__content {
          color: #696969;
          font-size: 14px;
          font-weight: 400;
        }
      }

      .informasi-umum {
        display: flex;
        justify-content: space-between;
        background-color: #F5F5F5;
        padding: 16px;
        border-radius: 8px;
        border-left: 6px solid #C4C4C4;

        .column {

          &__label {
            margin-bottom: 8px;
            color: #434343;
            font-size: 14px;
            font-weight: 400;
          }
  
          &__value {
            color: #434343;
            font-size: 22px;
            font-weight: 600;
          }
        }
      }

      .informasi-utama {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        .column {
          &__label {
            margin-bottom: 8px;
            color: #434343;
            font-size: 14px;
            font-weight: 400;
          }
  
          &__value {
            color: #434343;
            font-size: 22px;
            font-weight: 600;
          }
        }
      }

      .rows {
        display: flex;
        gap: 24px;
        margin-bottom: 16px;

        &--no-flex {
          display: block;
        }

        .row {
          &__label {
            margin-bottom: 8px;
            color: #434343;
            font-family: Plus Jakarta Sans;
            font-size: 12px;
            font-weight: 600;
            width: 400px;
          }

          &__link {
            cursor: pointer;
            width: fit-content;
          }
    
          &__value {
            color: #696969;
            font-size: 14px;
            font-weight: 400;
            width: 400px;

            &--pre-line {
              white-space: pre-line;
            }

            &--flex {
              display: flex;
              align-items: flex-end;
              gap: 5px;
            }

            &--flex-start {
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              gap: 8px;
            }
          }

          &__fasilitas {
            padding: 4px 12px;
            border-radius: 80px;
            border: 1px solid var(--neutral-gray-200, #D9D9D9);
            background: var(--neutral-gray-100, #E9E9E9);
            box-shadow: 0px 4px 8px 0px rgba(224, 224, 224, 0.20);
          }
        }
      }

      .checkbox-wrapper {
        display: flex;
        gap: 24px;
        padding: 20px;
        flex-wrap: wrap;

        &__title {
          color: #434343;
          font-size: 12px;
          font-weight: 600;
        }

        .card {
          width: 270px;

          &__checkbox {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 8px;
            padding: 10px;
          }

          &__info {
            color: #696969;
            font-size: 14px;
            font-weight: 400;
          }
        }
      }

      .image-upload {
        display: flex;
        gap: 24px;
        padding: 20px;
        flex-wrap: wrap;

        :deep(.el-upload) {
          height: 100%;
          cursor: default;
        }

        &__container {
          width: 270px;
        }

        &__wrapper {
          :deep(.el-upload--picture-card) {
            width: 270px;
            height: 250px;
          }
          
          :deep(.el-upload-list__item) {
            width: 270px;
            height: 250px;
            display: flex;
            justify-content: center;
          }
        }

        .image-content {
          width: 270px;
          height: 250px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          margin-bottom: 8px;

          &--bg-success {
            background: #D4E6D5 !important;
          }
          
          &__img {
            width: 270px;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
            transition: 0.3s;

            &--hovered {
              filter: brightness(50%);
            }
          }

          .item-actions {
            display: flex;
            gap: 8px;
            cursor: pointer;
            position: absolute;

            &__wrapper {
              width: 36px;
              height: 36px;
              border-radius: 50%;
              background-color: white;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-sizing: border-box;
          width: 270px;
          height: 250px;
          padding: 24px;
          border-radius: 4px;
          border: 1px dashed #C4C4C4;
          background: #FAFAFA;
          margin-bottom: 8px;

          &__upload-image-icon {
            display: block;
            margin-bottom: 16px;
            margin-left: auto;
            margin-right: auto;
          }
        }

        &__empty-state-wrapper {
          margin-bottom: 8px;
        }
      }

      &__name-label {
        color: #434343;
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 8px;
      }

      &__name {
        color: #434343;
        font-size: 18px;
        font-weight: 600;
      }

      &__row {
        display: flex;
        gap: 40px;
        margin-bottom: 16px;
      }

      &__data {
        width: 400px;
      }

      &__label {
        color: #434343;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 8px;
      }

      &__value {
        color: #696969;
        font-size: 14px;
        font-weight: 400;
      }

      &__value-password {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #696969;
        font-size: 14px;
        font-weight: 400;
      }

      &__password-icon {
        cursor: pointer;
      }
    }

    &__preview-image {
      width: 50%;
      display: block;
      margin: auto;
    }

    .author-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;

      &__label {
        color: #434343;
        font-size: 12px;
        font-weight: 600;
      }

      &__value {
        color: #696969;
        font-size: 14px;
        font-weight: 400;
      }
    }

    .table {
      &__nama-pekerjaan {
        padding-left: 30px;
      }
    }

    :deep(.el-table__placeholder) {
      display: none;
    }
    
    :deep(.el-table__indent) {
      display: none;
    }
  }

  .actions {
    &__trigger {
      cursor: pointer;
    }

    &__dropdown-menu {
      padding: 0;
    }

    &__generate-wrapper, &__preview-wrapper, &__other-wrapper {
      display: flex;
      padding: 6px 12px;
      align-items: center;
      gap: 6px;
      align-self: stretch;
      border-bottom: 0.5px solid #E9E9E9;
      background: #FAFAFA;
      color: var(--Neutral-Gray-400, #9D9D9D);
      font-size: 11px;
      font-weight: 600;
      line-height: 20px;
    }
  }
</style>