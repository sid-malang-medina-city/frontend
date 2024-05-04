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
            v-if="hasAccess('CREATE_LAPORAN_PROGRES_PEMBANGUNAN')"
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
              No SPK/Unit
            </div>
            <el-input
              v-model="filters.search"
              placeholder="Cari berdasarkan no SPK/Unit"
              class="filters__input"
              @keyup="debounceDelay(() => handleFilterChange())"
            >
              <template #suffix>
                <el-icon class="el-input__icon"><Search /></el-icon>
              </template>
            </el-input>
          </div>
          <div class="filters__input-wrapper">
            <div class="filters__label">
              Tipe Unit
            </div>
            <el-select
              v-model="filters.tipe_unit"
              placeholder="Pilih tipe unit"
              class="filters__input"
              clearable
              @change="handleFilterChange()"
            >
              <el-option
                v-for="tipeUnit in tipeUnits"
                :key="tipeUnit.id"
                :label="tipeUnit.nama"
                :value="tipeUnit.id"
              />
            </el-select>
          </div>
          <div class="filters__input-wrapper">
            <div class="filters__label">
              Bulan
            </div>
            <el-date-picker
              v-model="bulanValue"
              :clearable="false"
              type="monthrange"
              range-separator="-"
              start-placeholder="Bulan awal"
              end-placeholder="Bulan akhir"
              format="MM-YYYY"
              value-format="YYYY-MM-DD"
              @change="handleMonthRangeChange"
            />
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
            prop=""
            label="Bulan (Termin)"
            min-width="150"
          >
            <template #default="scope">
              {{ getMonth(scope.row.tanggal) }} (Ke-{{ scope.row.termin }})
            </template>
          </el-table-column>
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
            min-width="170"
          />
          <el-table-column
            prop="status"
            label="Status"
            min-width="100"
          >
            <template #default="scope">
              <status-badge
                v-if="statuses.hasOwnProperty(scope.row.status)"
                :color="statuses[scope.row.status].color"
                :text="statuses[scope.row.status].name"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="harga_progres_sebelumnya"
            label="Harga Sebelumnya"
            min-width="180"
          >
            <template #default="scope">
              <el-tooltip
                :content="helpers.convertPriceToRupiah(scope.row.harga_progres_sebelumnya, true, scope.row.hasOwnProperty('actions'), true)"
                class="box-item"
                effect="dark"
                placement="top"
              >
                {{ helpers.convertPriceToRupiah(scope.row.harga_progres_sebelumnya, true, scope.row.hasOwnProperty('actions')) }}
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="persentase_progres_sebelumnya"
            label="Persentase Sebelumnya"
            min-width="180"
          >
            <template #default="scope">
              <el-tooltip
                :content="helpers.convertDecimalToPercentage(scope.row.persentase_progres_sebelumnya, scope.row.hasOwnProperty('actions'), true)"
                class="box-item"
                effect="dark"
                placement="top"
              >
                {{ helpers.convertDecimalToPercentage(scope.row.persentase_progres_sebelumnya, scope.row.hasOwnProperty('actions')) }}
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="harga_bulan_ini"
            label="Harga Bulan Ini"
            min-width="180"
          >
            <template #default="scope">
              <el-tooltip
                :content="helpers.convertPriceToRupiah(scope.row.harga_bulan_ini, true, scope.row.hasOwnProperty('actions'), true)"
                class="box-item"
                effect="dark"
                placement="top"
              >
                {{ helpers.convertPriceToRupiah(scope.row.harga_bulan_ini, true, scope.row.hasOwnProperty('actions')) }}
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="persentase_progres_bulan_ini"
            label="Persentase Bulan Ini"
            min-width="180"
          >
            <template #default="scope">
              <el-tooltip
                :content="helpers.convertDecimalToPercentage(scope.row.persentase_progres_bulan_ini, scope.row.hasOwnProperty('actions'), true)"
                class="box-item"
                effect="dark"
                placement="top"
              >
                {{ helpers.convertDecimalToPercentage(scope.row.persentase_progres_bulan_ini, scope.row.hasOwnProperty('actions')) }}
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="harga_progres_total"
            label="Harga Total"
            min-width="180"
          >
            <template #default="scope">
              <el-tooltip
                :content="helpers.convertPriceToRupiah(scope.row.harga_progres_total, true, scope.row.hasOwnProperty('actions'), true)"
                class="box-item"
                effect="dark"
                placement="top"
              >
                {{ helpers.convertPriceToRupiah(scope.row.harga_progres_total, true, scope.row.hasOwnProperty('actions')) }}
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="persentase_progres_total"
            label="Persentase Total"
            min-width="180"
          >
            <template #default="scope">
              <el-tooltip
                :content="helpers.convertDecimalToPercentage(scope.row.persentase_progres_total, scope.row.hasOwnProperty('actions'), true)"
                class="box-item"
                effect="dark"
                placement="top"
              >
                {{ helpers.convertDecimalToPercentage(scope.row.persentase_progres_total, scope.row.hasOwnProperty('actions')) }}
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            v-if="hasAccess('UPDATE_LAPORAN_PROGRES_PEMBANGUNAN')"
            label="Action"
            width="90"
            align="center"
            fixed="right"
            @click.stop="() => {}"
          >
            <template #default="scope">
              <div class="table__actions" @click.stop="() => {}">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link actions__trigger">
                    <el-icon class="el-icon--right">
                      <more-filled />
                    </el-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu class="actions__dropdown-menu">
                      <div class="actions__generate-wrapper">
                        <el-icon class="actions__generate-icon">
                          <Stamp />
                        </el-icon>
                        <div class="actions__generate">
                          Generate
                        </div>
                      </div>
                      <el-dropdown-item @click="generateLaporanProgresPembangunanPDF(scope.row.id, 'LPP')">Laporan Progress Pembangunan</el-dropdown-item>
                      <el-dropdown-item @click="generateLaporanProgresPembangunanPDF(scope.row.id, 'LPP_PO')">PO</el-dropdown-item>
                      <el-dropdown-item @click="generateLaporanProgresPembangunanPDF(scope.row.id, 'LPP_KWITANSI')">Kwitansi</el-dropdown-item>
                      <div
                        v-if="!!scope.row.lpp_url || !!scope.row.po_url || !!scope.row.kwitansi_url"
                        class="actions__preview-wrapper"
                      >
                        <el-icon class="actions__preview-icon">
                          <View />
                        </el-icon>
                        <div class="actions__preview">
                          Preview
                        </div>
                      </div>
                      <el-dropdown-item
                        v-if="!!scope.row.lpp_url"
                        @click="openDocumentInNewTab(scope.row.lpp_access_url)"
                      >
                        Laporan Progres Pembangunan
                      </el-dropdown-item>
                      <el-dropdown-item
                        v-if="!!scope.row.po_url"
                        @click="openDocumentInNewTab(scope.row.po_access_url)"
                      >
                        PO
                      </el-dropdown-item>
                      <el-dropdown-item
                        v-if="!!scope.row.kwitansi_url"
                        @click="openDocumentInNewTab(scope.row.kwitansi_access_url)"
                      >
                        Kwitansi
                      </el-dropdown-item>
                      <div
                        v-if="hasAccess('UPDATE_LAPORAN_PROGRES_PEMBANGUNAN') && scope.row.status !== 'FINAL'"
                        class="actions__other-wrapper"
                      >
                        <el-icon class="actions__other-icon">
                          <Document />
                        </el-icon>
                        <div class="actions__preview">
                          Other
                        </div>
                      </div>
                      <el-dropdown-item
                        v-if="hasAccess('UPDATE_LAPORAN_PROGRES_PEMBANGUNAN') && scope.row.status !== 'FINAL'"
                        @click.stop="goToEditPage(scope.row.id)"
                      >
                        Edit
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
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
      flex-wrap: wrap;
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

    :deep(.el-range-editor) {
      box-sizing: border-box;
      width: 400px;
    }
  }

  .actions {
    &__trigger {
      cursor: pointer;
    }

    &__dropdown-menu {
      padding: 0;
    }

    &__generate-wrapper, &__preview-wrapper, &__other-wrapper {
      display: flex;
      padding: 6px 12px;
      align-items: center;
      gap: 6px;
      align-self: stretch;
      border-bottom: 0.5px solid #E9E9E9;
      background: #FAFAFA;
      color: var(--Neutral-Gray-400, #9D9D9D);
      font-size: 11px;
      font-weight: 600;
      line-height: 20px;
    }
  }
</style>