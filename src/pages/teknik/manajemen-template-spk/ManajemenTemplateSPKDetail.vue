<template>
  <div class="manajemen-template-spk-detail">
    <page-header
      title="Detail Template SPK"
      show-back-icon
      @back="goToManajemenTemplateSPK"
    />

    <div class="page-content">
      <div class="manajemen-template-spk-detail__wrapper">
        <div class="manajemen-template-spk-detail__header header">
          <div class="header__title">
            <div class="header__title-template-spk">
              Template SPK
            </div>
            <div class="header__title-name">
              {{ templateSPK.nama }}
            </div>
          </div>
          <div class="header__actions actions">
            <el-button
              v-if="hasAccess('UPDATE_TEMPLATE_SPK')"
              type="primary"
              class="actions__edit-btn"
              plain
              @click="goToEditPage"
            >
              Edit Template SPK
              <el-icon class="el-icon--right">
                <EditPen />
              </el-icon>
            </el-button>
            <el-button
              v-if="hasAccess('DELETE_TEMPLATE_SPK') || true"
              :icon="icons.delete"
              type="danger"
              class="actions__delete-btn"
              plain
              @click="openModalConfirmation"
            >
            </el-button>
          </div>
        </div>

        <div class="manajemen-template-spk-detail__content content">
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
  
            <div class="content__rows rows last-row">
              <div class="rows__row">
                <div class="row__label required">
                  Nama Template
                </div>
                <div class="row__value">
                  {{ helpers.convertEmptyValueWithDash(templateSPK.nama) }}
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Tipe Unit
                </div>
                <div class="row__value">
                  {{ helpers.convertEmptyValueWithDash(templateSPK.unit_tipe_nama) }}
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="content__informasi-umum-wrapper">
            <div class="content__informasi-umum-content">
              <div class="content__informasi-umum informasi-umum">
                <div class="informasi-umum__column column">
                  <div class="column__label">
                    ID
                  </div>
                  <div class="column__value">
                    {{ templateSPK.id }}
                  </div>
                </div>
                <div class="informasi-umum__column column">
                  <div class="column__label">
                    Status Verifikasi
                  </div>
                  <div class="column__value">
                    <status-badge
                      :text="verificationStatuses[templateSPK.status_verifikasi] ? verificationStatuses[templateSPK.status_verifikasi].name: ''"
                      :color="verificationStatuses[templateSPK.status_verifikasi] ? verificationStatuses[templateSPK.status_verifikasi].color: ''"
                      type="detail"
                    />
                  </div>
                </div>
                <div class="informasi-umum__column column">
                  <div class="column__label">
                    Status Pembayaran
                  </div>
                  <div class="column__value">
                    <status-badge
                      :text="paymentStatuses[templateSPK.status_pembayaran] ? paymentStatuses[templateSPK.status_pembayaran].name: ''"
                      :color="paymentStatuses[templateSPK.status_pembayaran] ? paymentStatuses[templateSPK.status_pembayaran].color: ''"
                      type="detail"
                    />
                  </div>
                </div>
              </div>
              <div
                v-if="!!templateSPK.keterangan"
                class="content__informasi-umum-keterangan informasi-umum-keterangan"
              >
                <div class="informasi-umum-keterangan__header">
                  <img
                    :src="icons.megaphone"
                    alt=""
                  >
                  Keterangan
                </div>
                <div class="informasi-umum-keterangan__content">
                  {{ templateSPK.keterangan }}
                </div>
              </div>
            </div>
          </div> -->

          <div class="content__informasi-pendukung-wrapper informasi-pendukung-wrapper--top">
            <div class="content__header">
              <img
                :src="icons.briefcase"
                alt="Image Icon"
              />
              <div class="content__header-title">
                Pekerjaan
              </div>
            </div>
  
            <!-- <div class="content__rows rows">
              <div class="rows__row">
                <div class="row__label required">
                  Nama Konsumen
                </div>
                <div class="row__value">
                  <u
                    class="row__link"
                    @click="goToKonsumenDetailPage"
                  >
                    {{ helpers.convertEmptyValueWithDash(templateSPK.konsumen_nama) }}
                  </u>
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Tanggal Lahir
                </div>
                <div class="row__value">
                  {{ helpers.convertEmptyValueWithDash(templateSPK.tanggal_lahir) }}
                </div>
              </div>
            </div>
            
            <div class="content__rows rows">
              <div class="rows__row">
                <div class="row__label required">
                  Provinsi
                </div>
                <div class="row__value">
                  {{ helpers.convertEmptyValueWithDash(templateSPK.provinsi?.name) }}
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Kabupaten/Kota
                </div>
                <div class="row__value">
                  {{ helpers.convertEmptyValueWithDash(templateSPK.kota?.name) }}
                </div>
              </div>
            </div>
            
            <div class="content__rows rows">
              <div class="rows__row">
                <div class="row__label required">
                  Pekerjaan
                </div>
                <div class="row__value">
                  {{ helpers.convertEmptyValueWithDash(templateSPK.pekerjaan?.nama) }}
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Gaji Per Bulan
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(templateSPK.gaji_per_bulan) }}
                </div>
              </div>
            </div> -->

            <div class="content__rows rows last-row">
              <!-- <div class="rows__row">
                <div class="row__label required">
                  Alasan
                </div>
                <div class="row__value">
                  {{ !templateSPK.alasans?.length ? '-' : getAlasansRepresentation(templateSPK.alasans) }}
                </div>
              </div> -->
              <el-table
                v-loading="!isDataFetched"
                :data="templateSPK.jenis_pekerjaans"
                class="input-section__table table general-table"
                header-row-class-name="general-table__header-gray"
                row-key="id_table"
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
                  <div
                    v-if="!scope.row.hasOwnProperty('actions')"
                    class="table__nama-pekerjaan"
                  >
                    {{ scope.row.sequence }}. {{ scope.row.nama }}
                  </div>
                  <template v-else>
                    {{ String.fromCharCode(64 + scope.row.sequence) }}. {{ scope.row.nama }}
                  </template>
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
                    <el-tooltip
                      :content="helpers.convertPriceToRupiah(scope.row.harga_satuan, true, scope.row.hasOwnProperty('actions'), true)"
                      class="box-item"
                      effect="dark"
                      placement="top"
                    >
                      {{ helpers.convertPriceToRupiah(scope.row.harga_satuan, true, scope.row.hasOwnProperty('actions')) }}
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="harga_total"
                  label="Harga Total"
                >
                  <template #default="scope">
                    <el-tooltip
                      :content="helpers.convertPriceToRupiah(scope.row.harga_total, true, scope.row.hasOwnProperty('actions'), true)"
                      class="box-item"
                      effect="dark"
                      placement="top"
                    >
                      {{ helpers.convertPriceToRupiah(scope.row.harga_total, true, scope.row.hasOwnProperty('actions')) }}
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="persentase_pekerjaan"
                  label="Persentase Pekerjaan"
                >
                  <template #default="scope">
                    <el-tooltip
                      :content="helpers.convertDecimalToPercentage(scope.row.persentase_pekerjaan, scope.row.hasOwnProperty('actions'), true)"
                      class="box-item"
                      effect="dark"
                      placement="top"
                    >
                      {{ helpers.convertDecimalToPercentage(scope.row.persentase_pekerjaan, scope.row.hasOwnProperty('actions')) }}
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>

        <div class="manajemen-template-spk-detail__author-info author-info">
          <div class="author-info__label">
            Dibuat oleh
          </div>
          <div class="author-info__value">
            <div class="author-info__author">
              {{ templateSPK.created_by_name }}
            </div>
            <div class="author-info__date-time">
              {{ helpers.convertDateTimeZoneToDateTimeString(templateSPK.created_at) }}
            </div>
          </div>
          <div class="author-info__label">
            Dimodifikasi oleh
          </div>
          <div class="author-info__value">
            <div class="author-info__author">
              {{ templateSPK.updated_by_name }}
            </div>
            <div class="author-info__date-time">
              {{ helpers.convertDateTimeZoneToDateTimeString(templateSPK.updated_at) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog v-model="visibleImagePreviewDialog">
      <img
        :src="selectedImageUrl"
        alt="Preview Image"
        class="manajemen-template-spk-detail__preview-image"
      />
    </el-dialog>
  </div>
</template>

<script src="./js/manajemen-template-spk-detail.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
@import "~/assets/scss/table.scss";

  .manajemen-template-spk-detail {
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
</style>