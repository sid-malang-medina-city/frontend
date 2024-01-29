<template>
  <div class="manajemen-vendor">
    <page-header title="Manajemen Vendor" />
    <div class="manajemen-vendor__wrapper page-content">
      <div class="manajemen-vendor__actions-wrapper">
        <div class="manajemen-vendor__actions actions">
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
            v-if="hasAccess('CREATE_VENDOR')"
            type="primary"
            class="actions__create-btn"
            @click="goToCreatePage"
          >
            Tambah Vendor
            <el-icon class="el-icon--right">
              <Plus />
            </el-icon>
          </el-button>
        </div>
        <div
          v-show="visibleFilter"
          class="manajemen-vendor__filters filters"
        >
          <div class="filters__input-wrapper">
            <div class="filters__label">
              Nama
            </div>
            <el-input
              v-model="filters.search"
              placeholder="Cari vendor berdasarkan nama"
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

      <div class="manajemen-vendor__table-wrapper">
        <el-table
          v-loading="visibleLoadingTable"
          :data="vendors"
          class="manajemen-vendor__table table general-table"
          header-row-class-name="general-table__header-gray"
          stripe
          @row-click="goToDetailPage"
        >
          <el-table-column
            prop="nama"
            label="Nama"
            min-width="200"
          />
          <el-table-column
            prop="jabatan"
            label="Jabatan"
            min-width="150"
          />
          <el-table-column
            prop="alamat"
            label="Alamat"
            min-width="150"
          />
          <el-table-column
            v-if="hasAccess('UPDATE_VENDOR')"
            label="Action"
            width="90"
            align="center"
            fixed="right"
          >
            <template #default="scope">
              <div class="table__actions">
                <el-button
                  v-if="hasAccess('UPDATE_VENDOR')"
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
        <div class="manajemen-vendor__footer">
          <div class="manajemen-vendor__total-vendors font-grey">
            Menampilkan {{ totalShownVendors }} dari {{ totalVendors }} vendor
          </div>
          <div class="manajemen-vendor__pagination">
            <el-pagination
              :current-page="pagination.page"
              :page-size="pagination.size"
              :total="totalVendors"
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

<script src="./js/manajemen-vendor.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
@import "~/assets/scss/table.scss";

  .manajemen-vendor {
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