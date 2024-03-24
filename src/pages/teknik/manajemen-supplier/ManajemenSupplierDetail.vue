<template>
  <div class="manajemen-supplier-detail">
    <page-header
      title="Detail Supplier"
      show-back-icon
      @back="goToManajemenSupplier"
    />

    <div class="page-content">
      <div class="manajemen-supplier-detail__wrapper">
        <div class="manajemen-supplier-detail__header header">
          <div class="header__title">
            <div class="header__title-supplier">
              Supplier
            </div>
            <div class="header__title-name">
              {{ helpers.convertEmptyValueWithDash(supplier.nama_penanggung_jawab) }}
            </div>
          </div>
          <div class="header__actions actions">
            <el-button
              v-if="hasAccess('UPDATE_SUPPLIER')"
              type="primary"
              class="actions__edit-btn"
              plain
              @click="goToEditPage"
            >
              Edit Supplier
              <el-icon class="el-icon--right">
                <EditPen />
              </el-icon>
            </el-button>
            <el-button
              v-if="hasAccess('DELETE_SUPPLIER')"
              :icon="icons.delete"
              type="danger"
              class="actions__delete-btn"
              plain
              @click="openModalConfirmation"
            >
            </el-button>
          </div>
        </div>

        <div class="manajemen-supplier-detail__content content">
          <div class="content__header-wrapper">
            <div class="content__header-section header-section">
              <div class="header-section__label">
                Nama Penanggung Jawab
              </div>
              <div class="header-section__value">
                {{ helpers.convertEmptyValueWithDash(supplier.nama_penanggung_jawab) }}
              </div>
            </div>
            <div class="content__header-section header-section">
              <div class="header-section__label">
                Divisi
              </div>
              <div class="header-section__value">
                {{ helpers.convertEmptyValueWithDash(supplier.divisi) }}
              </div>
            </div>
            <div class="content__header-section header-section">
              <div class="header-section__label">
                Jabatan
              </div>
              <div class="header-section__value">
                {{ helpers.convertEmptyValueWithDash(supplier.jabatan) }}
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
                  {{ helpers.convertEmptyValueWithDash(supplier.nama_perusahaan) }}
                </div>
              </div>
              <div class="content__data">
                <div class="content__label">
                  Alamat
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(supplier.alamat) }}
                </div>
              </div>
            </div>
            <div class="content__row">
              <div class="content__data">
                <div class="content__label">
                  Nama Bank
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(supplier.rekening_bank) }}
                </div>
              </div>
              <div class="content__data">
                <div class="content__label">
                  Nomor Rekening Bank
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(supplier.nomor_rekening) }}
                </div>
              </div>
            </div>
            <div class="content__row">
              <div class="content__data">
                <div class="content__label">
                  Nama Rekening Bank
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(supplier.nama_rekening) }}
                </div>
              </div>
              <div class="content__data">
                <div class="content__label">
                  Nomor Telepon
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(supplier.nomor_telepon) }}
                </div>
              </div>
            </div>
            <div class="content__row">
              <div class="content__data">
                <div class="content__label">
                  Nomor Fax
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(supplier.nomor_fax) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="manajemen-supplier-detail__author-info author-info">
          <div class="author-info__label">
            Dibuat oleh
          </div>
          <div class="author-info__value">
            <div class="author-info__author">
              {{ supplier.created_by_name }}
            </div>
            <div class="author-info__date-time">
              {{ helpers.convertDateTimeZoneToDateTimeString(supplier.created_at) }}
            </div>
          </div>
          <div class="author-info__label">
            Dimodifikasi oleh
          </div>
          <div class="author-info__value">
            <div class="author-info__author">
              {{ supplier.updated_by_name }}
            </div>
            <div class="author-info__date-time">
              {{ helpers.convertDateTimeZoneToDateTimeString(supplier.updated_at) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/manajemen-supplier-detail.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";

  .manajemen-supplier-detail {
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
        justify-content: space-between
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