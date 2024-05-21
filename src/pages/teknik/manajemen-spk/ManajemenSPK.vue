<template>
  <div class="manajemen-spk">
    <page-header title="Manajemen SPK" />
    <div class="manajemen-spk__wrapper page-content">
      <div class="manajemen-spk__actions-wrapper">
        <div class="manajemen-spk__actions actions">
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
            v-if="hasAccess('CREATE_SPK')"
            type="primary"
            class="actions__create-btn"
            @click="goToCreatePage"
          >
            Tambah SPK
            <el-icon class="el-icon--right">
              <Plus />
            </el-icon>
          </el-button>
        </div>
        <div
          v-show="visibleFilter"
          class="manajemen-spk__filters filters"
        >
          <div class="filters__input-wrapper">
            <div class="filters__label">
              No SPK/Unit
            </div>
            <el-input
              v-model="filters.search"
              placeholder="Cari berdasarkan no SPK atau unit"
              class="filters__input"
              @keyup="debounceDelay(() => handleFilterChange())"
            >
              <template #suffix>
                <el-icon class="el-input__icon"><Search /></el-icon>
              </template>
            </el-input>
          </div>
          <!-- <div class="filters__input-wrapper">
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
                v-for="tipe_unit in tipeUnits"
                :key="tipe_unit.id"
                :label="tipe_unit.nama"
                :value="tipe_unit.id"
              />
            </el-select>
          </div> -->
        </div>
      </div>

      <div class="manajemen-spk__table-wrapper">
        <el-table
          v-loading="visibleLoadingTable"
          :data="SPKs"
          class="manajemen-spk__table table general-table"
          header-row-class-name="general-table__header-gray"
          stripe
          @row-click="goToDetailPage"
        >
          <el-table-column
            prop="nomor"
            label="Nomor SPK"
            min-width="200"
          />
          <el-table-column
            prop="unit_tipe_nama"
            label="Tipe Unit"
            min-width="100"
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
            min-width="150"
          />
          <el-table-column
            prop="harga_total"
            label="Harga Total"
            min-width="150"
          >
            <template #default="scope">
              <el-tooltip
                :content="helpers.convertPriceToRupiah(scope.row.harga_total, true, scope.row.hasOwnProperty('actions'), true)"
                class="box-item"
                effect="dark"
                placement="top"
              >
                {{ helpers.convertPriceToRupiah(scope.row.harga_total, true, scope.row.hasOwnProperty('actions')) }}
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="persentase_progres_total"
            label="Persentase Total"
            min-width="150"
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
            prop="status"
            label="Status"
            min-width="100"
          >
            <template #default="scope">
              <status-badge
                :color="statuses[scope.row.status].color"
                :text="statuses[scope.row.status].name"
              />
            </template>
          </el-table-column>
          <el-table-column
            v-if="hasAccess('UPDATE_SPK')"
            label="Action"
            width="90"
            align="center"
            fixed="right"
            @click.stop="() => {}"
          >
            <template #default="scope">
              <div class="table__actions actions" @click.stop="() => {}">
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
                      <el-dropdown-item @click="generateSPKPDF(scope.row.id)">PDF</el-dropdown-item>
                      <div
                        v-if="!!scope.row.spk_access_url"
                        class="actions__preview-wrapper"
                      >
                        <el-icon class="actions__preview-icon">
                          <View />
                        </el-icon>
                        <div class="actions__preview">
                          Preview
                        </div>
                      </div>
                      <el-dropdown-item v-if="!!scope.row.spk_access_url" @click="openDocumentInNewTab(scope.row.spk_access_url)">
                        PDF
                      </el-dropdown-item>
                      <div
                        v-if="hasAccess('UPDATE_SPK')"
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
                        v-if="hasAccess('UPDATE_SPK')"
                        @click.stop="goToEditPage(scope.row.id)"
                      >
                        Edit
                      </el-dropdown-item>
                      <el-dropdown-item
                        v-if="hasAccess('DELETE_SPK')"
                        @click.stop="openModalConfirmation(scope.row.id)"
                      >
                        Delete
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="manajemen-spk__footer">
          <div class="manajemen-spk__total-spks font-grey">
            Menampilkan {{ totalShownSPKs }} dari {{ totalSPKs }} SPK
          </div>
          <div class="manajemen-spk__pagination">
            <el-pagination
              :current-page="pagination.page"
              :page-size="pagination.size"
              :total="totalSPKs"
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

<script src="./js/manajemen-spk.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
@import "~/assets/scss/table.scss";

  .manajemen-spk {
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

      .actions {
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