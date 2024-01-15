<template>
  <div class="manajemen-template-spk">
    <page-header title="Manajemen Template SPK" />
    <div class="manajemen-template-spk__wrapper page-content">
      <div class="manajemen-template-spk__actions-wrapper">
        <div class="manajemen-template-spk__actions actions">
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
            Tambah Template SPK
            <el-icon class="el-icon--right">
              <Plus />
            </el-icon>
          </el-button>
        </div>
        <div
          v-show="visibleFilter"
          class="manajemen-template-spk__filters filters"
        >
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
                v-for="tipe_unit in tipeUnits"
                :key="tipe_unit.id"
                :label="tipe_unit.name"
                :value="tipe_unit.id"
              />
            </el-select>
          </div>
        </div>
      </div>

      <div class="manajemen-template-spk__table-wrapper">
        <el-table
          v-loading="visibleLoadingTable"
          :data="templateSPKs"
          class="manajemen-template-spk__table table general-table"
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
            prop="tipe_unit"
            label="Tipe Unit"
            min-width="150"
          />
          <el-table-column
            prop="harga_total"
            label="Harga Total"
            min-width="150"
          />
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
                <el-button
                  v-if="hasAccess('DELETE_MARKETER')"
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
        <div class="manajemen-template-spk__footer">
          <div class="manajemen-template-spk__total-template-spks font-grey">
            Menampilkan {{ totalShownTemplateSPKs }} dari {{ totalTemplateSPKs }} template SPK
          </div>
          <div class="manajemen-template-spk__pagination">
            <el-pagination
              :current-page="pagination.page"
              :page-size="pagination.size"
              :total="totalTemplateSPKs"
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

<script src="./js/manajemen-template-spk.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
@import "~/assets/scss/table.scss";

  .manajemen-template-spk {
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