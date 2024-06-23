<template>
  <div class="manajemen-laporan-progres-po">
    <page-header title="Manajemen Laporan Progres PO" />
    <div class="manajemen-laporan-progres-po__wrapper page-content">
      <div class="manajemen-laporan-progres-po__actions-wrapper">
        <div class="manajemen-laporan-progres-po__actions actions">
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
            v-if="hasAccess('CREATE_PO_SUPPLIER')"
            type="primary"
            class="actions__create-btn"
            @click="goToCreatePage"
          >
            Tambah Laporan Progres PO
            <el-icon class="el-icon--right">
              <Plus />
            </el-icon>
          </el-button>
        </div>
        <div
          v-show="visibleFilter"
          class="manajemen-laporan-progres-po__filters filters"
        >
          <div class="filters__input-wrapper">
            <div class="filters__label">
              No Laporan Progres PO
            </div>
            <el-input
              v-model="filters.search"
              placeholder="Cari berdasarkan no Laporan Progres PO supplier"
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

      <div class="manajemen-laporan-progres-po__table-wrapper">
        <el-table
          v-loading="visibleLoadingTable"
          :data="laporanProgresPOs"
          class="manajemen-laporan-progres-po__table table general-table"
          header-row-class-name="general-table__header-gray"
          stripe
          @row-click="goToDetailPage"
        >
          <el-table-column
            prop="po_nomor"
            label="Nomor Laporan Progres PO"
            min-width="200"
          />
          <el-table-column
            prop="tanggal"
            label="Periode"
            min-width="100"
          />
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
            v-if="hasAccess('UPDATE_PO_SUPPLIER')"
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
                      <el-dropdown-item @click="generateLaporanProgresPOPDF(scope.row.id)">PDF</el-dropdown-item>
                      <div
                        v-if="!!scope.row.progres_po_access_url"
                        class="actions__preview-wrapper"
                      >
                        <el-icon class="actions__preview-icon">
                          <View />
                        </el-icon>
                        <div class="actions__preview">
                          Preview
                        </div>
                      </div>
                      <el-dropdown-item v-if="!!scope.row.progres_po_access_url" @click="openDocumentInNewTab(scope.row.progres_po_access_url)">
                        PDF
                      </el-dropdown-item>
                      <div
                        v-if="hasAccess('UPDATE_PO_SUPPLIER') && scope.row.status !== 'FINAL'"
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
                        v-if="hasAccess('UPDATE_PO_SUPPLIER')"
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
        <div class="manajemen-laporan-progres-po__footer">
          <div class="manajemen-laporan-progres-po__total-pos font-grey">
            Menampilkan {{ totalShownLaporanProgresPOs }} dari {{ totalLaporanProgresPOs }} Laporan Progres PO
          </div>
          <div class="manajemen-laporan-progres-po__pagination">
            <el-pagination
              :current-page="pagination.page"
              :page-size="pagination.size"
              :total="totalLaporanProgresPOs"
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

<script src="./js/manajemen-laporan-progres-po.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
@import "~/assets/scss/table.scss";

  .manajemen-laporan-progres-po {
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