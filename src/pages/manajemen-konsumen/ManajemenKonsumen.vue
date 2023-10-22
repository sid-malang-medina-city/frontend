<template>
  <div class="manajemen-konsumen">
    <page-header title="Manajemen Konsumen" />
    <div class="manajemen-konsumen__wrapper page-content">
      <div class="manajemen-konsumen__actions-wrapper">
        <div class="manajemen-konsumen__actions actions">
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
            v-if="hasAccess('CREATE_KONSUMEN')"
            type="primary"
            class="actions__create-btn"
            @click="goToCreatePage"
          >
            Tambah Konsumen
            <el-icon class="el-icon--right">
              <Plus />
            </el-icon>
          </el-button>
        </div>
        <div
          v-if="visibleFilter"
          class="manajemen-konsumen__filters filters"
        >
          <div class="filters__input-wrapper">
            <div class="filters__label">
              Nama/Email
            </div>
            <el-input
              v-model="filters.search"
              placeholder="Cari konsumen berdasarkan nama/email"
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
              v-model="filters.status"
              placeholder="Pilih status konsumen"
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

      <div class="manajemen-konsumen__table-wrapper">
        <el-table
          v-loading="visibleLoadingTable"
          :data="konsumens"
          class="manajemen-konsumen__table table general-table"
          header-row-class-name="general-table__header-gray"
          stripe
          @row-click="goToDetailPage"
        >
          <el-table-column
            prop="nama"
            label="Nama"
            min-width="120"
          />
          <el-table-column
            prop="email"
            label="Email"
            min-width="210"
          />
          <el-table-column
            prop="alamat"
            label="Alamat"
            min-width="250"
          />
          <el-table-column
            prop="status"
            label="Status"
            min-width="210"
          >
            <template #default="scope">
              <status-badge
                :color="statuses[scope.row.status].color"
                :text="statuses[scope.row.status].name"
              />
            </template>
          </el-table-column>
          <el-table-column
            v-if="hasAccess('UPDATE_KONSUMEN') || hasAccess('DELETE_KONSUMEN')"
            label="Action"
            width="90"
            align="center"
            fixed="right"
          >
            <template #default="scope">
              <div class="table__actions">
                <el-button
                  v-if="hasAccess('UPDATE_KONSUMEN')"
                  :icon="icons.edit"
                  type="primary"
                  class="table__actions-edit"
                  text
                  @click.stop="goToEditPage(scope.row.id)"
                />
                <el-button
                  v-if="hasAccess('DELETE_KONSUMEN')"
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
        <div class="manajemen-konsumen__footer">
          <div class="manajemen-konsumen__total-konsumens font-grey">
            Showing {{ totalShownKonsumens }} of {{ totalKonsumens }} konsumen
          </div>
          <div class="manajemen-konsumen__pagination">
            <el-pagination
              :current-page="pagination.page"
              :page-size="pagination.size"
              :total="totalKonsumens"
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

<script src="./js/manajemen-konsumen.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
@import "~/assets/scss/table.scss";

  .manajemen-konsumen {
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