<template>
  <div class="laporan-marketing">
    <page-header title="Laporan Marketing" />
    <div class="laporan-marketing__wrapper page-content">
      <div class="laporan-marketing__actions-wrapper">
        <div class="laporan-marketing__actions actions">
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
          v-if="visibleFilter"
          class="laporan-marketing__filters filters"
        >
          <div class="filters__input-wrapper">
            <div class="filters__label">
              Nama
            </div>
            <el-input
              v-model="filters.search"
              placeholder="Cari berdasarkan nama"
              class="filters__input"
              @keyup.enter="handleFilterChange()"
            >
              <template #suffix>
                <el-icon class="el-input__icon"><Search /></el-icon>
              </template>
            </el-input>
          </div>

          <div class="filters__input-wrapper">
            <div class="filters__label">
              Status
            </div>
            <el-select
              v-model="filters.status_fee"
              placeholder="Pilih status"
              class="filters__input"
              @change="handleFilterChange()"
            >
              <el-option
                v-for="status in statuses"
                :key="status.code"
                :label="status.name"
                :value="status.code"
              />
            </el-select>
          </div>
        </div>
      </div>

      <div class="laporan-marketing__table-wrapper">
        <el-table
          v-loading="visibleLoadingTable"
          :data="laporanMarketings"
          class="laporan-marketing__table table general-table"
          header-row-class-name="general-table__header-gray"
          stripe
          @row-click="goToDetailPage"
        >
          <el-table-column
            prop="id"
            label="ID"
            min-width="100"
          />
          <el-table-column
            prop="marketer_nama"
            label="Nama"
            min-width="210"
          />
          <el-table-column
            prop="dokumen_konsumen_id"
            label="Dokumen Konsumen"
            min-width="150"
          />
          <el-table-column
            prop="status_fee"
            label="Status Pembayaran"
            min-width="180"
          >
            <template #default="scope">
              <status-badge
                :color="statuses[scope.row.status_fee].color"
                :text="statuses[scope.row.status_fee].name"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="jumlah_fee"
            label="Jumlah Fee"
            min-width="180"
          >
            <template #default="scope">
              {{ helpers.convertPriceToRupiah(scope.row.jumlah_fee) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="updated_at"
            label="Tanggal Diperbaharui"
            min-width="180"
          >
            <template #default="scope">
              {{ helpers.convertDateTimeZoneToDateString(scope.row.updated_at) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="Tanggal Dibuat"
            min-width="180"
          >
            <template #default="scope">
              {{ helpers.convertDateTimeZoneToDateString(scope.row.updated_at) }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="hasAccess('UPDATE_LAPORAN_MARKETING')"
            label="Action"
            width="90"
            align="center"
            fixed="right"
          >
            <template #default="scope">
              <div class="table__actions">
                <el-button
                  :icon="icons.edit"
                  type="primary"
                  class="table__actions-edit"
                  text
                  @click.stop="goToEditPage(scope.row.id)"
                />
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="laporan-marketing__footer">
          <div class="laporan-marketing__total-laporan-marketing font-grey">
            Showing {{ totalShownLaporanMarketings }} of {{ totalLaporanMarketings }} laporan marketing
          </div>
          <div class="laporan-marketing__pagination">
            <el-pagination
              :current-page="pagination.page"
              :page-size="pagination.size"
              :total="totalLaporanMarketings"
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

<script src="./js/laporan-marketing.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
@import "~/assets/scss/table.scss";

  .laporan-marketing {
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
        width: 180px;
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
</style>