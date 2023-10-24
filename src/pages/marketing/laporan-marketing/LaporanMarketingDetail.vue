<template>
  <div class="laporan-marketing-detail">
    <page-header
      title="Detail Laporan Marketing"
      show-back-icon
      @back="goToLaporanMarketing"
    />

    <div class="page-content">
      <div class="laporan-marketing-detail__wrapper">
        <div class="laporan-marketing-detail__header header">
          <div class="header__title">
            <div class="header__title-laporan-marketing">
              Laporan Marketing
            </div>
            <div class="header__title-name">
              {{ helpers.convertEmptyValueWithDash(laporanMarketing.id) }}
            </div>
          </div>
          <div class="header__actions actions">
            <el-button
              v-if="hasAccess('UPDATE_LAPORAN_MARKETING')"
              type="primary"
              class="actions__edit-btn"
              plain
              @click="goToEditPage"
            >
              Edit Laporan Marketing
              <el-icon class="el-icon--right">
                <EditPen />
              </el-icon>
            </el-button>
          </div>
        </div>

        <div class="laporan-marketing-detail__content content">
          <div class="content__header-wrapper">
            <div class="content__header-section header-section">
              <div class="header-section__label">
                ID
              </div>
              <div class="header-section__value">
                {{ helpers.convertEmptyValueWithDash(laporanMarketing.id) }}
              </div>
            </div>
            <div class="content__header-section header-section">
              <div class="header-section__label">
                Status Fee
              </div>
              <div class="header-section__value">
                <status-badge
                  :text="statuses[laporanMarketing.status_fee] ? statuses[laporanMarketing.status_fee].name: ''"
                  :color="statuses[laporanMarketing.status_fee] ? statuses[laporanMarketing.status_fee].color: ''"
                  type="detail"
                />
              </div>
            </div>
            <div class="content__header-section header-section">
              <div class="header-section__label">
                Status Verifikasi
              </div>
              <div class="header-section__value">
                <status-badge
                  :text="verificationStatuses[laporanMarketing.status_verifikasi] ? verificationStatuses[laporanMarketing.status_verifikasi].name: ''"
                  :color="verificationStatuses[laporanMarketing.status_verifikasi] ? verificationStatuses[laporanMarketing.status_verifikasi].color: ''"
                  type="detail"
                />
              </div>
            </div>
          </div>

          <div class="content__rows">
            <div class="content__row">
              <div class="content__data">
                <div class="content__label">
                  Nama Marketer
                </div>
                <div class="content__value">
                  <u
                    class="content__link"
                    @click="goToMarketerDetailPage"
                  >
                    {{ helpers.convertEmptyValueWithDash(laporanMarketing.marketer?.nama) }}
                  </u>
                </div>
              </div>
              <div class="content__data">
                <div class="content__label">
                  Dokumen Konsumen
                </div>
                <div class="content__value">
                  <u
                    class="content__link"
                    @click="goToDokumenKonsumenDetailPage"
                  >
                    {{ helpers.convertEmptyValueWithDash(laporanMarketing.dokumen_konsumen_id) }}
                  </u>
                </div>
              </div>
            </div>
            <div class="content__row">
              <div class="content__data">
                <div class="content__label">
                  Jumlah Fee
                </div>
                <div class="content__value">
                  {{ helpers.convertPriceToRupiah(laporanMarketing.jumlah_fee) }}
                </div>
              </div>
              <div class="content__data">
                <div class="content__label">
                  Keterangan
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(laporanMarketing.keterangan) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/laporan-marketing-detail.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";

  .laporan-marketing-detail {
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

      &__link {
        cursor: pointer;
      }
    }
  }
</style>