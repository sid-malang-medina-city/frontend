<template>
  <div class="manajemen-user">
    <page-header title="Manajemen User" />
    <div class="manajemen-user__wrapper page-content">
      <div class="manajemen-user__actions-wrapper">
        <div class="manajemen-user__actions actions">
          <div class="actions__filters">
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
            v-if="hasAccess('CREATE_USER')"
            type="primary"
            class="actions__create-btn"
            @click="goToCreatePage"
          >
            Tambah User
            <el-icon class="el-icon--right">
              <Plus />
            </el-icon>
          </el-button>
        </div>
        <div
          v-if="visibleFilter"
          class="manajemen-user__filters filters"
        >
          <div class="filters__input-wrapper">
            <div class="filters__label">
              Nama/Email
            </div>
            <el-input
              v-model="filters.search"
              placeholder="Cari berdasarkan nama/email"
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
              Divisi
            </div>
            <el-select
              v-model="filters.division"
              placeholder="Pilih divisi"
              class="filters__input"
              clearable
              @change="handleFilterChange()"
            >
              <el-option
                v-for="division in divisions"
                :key="division.code"
                :label="division.name"
                :value="division.code"
              />
            </el-select>
          </div>

          <div class="filters__input-wrapper">
            <div class="filters__label">
              Role
            </div>
            <el-select
              v-model="filters.role"
              placeholder="Pilih role"
              class="filters__input"
              clearable
              @change="handleFilterChange()"
            >
              <el-option
                v-for="role in roles"
                :key="role.code"
                :label="role.name"
                :value="role.code"
              />
            </el-select>
          </div>
        </div>
      </div>

      <div class="manajemen-user__table-wrapper">
        <el-table
          v-loading="visibleLoadingTable"
          :data="users"
          class="manajemen-user__table table general-table"
          header-row-class-name="general-table__header-gray"
          stripe
          @row-click="goToDetailPage"
        >
          <el-table-column
            prop="name"
            label="Nama"
            min-width="220"
          />
          <el-table-column
            prop="email"
            label="Email"
            min-width="210"
          />
          <el-table-column
            prop="division.name"
            label="Divisi"
            min-width="180"
          />
          <el-table-column
            prop="role.name"
            label="Role"
            min-width="170"
          />
          <el-table-column
            v-if="hasAccess('UPDATE_USER') || hasAccess('DELETE_USER')"
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
                <!-- <el-button
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
        <div class="manajemen-user__footer">
          <div class="manajemen-user__total-users font-grey">
            Showing {{ totalShownUsers }} of {{ totalUsers }} user
          </div>
          <div class="manajemen-user__pagination">
            <el-pagination
              :current-page="pagination.page"
              :page-size="pagination.size"
              :total="totalUsers"
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

<script src="./js/manajemen-user.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
@import "~/assets/scss/table.scss";

  .manajemen-user {
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
        width: 265px;
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