<template>
  <div class="laporan-invoice">
    <page-header title="Laporan Invoice" />
    <div class="laporan-invoice__wrapper page-content">
      <div class="laporan-invoice__actions-wrapper">
        <div class="laporan-invoice__actions actions">
          <el-button
            type="secondary"
            class="actions__filter-btn"
            @click="toggleFilter"
          >
            Filter
            <el-icon class="el-icon--right">
              <ArrowDown v-if="!visibleFilter" />
              <ArrowUp v-else />
            </el-icon>
          </el-button>
        </div>
        <div
          v-show="visibleFilter"
          class="laporan-invoice__filters filters"
        >
          <div class="filters__input-wrapper">
            <div class="filters__label">
              Nomor Invoice
            </div>
            <el-input
              v-model="filters.search"
              placeholder="Cari berdasarkan nomor invoice"
              class="filters__input"
              @keyup="debounceDelay(() => handleFilterChange())"
            >
              <template #suffix>
                <el-icon class="el-input__icon"><Search /></el-icon>
              </template>
            </el-input>
          </div>
        </div>
      </div>

      <div class="laporan-invoice__table-wrapper">
        <el-table
          v-loading="visibleLoadingTable"
          :data="laporanInvoices"
          class="laporan-invoice__table table general-table"
          header-row-class-name="general-table__header-gray"
          stripe
        >
          <el-table-column
            prop="code"
            label="Nomor Invoice"
            min-width="210"
          />
          <el-table-column
            prop="laporan_marketing.id"
            label="Laporan Marketing"
            min-width="210"
          >
            <template #default="scope">
              <div
                class="table__link"
                @click.stop="goToLaporanMarketingDetailPage(scope.row.laporan_marketing?.id)"
              >
                <u>{{ scope.row.laporan_marketing?.id }}</u>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="Tanggal Dibuat"
            min-width="210"
          >
            <template #default="scope">
              {{ helpers.convertDateTimeZoneToDateString(scope.row.created_at) }}
            </template>
          </el-table-column>
          <el-table-column
            label="Action"
            width="190"
            align="center"
            fixed="right"
          >
            <template #default="scope">
              <div class="table__actions">
                <el-button
                  type="primary"
                  class="table__actions-edit"
                  link
                  @click.stop="generatePDF(scope.row)"
                  >
                  <b>
                    Generate invoice
                  </b>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="laporan-invoice__footer">
          <div class="laporan-invoice__total-laporan-invoice font-grey">
            Menampilkan {{ totalShownLaporanInvoices }} dari {{ totalLaporanInvoices }} laporan invoice
          </div>
          <div class="laporan-invoice__pagination">
            <el-pagination
              :current-page="pagination.page"
              :page-size="pagination.size"
              :total="totalLaporanInvoices"
              layout="prev, pager, next"
              background
              hide-on-single-page
              @current-change="handlePageChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/laporan-invoice.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
@import "~/assets/scss/table.scss";

  .laporan-invoice {
    &__actions-wrapper {
      border-radius: 12px;
      border: 1px solid #EAEAEA;
      background: white;
      box-shadow: 0px 4px 8px 0px rgba(224, 224, 224, 0.20);
      padding: 16px 20px;
    }
    
    .actions {
      display: flex;
      justify-content: space-between;

      &__filter-btn {
        width: 100px;
      }

      &__create-btn {
        width: 80px;
      }
    }

    .filters {
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #E3EADC;
      background: #F6F8F4;
      display: flex;
      gap: 24px;
      margin-top: 16px;

      &__label {
        margin-bottom: 8px;
        color: #434343;
        font-family: Plus Jakarta Sans;
        font-size: 12px;
        font-weight: 600;
      }

      &__input {
        width: 400px;
      }
    }

    &__table-wrapper {
      border-radius: 12px;
      border: 1px solid #EAEAEA;
      background: white;
      box-shadow: 0px 4px 8px 0px rgba(224, 224, 224, 0.20);
      padding: 20px;
      margin-top: 20px;
    }

    .table {
      margin-bottom: 24px;

      &__link {
        cursor: pointer;
        width: fit-content;
      }

      &__actions {
        display: flex;
        justify-content: center;

        &-edit, &-delete {
          padding: 0;
        }
      }
    }

    &__footer {
      color: #7B7B7B;
      font-family: Plus Jakarta Sans;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .laporan-invoice-pdf {
    padding: 40px;

    &__logo {
      display: block;
      margin: auto;
    }

    &__title {
      font-weight: 700;
      text-decoration: underline;
      text-align: center;
      margin-top: 10px;
    }

    &__subtitle {
      margin-top: 10px;
    }

    .user-section {
      margin-top: 30px;
    }
  }

  @media print {
    @page {
      margin: 0;
    }
  }
</style>