<template>
  <div class="manajemen-unit">
    <page-header title="Manajemen Unit" />
    <div class="manajemen-unit__wrapper page-content">
      <div class="manajemen-unit__actions-wrapper">
        <div class="manajemen-unit__actions actions">
          <div class="actions-filters">
            <el-button
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
            v-if="hasAccess('CREATE_UNIT')"
            type="primary"
            class="actions__create-btn"
            @click="goToManajemenUnitCreate"
          >
            Tambah Unit
            <el-icon class="el-icon--right">
              <Plus />
            </el-icon>
          </el-button>
        </div>
        <div
          v-show="visibleFilter"
          class="manajemen-unit__filters filters"
        >
          <div class="filters__input-wrapper">
            <div class="filters__label">
              Cluster
            </div>
            <el-select
              v-model="filters.cluster"
              placeholder="Pilih cluster"
              class="filters__input"
              clearable
              @change="handleFilterChange()"
            >
              <el-option
                v-for="cluster in clusters"
                :key="cluster.code"
                :label="cluster.nama"
                :value="cluster.code"
              />
            </el-select>
          </div>

          <div class="filters__input-wrapper">
            <div class="filters__label">
              Nomor Kavling
            </div>
            <el-input
              v-model="filters.search"
              placeholder="Cari berdasarkan nomor kavling"
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
              Range Harga
            </div>
            <el-slider
              v-model="priceRange"
              :min="minPrice"
              :max="maxPrice"
              :format-tooltip="helpers.convertPriceToRupiah"
              class="filters__slider"
              range
              @change="handleFilterChange()"
            />
          </div>

          <div class="filters__input-wrapper">
            <div class="filters__label">
              Status
            </div>
            <el-select
              v-model="filters.status"
              placeholder="Pilih status"
              class="filters__input"
              clearable
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

      <div class="manajemen-unit__table-wrapper">
        <el-table
          v-loading="visibleLoadingTable"
          :data="units"
          :header-cell-class-name="handleHeaderClass"
          class="manajemen-unit__table table general-table"
          header-row-class-name="general-table__header-gray"
          stripe
          @row-click="goToDetailPage"
          @sort-change="handleSortChange"
        >
          <el-table-column
            prop="cluster.nama"
            label="Cluster"
            min-width="220"
            sortable
          />
          <el-table-column
            prop="nomor_kavling"
            label="Nomor Kavling"
            min-width="220"
            sortable
          />
          <el-table-column
            prop="status"
            label="Status"
            min-width="210"
          >
            <template #default="scope">
              <status-badge
                :color="statuses[scope.row.status]?.color"
                :text="statuses[scope.row.status]?.name"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="harga"
            label="Harga Cash"
            min-width="180"
          >
            <template #default="scope">
              <div>
                {{ helpers.convertPriceToRupiah(scope.row.harga) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="tipe.nama"
            label="Tipe Unit"
            min-width="170"
          />
          <el-table-column
            v-if="hasAccess('UPDATE_UNIT') || hasAccess('DELETE_UNIT')"
            label="Action"
            width="90"
            align="center"
            fixed="right"
          >
            <template #default="scope">
              <div class="table__actions">
                <el-button
                  v-if="hasAccess('UPDATE_UNIT')"
                  :icon="icons.edit"
                  type="primary"
                  class="table__actions-edit"
                  text
                  @click.stop="goToEditPage(scope.row.id)"
                />
                <el-button
                  v-if="hasAccess('DELETE_UNIT')"
                  :icon="icons.delete"
                  type="primary"
                  class="table__actions-delete"
                  text
                  @click.stop="openModalConfirmation(scope.row.id)"
                />
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="manajemen-unit__footer">
          <div class="manajemen-unit__total-units font-grey">
            Menampilkan {{ totalShownUnits }} dari {{ totalUnits }} unit
          </div>
          <div class="manajemen-unit__pagination">
            <el-pagination
              :current-page="pagination.page"
              :page-size="pagination.size"
              :total="totalUnits"
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

<script src="./js/manajemen-unit.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
@import "~/assets/scss/table.scss";

  .manajemen-unit {
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
        width: 150px;
      }
    }

    .filters {
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #E3EADC;
      background: #F6F8F4;
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 16px;

      &__label {
        margin-bottom: 8px;
        color: #434343;
        font-family: Plus Jakarta Sans;
        font-size: 12px;
        font-weight: 600;
      }

      &__input, &__slider {
        width: 265px;
      }

      &__slider {
        padding: 0 10px;
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