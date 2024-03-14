<template>
  <div class="manajemen-vendor-detail">
    <page-header
      title="Detail Vendor"
      show-back-icon
      @back="goToManajemenVendor"
    />

    <div class="page-content">
      <div class="manajemen-vendor-detail__wrapper">
        <div class="manajemen-vendor-detail__header header">
          <div class="header__title">
            <div class="header__title-vendor">
              Vendor
            </div>
            <div class="header__title-name">
              {{ helpers.convertEmptyValueWithDash(vendor.nama) }}
            </div>
          </div>
          <div class="header__actions actions">
            <el-button
              v-if="hasAccess('UPDATE_VENDOR')"
              type="primary"
              class="actions__edit-btn"
              plain
              @click="goToEditPage"
            >
              Edit Vendor
              <el-icon class="el-icon--right">
                <EditPen />
              </el-icon>
            </el-button>
            <el-button
              v-if="hasAccess('DELETE_VENDOR')"
              :icon="icons.delete"
              type="danger"
              class="actions__delete-btn"
              plain
              @click="openModalConfirmation"
            >
            </el-button>
          </div>
        </div>

        <div class="manajemen-vendor-detail__content content">
          <div class="content__header-wrapper">
            <div class="content__header-section header-section">
              <div class="header-section__label">
                Nama Vendor
              </div>
              <div class="header-section__value">
                {{ helpers.convertEmptyValueWithDash(vendor.nama) }}
              </div>
            </div>
            <div class="content__header-section header-section">
              <div class="header-section__label">
                Jabatan
              </div>
              <div class="header-section__value">
                {{ helpers.convertEmptyValueWithDash(vendor.jabatan) }}
              </div>
            </div>
          </div>

          <div class="content__rows">
            <div class="content__row">
              <div class="content__data">
                <div class="content__label">
                  Nama Perusahaan
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(vendor.nama_perusahaan) }}
                </div>
              </div>
              <div class="content__data">
                <div class="content__label">
                  Alamat
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(vendor.alamat) }}
                </div>
              </div>
            </div>
            <div class="content__row">
              <div class="content__data">
                <div class="content__label">
                  Nomor KTP
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(vendor.nomor_ktp) }}
                </div>
              </div>
              <div class="content__data">
                <div class="content__label">
                  Nama Bank
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(vendor.rekening_bank) }}
                </div>
              </div>
            </div>
            <div class="content__row">
              <div class="content__data">
                <div class="content__label">
                  Nomor Rekening Bank
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(vendor.nomor_rekening) }}
                </div>
              </div>
              <div class="content__data">
                <div class="content__label">
                  Nama Rekening Bank
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(vendor.nama_rekening) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="manajemen-vendor-detail__author-info author-info">
          <div class="author-info__label">
            Dibuat oleh
          </div>
          <div class="author-info__value">
            <div class="author-info__author">
              {{ vendor.created_by_name }}
            </div>
            <div class="author-info__date-time">
              {{ helpers.convertDateTimeZoneToDateTimeString(vendor.created_at) }}
            </div>
          </div>
          <div class="author-info__label">
            Dimodifikasi oleh
          </div>
          <div class="author-info__value">
            <div class="author-info__author">
              {{ vendor.updated_by_name }}
            </div>
            <div class="author-info__date-time">
              {{ helpers.convertDateTimeZoneToDateTimeString(vendor.updated_at) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/manajemen-vendor-detail.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";

  .manajemen-vendor-detail {
    &__wrapper {
      background-color: white;
      border-radius: 12px;
      border: 1px solid #EAEAEA;
      box-shadow: 0px 4px 8px 0px rgba(224, 224, 224, 0.20);
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
      padding: 20px;
      border-top: 1px solid #E9E9E9;

      &__header-wrapper {
        margin-bottom: 28px;
        padding: 16px;
        background-color: #F5F5F5;
        border-left: 6px solid #C4C4C4;
        border-radius: 8px;
        display: flex;
        gap: 315px;
      }

      .header-section {
        &__label {
          color: #434343;
          font-size: 14px;
          font-weight: 400;
          margin-bottom: 8px;
        }
  
        &__value {
          color: #434343;
          font-size: 18px;
          font-weight: 600;
        }
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
    }

    .author-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-top: 1px solid #E9E9E9;

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