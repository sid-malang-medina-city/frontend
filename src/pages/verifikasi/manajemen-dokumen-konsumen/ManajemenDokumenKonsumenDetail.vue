<template>
  <div class="manajemen-dokumen-konsumen-detail">
    <page-header
      title="Detail Dokumen Konsumen"
      show-back-icon
      @back="goToManajemenDokumenKonsumen"
    />

    <div class="page-content">
      <div class="manajemen-dokumen-konsumen-detail__wrapper">
        <div class="manajemen-dokumen-konsumen-detail__header header">
          <div class="header__title">
            <div class="header__title-dokumen-konsumen">
              Dokumen Konsumen
            </div>
            <div class="header__title-name">
              {{ dokumenKonsumen.id }}
            </div>
          </div>
          <div class="header__actions actions">
            <el-button
              v-if="hasAccess('UPDATE_DOKUMEN_KONSUMEN')"
              type="primary"
              class="actions__edit-btn"
              plain
              @click="goToEditPage"
            >
              Edit Dokumen Konsumen
              <el-icon class="el-icon--right">
                <EditPen />
              </el-icon>
            </el-button>
          </div>
        </div>

        <div class="manajemen-dokumen-konsumen-detail__content content">
          <div class="content__informasi-umum-wrapper">
            <div class="content__informasi-umum-content">
              <div class="content__informasi-umum informasi-umum">
                <div class="informasi-umum__column column">
                  <div class="column__label">
                    ID
                  </div>
                  <div class="column__value">
                    {{ dokumenKonsumen.id }}
                  </div>
                </div>
                <div class="informasi-umum__column column">
                  <div class="column__label">
                    Status Verifikasi
                  </div>
                  <div class="column__value">
                    <status-badge
                      :text="verificationStatuses[dokumenKonsumen.status_verifikasi] ? verificationStatuses[dokumenKonsumen.status_verifikasi].name: ''"
                      :color="verificationStatuses[dokumenKonsumen.status_verifikasi] ? verificationStatuses[dokumenKonsumen.status_verifikasi].color: ''"
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
                      :text="paymentStatuses[dokumenKonsumen.status_pembayaran] ? paymentStatuses[dokumenKonsumen.status_pembayaran].name: ''"
                      :color="paymentStatuses[dokumenKonsumen.status_pembayaran] ? paymentStatuses[dokumenKonsumen.status_pembayaran].color: ''"
                      type="detail"
                    />
                  </div>
                </div>
              </div>
              <div
                v-if="!!dokumenKonsumen.keterangan"
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
                  {{ dokumenKonsumen.keterangan }}
                </div>
              </div>
            </div>
          </div>

          <div class="content__informasi-pendukung-wrapper informasi-pendukung-wrapper--top">
            <div class="content__header">
              <img
                :src="icons.newspaperClipping"
                alt="Image Icon"
              />
              <div class="content__header-title">
                Data Diri
              </div>
            </div>
  
            <div class="content__rows rows">
              <div class="rows__row">
                <div class="row__label required">
                  Nama Konsumen
                </div>
                <div class="row__value">
                  <u
                    class="row__link"
                    @click="goToKonsumenDetailPage"
                  >
                    {{ helpers.convertEmptyValueWithDash(dokumenKonsumen.konsumen_nama) }}
                  </u>
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Tanggal Lahir
                </div>
                <div class="row__value">
                  {{ helpers.convertEmptyValueWithDash(dokumenKonsumen.tanggal_lahir) }}
                </div>
              </div>
            </div>
            
            <div class="content__rows rows">
              <div class="rows__row">
                <div class="row__label required">
                  Provinsi
                </div>
                <div class="row__value">
                  {{ helpers.convertEmptyValueWithDash(dokumenKonsumen.provinsi?.name) }}
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Kabupaten/Kota
                </div>
                <div class="row__value">
                  {{ helpers.convertEmptyValueWithDash(dokumenKonsumen.kota?.name) }}
                </div>
              </div>
            </div>
            
            <div class="content__rows rows">
              <div class="rows__row">
                <div class="row__label required">
                  Pekerjaan
                </div>
                <div class="row__value">
                  {{ helpers.convertEmptyValueWithDash(dokumenKonsumen.pekerjaan?.nama) }}
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Gaji Per Bulan
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(dokumenKonsumen.gaji_per_bulan) }}
                </div>
              </div>
            </div>

            <div class="content__rows rows last-row">
              <div class="rows__row">
                <div class="row__label required">
                  Alasan
                </div>
                <div class="row__value">
                  {{ !dokumenKonsumen.alasans?.length ? '-' : getAlasansRepresentation(dokumenKonsumen.alasans) }}
                </div>
              </div>
            </div>
          </div>

          <div class="content__informasi-utama-wrapper">
            <div class="content__header">
              <img
                :src="icons.signature"
                alt="Image Icon"
              />
              <div class="content__header-title">
                Lampiran Berkas
              </div>
            </div>
          </div>

          <div
            v-if="hasAccess('READ_FILEVIEW_DOKUMEN_KONSUMEN')"
            class="content__image-upload image-upload"
          >
            <div
              v-for="(identifier, index) in fileIdentifiers"
              class="image-upload__wrapper"
            >
              <div
                v-if="!!getFilesUrl(identifier)"
                class="image-upload__container"
              >
                <div
                  class="image-upload__image-content image-content"
                  :class="{ 'image-content--w-auto': !!getFilesUrl(identifier) }"
                  @click.stop=""
                  @mouseenter="addVisibleImageActionIcons(identifier)"
                  @mouseleave="removeVisibleImageActionIcons(identifier)"
                >
                  <img
                    :src="getFilesUrl(identifier)"
                    :class="{ 'image-content__img--hovered': visibleImageActionIcons[identifier] }"
                    alt=""
                    class="image-content__img"
                  />
                  <span
                    v-if="visibleImageActionIcons[identifier]"
                    class="image-content__item-actions item-actions"
                  >
                    <div
                      class="item-actions__wrapper"
                      @click="handlePictureCardPreview(identifier)"
                    >
                      <el-icon color="#434343">
                        <View />
                      </el-icon>
                    </div>
                  </span>
                </div>
                <div class="image-upload__label">
                  {{ fileLabels[index] }}
                </div>
              </div>
              <div
                v-else
                class="image-upload__empty-state-wrapper"
              >
                <div class="image-upload__empty-state empty-state">
                  <img
                    :src="icons.uploadImage"
                    alt="Upload Image"
                    class="empty-state__upload-image-icon"
                  />
                </div>
                <div class="empty-state__label">
                  {{ fileLabels[index] }}
                </div>
              </div>
            </div>
            <div class="image-upload__wrapper">
              <div
                v-if="!!getFilesUrl('dokumen_pendukung_access_url')"
                class="image-upload__container"
              >
                <div
                  class="image-upload__image-content image-content image-content--bg-success empty-state"
                  :class="{ 'image-content--w-auto': !!getFilesUrl('dokumen_pendukung_access_url') }"
                  @click.stop=""
                  @mouseenter="addVisibleImageActionIcons('dokumen_pendukung_access_url')"
                  @mouseleave="removeVisibleImageActionIcons('dokumen_pendukung_access_url')"
                >
                  <el-icon
                    size="77"
                    color="#89AE8B"
                    class="empty-state__upload-image-icon"
                  >
                    <CircleCheckFilled />
                  </el-icon>
                  <div class="empty-state__desc">
                    Dokumen Tersedia
                  </div>
                  <span
                    v-if="visibleImageActionIcons['dokumen_pendukung_access_url']"
                    class="image-content__item-actions item-actions"
                  >
                    <div
                      class="item-actions__wrapper"
                      @click="openDocumentInNewTab"
                    >
                      <el-icon color="#434343">
                        <View />
                      </el-icon>
                    </div>
                  </span>
                </div>
                <div class="image-upload__label">
                  Dokumen Pendukung
                </div>
              </div>
              <div
                v-else
                class="image-upload__empty-state-wrapper"
              >
                <div class="image-upload__empty-state empty-state">
                  <el-icon
                    size="77"
                    color="#9D9D9D"
                    class="empty-state__upload-image-icon"
                  >
                    <Document />
                  </el-icon>
                </div>
                <div class="empty-state__label">
                  Dokumen Pendukung
                </div>
              </div>
            </div>
          </div>

          <div
            v-else-if="hasAccess('READ_CHECKBOX_DOKUMEN_KONSUMEN')"
            class="content__checkbox-wrapper checkbox-wrapper"
          >
            <div
              v-for="(identifier, index) in checkboxIdentifiers"
              class="checkbox-wrapper__card card"
            >
              <div class="card__title">
                {{ checkboxLabels[index] }}
              </div>
              <div class="card__checkbox">
                <el-icon
                  v-if="!!dokumenKonsumen[identifier]"
                  color="#74C627"
                >
                  <CircleCheckFilled />
                </el-icon>
                <el-icon
                  v-else
                  color="#FF613A"
                >
                  <CircleCloseFilled />
                </el-icon>
                <div class="card__info">
                  {{ !!dokumenKonsumen[identifier] ? 'Tersedia' : 'Tidak Tersedia' }}
                </div>
              </div>
            </div>
          </div>

          <div class="content__informasi-pendukung-wrapper">
            <div class="content__header">
              <img
                :src="icons.newspaperClipping"
                alt="Image Icon"
              />
              <div class="content__header-title">
                Rincian Pembelian
              </div>
            </div>
  
            <div class="content__rows rows">
              <div class="rows__row">
                <div class="row__label required">
                  Nama Konsumen
                </div>
                <div class="row__value">
                  <u
                    class="row__link"
                    @click="goToKonsumenDetailPage"
                  >
                    {{ helpers.convertEmptyValueWithDash(dokumenKonsumen.konsumen_nama) }}
                  </u>
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Nama Marketer
                </div>
                <div class="row__value">
                  <u
                    class="row__link"
                    @click="goToMarketerDetailPage"
                  >
                    {{ helpers.convertEmptyValueWithDash(dokumenKonsumen.marketer_nama) }}
                  </u>
                </div>
              </div>
            </div>
            
            <div class="content__rows rows last-row">
              <div class="rows__row">
                <div class="row__label required">
                  Unit
                </div>
                <div class="row__value">
                  <u
                    class="row__link"
                    @click="goToUnitDetailPage"
                  >
                    {{ dokumenKonsumen.unit_cluster_nama }} - {{ dokumenKonsumen.unit_nomor_kavling }}
                  </u>
                </div>
              </div>
            </div>
          </div>
          
          <div class="content__informasi-pendukung-wrapper">
            <div class="content__header">
              <img
                :src="icons.newspaperClipping"
                alt="Image Icon"
              />
              <div class="content__header-title">
                Rincian Deal
              </div>
            </div>
  
            <div class="content__rows rows">
              <div class="rows__row">
                <div class="row__label required">
                  Harga Deal Awal
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(dokumenKonsumen.harga_deal_awal) }}
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Harga Cash
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(dokumenKonsumen.unit_harga) }}
                </div>
              </div>
            </div>
            
            <div class="content__rows rows">
              <div class="rows__row">
                <div class="row__label required">
                  Diskon
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(dokumenKonsumen.nominal_diskon) }}
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Harga Cash Setelah Diskon
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(dokumenKonsumen.harga_cash_setelah_diskon) }}
                </div>
              </div>
            </div>
            
            <div class="content__rows rows">
              <div class="rows__row">
                <div class="row__label required">
                  Harga Deal Akhir
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(dokumenKonsumen.harga_deal_akhir) }}
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Kategori Diskon
                </div>
                <div class="row__value">
                  {{ helpers.convertEmptyValueWithDash(dokumenKonsumen.kategori_diskon) }}
                </div>
              </div>
            </div>
            
            <div class="content__rows rows">
              <div class="rows__row">
                <div class="row__label required">
                  Skema Pembayaran
                </div>
                <div class="row__value">
                  {{ helpers.convertEmptyValueWithDash(dokumenKonsumen.skema_bayar) }}
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Tanggal PPJB
                </div>
                <div class="row__value">
                  {{ helpers.convertEmptyValueWithDash(dokumenKonsumen.tanggal_ppjb) }}
                </div>
              </div>
            </div>
            
            <div class="content__rows rows last-row">
              <div class="rows__row">
                <div class="row__label required">
                  Keterangan Deal
                </div>
                <div class="row__value">
                  {{ helpers.convertEmptyValueWithDash(dokumenKonsumen.keterangan_deal) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="manajemen-dokumen-konsumen-detail__author-info author-info">
          <div class="author-info__label">
            Dibuat oleh
          </div>
          <div class="author-info__value">
            <div class="author-info__author">
              {{ dokumenKonsumen.created_by_name }}
            </div>
            <div class="author-info__date-time">
              {{ helpers.convertDateTimeZoneToDateTimeString(dokumenKonsumen.created_at) }}
            </div>
          </div>
          <div class="author-info__label">
            Dimodifikasi oleh
          </div>
          <div class="author-info__value">
            <div class="author-info__author">
              {{ dokumenKonsumen.updated_by_name }}
            </div>
            <div class="author-info__date-time">
              {{ helpers.convertDateTimeZoneToDateTimeString(dokumenKonsumen.updated_at) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog v-model="visibleImagePreviewDialog">
      <img
        :src="selectedImageUrl"
        alt="Preview Image"
        class="manajemen-dokumen-konsumen-detail__preview-image"
      />
    </el-dialog>
  </div>
</template>

<script src="./js/manajemen-dokumen-konsumen-detail.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";

  .manajemen-dokumen-konsumen-detail {
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
  }
</style>