<template>
  <div class="manajemen-konsumen-detail">
    <page-header
      title="Detail Konsumen"
      show-back-icon
      @back="goToManajemenKonsumen"
    />

    <div class="page-content">
      <div class="manajemen-konsumen-detail__wrapper">
        <div class="manajemen-konsumen-detail__header header">
          <div class="header__title">
            <div class="header__title-konsumen">
              Konsumen
            </div>
            <div class="header__title-name">
              {{ helpers.convertEmptyValueWithDash(konsumen.nama) }}
            </div>
          </div>
          <div class="header__actions actions">
            <el-button
              v-if="hasAccess('UPDATE_KONSUMEN')"
              type="primary"
              class="actions__edit-btn"
              plain
              @click="goToEditPage"
            >
              Edit Konsumen
              <el-icon class="el-icon--right">
                <EditPen />
              </el-icon>
            </el-button>
            <el-button
              v-if="hasAccess('DELETE_KONSUMEN')"
              :icon="icons.delete"
              type="danger"
              class="actions__delete-btn"
              plain
              @click="openModalConfirmation"
            >
            </el-button>
          </div>
        </div>

        <div class="manajemen-konsumen-detail__content content">
          <div class="content__header-wrapper">
            <div class="content__header-section header-section">
              <div class="header-section__label">
                Nama Konsumen
              </div>
              <div class="header-section__value">
                {{ helpers.convertEmptyValueWithDash(konsumen.nama) }}
              </div>
            </div>
            <div class="content__header-section header-section">
              <div class="header-section__label">
                Status
              </div>
              <div class="header-section__value">
                <status-badge
                  v-if="konsumen.status === 'BOOKING'"
                  :text="verificationStatuses[konsumen.status_verifikasi] ? verificationStatuses[konsumen.status_verifikasi].name: ''"
                  :color="verificationStatuses[konsumen.status_verifikasi] ? verificationStatuses[konsumen.status_verifikasi].color: ''"
                  type="detail"
                />
                <status-badge
                  v-else
                  :text="statuses[konsumen.status] ? statuses[konsumen.status].name: ''"
                  :color="statuses[konsumen.status] ? statuses[konsumen.status].color: ''"
                  type="detail"
                />
              </div>
            </div>
            <div
              v-if="konsumen.status === 'BOOKING'"
              class="content__header-section header-section"
            >
              <div class="header-section__label">
                Status Pembayaran
              </div>
              <div class="header-section__value">
                <status-badge
                  :text="paymentStatuses[konsumen.status_pembayaran] ? paymentStatuses[konsumen.status_pembayaran].name: ''"
                  :color="paymentStatuses[konsumen.status_pembayaran] ? paymentStatuses[konsumen.status_pembayaran].color: ''"
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
                  {{ helpers.convertEmptyValueWithDash(konsumen.email) }}
                </div>
              </div>
              <div class="content__data">
                <div class="content__label">
                  Nomor Telepon
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(konsumen.nomor_telepon) }}
                </div>
              </div>
            </div>
            <div class="content__row">
              <div class="content__data">
                <div class="content__label">
                  Alamat
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(konsumen.alamat) }}
                </div>
              </div>
              <div
                v-if="konsumen.status === 'BOOKING'"
                class="content__data"
              >
                <div class="content__label">
                  Marketer
                </div>
                <div
                  v-if="!!konsumen.marketer_nama"
                  class="content__value"
                >
                  <u
                    class="content__link"
                    @click="goToMarketerDetailPage"
                  >
                    {{ helpers.convertEmptyValueWithDash(konsumen.marketer_nama) }}
                  </u>
                </div>
                <div
                  v-else
                  class="content__value"
                >
                  {{ helpers.convertEmptyValueWithDash(konsumen.marketer_nama) }}
                </div>
              </div>
            </div>
            <div class="content__row">
              <div
                v-if="konsumen.status === 'BOOKING'"
                class="content__data"
              >
                <div class="content__label">
                  Unit
                </div>
                <div class="content__value content__value">
                  <u
                    class="content__link"
                    @click="goToUnitDetailPage"
                  >
                    {{ konsumen.unit_cluster_nama }} - {{ konsumen.unit_nomor_kavling }}
                  </u>
                </div>
              </div>
              <div
                v-if="konsumen.status === 'BOOKING'"
                class="content__data"
              >
                <div class="content__label">
                  Dokumen Konsumen
                </div>
                <div class="content__value">
                  <u
                    class="content__link"
                    @click="goToDokumenKonsumenDetailPage"
                  >
                    {{ helpers.convertEmptyValueWithDash(konsumen.dokumen_konsumen_id) }}
                  </u>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/manajemen-konsumen-detail.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";

  .manajemen-konsumen-detail {
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
        gap: 220px;
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
      
      &__link {
        cursor: pointer;
      }
    }
  }
</style>