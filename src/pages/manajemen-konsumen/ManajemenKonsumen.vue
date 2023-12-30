<template>
  <div class="manajemen-konsumen">
    <page-header title="Manajemen Konsumen" />
    <div class="manajemen-konsumen__wrapper page-content">
      <div class="manajemen-konsumen__actions-wrapper">
        <div class="manajemen-konsumen__actions actions">
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
              Nama
            </div>
            <el-input
              v-model="filters.search"
              placeholder="Cari konsumen berdasarkan nama"
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
              Status Verifikasi
            </div>
            <el-select
              v-model="filters.status_verifikasi"
              placeholder="Pilih status verifikasi"
              class="filters__input"
              clearable
              @change="handleFilterChange()"
            >
              <el-option
                v-for="status in verificationStatuses"
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
            prop="alamat"
            label="Alamat"
            min-width="250"
          />
          <el-table-column
            prop="status_verifikasi"
            label="Status Verifikasi"
            min-width="210"
          >
            <template #default="scope">
              <status-badge
                :color="verificationStatuses[scope.row.status_verifikasi].color"
                :text="verificationStatuses[scope.row.status_verifikasi].name"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="status_pembayaran"
            label="Status Pembayaran"
            min-width="210"
          >
            <template #default="scope">
              <status-badge
                :color="paymentStatuses[scope.row.status_pembayaran].color"
                :text="paymentStatuses[scope.row.status_pembayaran].name"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="tanggal_booking"
            label="Tanggal Booking"
            min-width="150"
          >
            <template #default="scope">
              {{ helpers.convertDateTimeZoneToDateString(scope.row.tanggal_booking) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="marketer_nama"
            label="Marketer"
            min-width="120"
          >
            <template #default="scope">
              <div
                class="table__link"
                @click.stop="goToMarketerDetailPage(scope.row.dokumen_konsumen_marketer_id)"
              >
                <u>{{ scope.row.marketer_nama }}</u>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="unit_cluster_nama"
            label="Unit"
            min-width="120"
          >
            <template #default="scope">
              <div
                v-if="!!scope.row.dokumen_konsumen_unit_id"
                class="table__link"
                @click.stop="goToUnitDetailPage(scope.row.dokumen_konsumen_unit_id)"
              >
                <u>{{ scope.row.unit_cluster_nama }} - {{ scope.row.unit_nomor_kavling }}</u>
              </div>
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
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="manajemen-konsumen__footer">
          <div class="manajemen-konsumen__total-konsumens font-grey">
            Menampilkan {{ totalShownKonsumens }} dari {{ totalKonsumens }} konsumen
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

      &__link {
        cursor: pointer;
        width: fit-content;
      }

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