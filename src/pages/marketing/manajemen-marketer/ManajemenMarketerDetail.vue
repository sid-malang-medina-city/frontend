<template>
  <div class="manajemen-marketer-detail">
    <page-header
      title="Detail Marketer"
      show-back-icon
      @back="goToManajemenMarketer"
    />

    <div class="page-content">
      <div class="manajemen-marketer-detail__wrapper">
        <div class="manajemen-marketer-detail__header header">
          <div class="header__title">
            <div class="header__title-marketer">
              Marketer
            </div>
            <div class="header__title-name">
              {{ helpers.convertEmptyValueWithDash(marketer.nama) }}
            </div>
          </div>
          <div class="header__actions actions">
            <el-button
              v-if="hasAccess('UPDATE_MARKETER')"
              type="primary"
              class="actions__edit-btn"
              plain
              @click="goToEditPage"
            >
              Edit Marketer
              <el-icon class="el-icon--right">
                <EditPen />
              </el-icon>
            </el-button>
            <el-button
              v-if="hasAccess('DELETE_MARKETER')"
              :icon="icons.delete"
              type="danger"
              class="actions__delete-btn"
              plain
              @click="openModalConfirmation"
            >
            </el-button>
          </div>
        </div>

        <div class="manajemen-marketer-detail__content content">
          <div class="content__header-wrapper">
            <div class="content__header-section header-section">
              <div class="header-section__label">
                Nama Marketer
              </div>
              <div class="header-section__value">
                {{ helpers.convertEmptyValueWithDash(marketer.nama) }}
              </div>
            </div>
            <div class="content__header-section header-section">
              <div class="header-section__label">
                Status
              </div>
              <div class="header-section__value">
                <status-badge
                  :text="statuses[marketer.status] ? statuses[marketer.status].name: ''"
                  :color="statuses[marketer.status] ? statuses[marketer.status].color: ''"
                  type="detail"
                />
              </div>
            </div>
          </div>

          <div class="content__rows">
            <div class="content__row">
              <div class="content__data">
                <div class="content__label">
                  Email
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(marketer.email) }}
                </div>
              </div>
              <div class="content__data">
                <div class="content__label">
                  Nomor Telepon
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(marketer.nomor_telepon) }}
                </div>
              </div>
            </div>
            <div class="content__row">
              <div class="content__data">
                <div class="content__label">
                  Alamat
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(marketer.alamat) }}
                </div>
              </div>
              <div class="content__data">
                <div class="content__label">
                  Nama Bank
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(marketer.rekening_bank) }}
                </div>
              </div>
            </div>
            <div class="content__row">
              <div class="content__data">
                <div class="content__label">
                  Nomor Rekening Bank
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(marketer.nomor_rekening) }}
                </div>
              </div>
              <div class="content__data">
                <div class="content__label">
                  Nama Rekening Bank
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(marketer.nama_rekening) }}
                </div>
              </div>
            </div>
            <div class="content__row">
              <div class="content__data">
                <div class="content__label">
                  Total Penjualan Unit
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(marketer.total_penjualan) }}
                </div>
              </div>
              <div class="content__data">
                <div class="content__label">
                  NPWP
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(marketer.npwp) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/manajemen-marketer-detail.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";

  .manajemen-marketer-detail {
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
        gap: 305px;
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
  }
</style>