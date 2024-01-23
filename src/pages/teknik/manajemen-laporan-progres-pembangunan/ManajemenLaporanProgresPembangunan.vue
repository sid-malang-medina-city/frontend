<template>
  <div class="manajemen-laporan-progres-pembangunan">
    <page-header title="Manajemen Laporan Progres Pembangunan" />
    <div class="manajemen-laporan-progres-pembangunan__wrapper page-content">
      <div class="manajemen-laporan-progres-pembangunan__actions-wrapper">
        <div class="manajemen-laporan-progres-pembangunan__actions actions">
          <div class="actions-filters">
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
            <el-button
              v-if="isAnyFilterApplied"
              class="actions__clear-filter-btn"
              link
              @click="clearFilters"
            >
              <img
                :src="icons.arrowCounterClockwise"
                alt=""
              >
              Hapus Semua Filter
            </el-button>
          </div>
          <el-button
            v-if="hasAccess('CREATE_MARKETER')"
            type="primary"
            class="actions__create-btn"
            @click="goToCreatePage"
          >
            Tambah Laporan Progres Pembangunan
            <el-icon class="el-icon--right">
              <Plus />
            </el-icon>
          </el-button>
        </div>
        <div
          v-show="visibleFilter"
          class="manajemen-laporan-progres-pembangunan__filters filters"
        >
          <div class="filters__input-wrapper">
            <div class="filters__label">
              Nama
            </div>
            <el-input
              v-model="filters.search"
              placeholder="Cari laporan progres pembangunan berdasarkan nama"
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

      <div class="manajemen-laporan-progres-pembangunan__table-wrapper">
        <el-table
          v-loading="visibleLoadingTable"
          :data="laporanProgresPembangunans"
          class="manajemen-laporan-progres-pembangunan__table table general-table"
          header-row-class-name="general-table__header-gray"
          stripe
          @row-click="goToDetailPage"
        >
          <el-table-column
            prop="spk_nomor"
            label="Nomor SPK"
            min-width="200"
          />
          <el-table-column
            prop="unit_tipe_nama"
            label="Tipe Unit"
          />
          <el-table-column
            label="Unit"
            min-width="150"
          >
            <template #default="scope">
              {{ scope.row.unit_cluster_nama }} - {{ scope.row.unit_nomor_kavling }}
            </template>
          </el-table-column>
          <el-table-column
            prop="vendor_nama"
            label="Vendor"
          />
          <el-table-column
            prop="harga_progres_sebelumnya"
            label="Harga Sampai Bulan Ini"
            min-width="180"
          >
            <template #default="scope">
              {{ helpers.convertPriceToRupiah(scope.row.harga_progres_sebelumnya) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="persentase_progres_sebelumnya"
            label="Persentase Sampai Bulan Ini"
            min-width="180"
          >
            <template #default="scope">
              {{ helpers.convertDecimalToPercentage(scope.row.persentase_progres_sebelumnya) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="harga_bulan_ini"
            label="Harga Bulan Ini"
            min-width="180"
          >
            <template #default="scope">
              {{ helpers.convertPriceToRupiah(scope.row.harga_bulan_ini) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="persentase_progres_bulan_ini"
            label="Persentase Bulan Ini"
            min-width="180"
          >
            <template #default="scope">
              {{ helpers.convertDecimalToPercentage(scope.row.persentase_progres_bulan_ini) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="harga_progres_total"
            label="Harga Total"
            min-width="180"
          >
            <template #default="scope">
              {{ helpers.convertPriceToRupiah(scope.row.harga_progres_total) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="persentase_progres_total"
            label="Persentase Total"
            min-width="180"
          >
            <template #default="scope">
              {{ helpers.convertDecimalToPercentage(scope.row.persentase_progres_total) }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="hasAccess('UPDATE_MARKETER') || hasAccess('DELETE_MARKETER')"
            label="Action"
            width="90"
            align="center"
            fixed="right"
          >
            <template #default="scope">
              <div class="table__actions">
                <el-button
                  v-if="hasAccess('UPDATE_MARKETER')"
                  :icon="icons.edit"
                  type="primary"
                  class="table__actions-edit"
                  text
                  @click.stop="goToEditPage(scope.row.id)"
                />
                <!-- <el-button
                  v-if="hasAccess('DELETE_MARKETER')"
                  :icon="icons.delete"
                  type="primary"
                  class="table__actions-delete"
                  text
                  @click.stop="openModalConfirmation(scope.row.id)"
                /> -->
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="manajemen-laporan-progres-pembangunan__footer">
          <div class="manajemen-laporan-progres-pembangunan__total-laporan-progres-pembangunans font-grey">
            Menampilkan {{ totalShownLaporanProgresPembangunans }} dari {{ totalLaporanProgresPembangunans }} laporan progres pembangunan
          </div>
          <div class="manajemen-laporan-progres-pembangunan__pagination">
            <el-pagination
              :current-page="pagination.page"
              :page-size="pagination.size"
              :total="totalLaporanProgresPembangunans"
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

<script src="./js/manajemen-laporan-progres-pembangunan.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
@import "~/assets/scss/table.scss";

  .manajemen-laporan-progres-pembangunan {
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

      &__filters {
        display: flex;
        gap: 8px;
      }

      :deep(.actions__clear-filter-btn span) {
        gap: 4px;
      }

      &__filter-btn {
        width: 100px;
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