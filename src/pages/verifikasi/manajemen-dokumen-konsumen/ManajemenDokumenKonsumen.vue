<template>
  <div class="manajemen-dokumen-konsumen">
    <page-header title="Manajemen Dokumen Konsumen" />
    <div class="manajemen-dokumen-konsumen__wrapper page-content">
      <div class="manajemen-dokumen-konsumen__actions-wrapper">
        <div class="manajemen-dokumen-konsumen__actions actions">
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
        </div>
        <div
          v-if="visibleFilter"
          class="manajemen-dokumen-konsumen__filters filters"
        >
          <div class="filters__input-wrapper">
            <div class="filters__label">
              ID/Nama Marketer/Konsumen/Unit
            </div>
            <el-input
              v-model="filters.search"
              placeholder="Cari berdasarkan ID atau nama"
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

          <div class="filters__input-wrapper">
            <div class="filters__label">
              Status Pembayaran
            </div>
            <el-select
              v-model="filters.status_pembayaran"
              placeholder="Pilih status pembayaran"
              class="filters__input"
              clearable
              @change="handleFilterChange()"
            >
              <el-option
                v-for="status in paymentStatuses"
                :key="status.code"
                :label="status.name"
                :value="status.code"
              />
            </el-select>
          </div>
          
          
          <div class="filters__input-wrapper">
            <div class="filters__label">
              Tanggal Booking
            </div>
            <el-date-picker
              v-model="tanggalBookingValue"
              :clearable="false"
              type="daterange"
              range-separator="-"
              start-placeholder="Tanggal awal"
              end-placeholder="Tanggal akhir"
              format="DD-MM-YYYY"
              value-format="YYYY-MM-DD"
              @change="handleDateRangeChange"
            />
          </div>
        </div>
      </div>

      <div class="manajemen-dokumen-konsumen__table-wrapper">
        <el-table
          v-loading="visibleLoadingTable"
          :data="dokumenKonsumens"
          class="manajemen-dokumen-konsumen__table table general-table"
          row-class-name="table__row"
          header-row-class-name="general-table__header-gray"
          stripe
          @row-click="goToDetailPage"
        >
          <el-table-column
            prop="id"
            label="ID"
            min-width="100"
          />
          <el-table-column
            prop="konsumen_nama"
            label="Nama Konsumen"
            min-width="220"
          >
            <template #default="scope">
              <div
                class="table__link"
                @click.stop="goToKonsumenDetailPage(scope.row.konsumen_id)"
              >
                <u>{{ scope.row.konsumen_nama }}</u>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="laporan_marketing_id"
            label="ID Laporan Marketing"
            min-width="210"
          >
            <template #default="scope">
              <div
                class="table__link"
                @click.stop="goToLaporanMarketingDetailPage(scope.row.laporan_marketing_id)"
              >
                <u>{{ scope.row.laporan_marketing_id }}</u>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="unit_nomor_kavling"
            label="Unit"
            min-width="180"
          >
            <template #default="scope">
              <div
                class="table__link"
                @click.stop="goToUnitDetailPage(scope.row.unit_id)"
              >
                <u>{{ scope.row.unit_cluster_nama }} - {{ scope.row.unit_nomor_kavling }}</u>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="status_verifikasi"
            label="Status Verifikasi"
            min-width="170"
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
            min-width="170"
          >
            <template #default="scope">
              <status-badge
                :color="paymentStatuses[scope.row.status_pembayaran].color"
                :text="paymentStatuses[scope.row.status_pembayaran].name"
              />
            </template>
          </el-table-column>
          <el-table-column
            v-if="hasAccess('LIST_FILEVIEW_DOKUMEN_KONSUMEN')"
            prop="e_ktp_access_url"
            label="e-KTP"
            min-width="170"
          >
            <template #default="scope">
              <img
                v-if="scope.row.e_ktp_access_url"
                :src="scope.row.e_ktp_access_url"
                alt="e-KTP"
                class="table__img"
              >
              <div
                v-else
                class="table__img-empty-state-wrapper"
              >
                <img
                  :src="imagesIcon"
                  alt="e-KTP"
                  class="table__img-empty-state"
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="hasAccess('LIST_CHECKBOX_DOKUMEN_KONSUMEN')"
            prop="e_ktp"
            label="e-KTP"
            min-width="170"
          >
            <template #default="scope">
              <el-icon
                v-if="!!scope.row.e_ktp"
                color="#74C627"
              >
                <CircleCheckFilled />
              </el-icon>
              <el-icon
                v-else
                color="#FF613A"
              >
                <CircleCloseFilled />
              </el-icon>
            </template>
          </el-table-column>
          <el-table-column
            v-if="hasAccess('LIST_FILEVIEW_DOKUMEN_KONSUMEN')"
            prop="kartu_keluarga_access_url"
            label="Kartu Keluarga"
            min-width="170"
          >
            <template #default="scope">
              <img
                v-if="scope.row.kartu_keluarga_access_url"
                :src="scope.row.kartu_keluarga_access_url"
                alt="Kartu Keluarga"
                class="table__img"
              >
              <div
                v-else
                class="table__img-empty-state-wrapper"
              >
                <img
                  :src="imagesIcon"
                  alt="Kartu Keluarga"
                  class="table__img-empty-state"
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="hasAccess('LIST_CHECKBOX_DOKUMEN_KONSUMEN')"
            prop="kartu_keluarga"
            label="Kartu Keluarga"
            min-width="170"
          >
            <template #default="scope">
              <el-icon
                v-if="!!scope.row.kartu_keluarga"
                color="#74C627"
              >
                <CircleCheckFilled />
              </el-icon>
              <el-icon
                v-else
                color="#FF613A"
              >
                <CircleCloseFilled />
              </el-icon>
            </template>
          </el-table-column>
          <el-table-column
            v-if="hasAccess('LIST_FILEVIEW_DOKUMEN_KONSUMEN')"
            prop="slip_gaji_access_url"
            label="Slip Gaji"
            min-width="170"
          >
            <template #default="scope">
              <img
                v-if="scope.row.slip_gaji_access_url"
                :src="scope.row.slip_gaji_access_url"
                alt="Slip Gaji"
                class="table__img"
              >
              <div
                v-else
                class="table__img-empty-state-wrapper"
              >
                <img
                  :src="imagesIcon"
                  alt="Slip Gaji"
                  class="table__img-empty-state"
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="hasAccess('LIST_CHECKBOX_DOKUMEN_KONSUMEN')"
            prop="slip_gaji"
            label="Slip Gaji"
            min-width="170"
          >
            <template #default="scope">
              <el-icon
                v-if="!!scope.row.slip_gaji"
                color="#74C627"
              >
                <CircleCheckFilled />
              </el-icon>
              <el-icon
                v-else
                color="#FF613A"
              >
                <CircleCloseFilled />
              </el-icon>
            </template>
          </el-table-column>
          <el-table-column
            v-if="hasAccess('LIST_FILEVIEW_DOKUMEN_KONSUMEN')"
            prop="mutasi_tabungan_access_url"
            label="Mutasi Tabungan"
            min-width="170"
          >
            <template #default="scope">
              <img
                v-if="scope.row.mutasi_tabungan_access_url"
                :src="scope.row.mutasi_tabungan_access_url"
                alt="Mutasi Tabungan"
                class="table__img"
              >
              <div
                v-else
                class="table__img-empty-state-wrapper"
              >
                <img
                  :src="imagesIcon"
                  alt="Mutasi Tabungan"
                  class="table__img-empty-state"
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="hasAccess('LIST_CHECKBOX_DOKUMEN_KONSUMEN')"
            prop="mutasi_tabungan"
            label="Mutasi Tabungan"
            min-width="170"
          >
            <template #default="scope">
              <el-icon
                v-if="!!scope.row.mutasi_tabungan"
                color="#74C627"
              >
                <CircleCheckFilled />
              </el-icon>
              <el-icon
                v-else
                color="#FF613A"
              >
                <CircleCloseFilled />
              </el-icon>
            </template>
          </el-table-column>
          <el-table-column
            v-if="hasAccess('LIST_FILEVIEW_DOKUMEN_KONSUMEN')"
            prop="surat_pernikahan_access_url"
            label="Surat Pernikahan"
            min-width="170"
          >
            <template #default="scope">
              <img
                v-if="scope.row.surat_pernikahan_access_url"
                :src="scope.row.surat_pernikahan_access_url"
                alt="Surat Pernikahan"
                class="table__img"
              >
              <div
                v-else
                class="table__img-empty-state-wrapper"
              >
                <img
                  :src="imagesIcon"
                  alt="Surat Pernikahan"
                  class="table__img-empty-state"
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="hasAccess('LIST_CHECKBOX_DOKUMEN_KONSUMEN')"
            prop="surat_pernikahan"
            label="Surat Pernikahan"
            min-width="170"
          >
            <template #default="scope">
              <el-icon
                v-if="!!scope.row.surat_pernikahan"
                color="#74C627"
              >
                <CircleCheckFilled />
              </el-icon>
              <el-icon
                v-else
                color="#FF613A"
              >
                <CircleCloseFilled />
              </el-icon>
            </template>
          </el-table-column>
          <el-table-column
            v-if="hasAccess('LIST_FILEVIEW_DOKUMEN_KONSUMEN')"
            prop="dokumen_pendukung"
            label="Dokumen Pendukung"
            min-width="170"
          >
            <template #default="scope">
              <div
                v-if="scope.row.dokumen_pendukung_access_url"
                class="table__link"
                @click.stop="openDocumentInNewTab(scope.row.dokumen_pendukung_access_url)"
              >
                <u>
                  View
                </u>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="hasAccess('LIST_CHECKBOX_DOKUMEN_KONSUMEN')"
            prop="dokumen_pendukung"
            label="Dokumen Pendukung"
            min-width="170"
          >
            <template #default="scope">
              <el-icon
                v-if="!!scope.row.dokumen_pendukung"
                color="#74C627"
              >
                <CircleCheckFilled />
              </el-icon>
              <el-icon
                v-else
                color="#FF613A"
              >
                <CircleCloseFilled />
              </el-icon>
            </template>
          </el-table-column>
          <el-table-column
            v-if="hasAccess('UPDATE_DOKUMEN_KONSUMEN')"
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
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="manajemen-dokumen-konsumen__footer">
          <div class="manajemen-dokumen-konsumen__total-dokumen-konsumens font-grey">
            Showing {{ totalShownDokumenKonsumens }} of {{ totalDokumenKonsumens }} dokumen konsumen
          </div>
          <div class="manajemen-dokumen-konsumen__pagination">
            <el-pagination
              :current-page="pagination.page"
              :page-size="pagination.size"
              :total="totalDokumenKonsumens"
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

<script src="./js/manajemen-dokumen-konsumen.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
@import "~/assets/scss/table.scss";

  .manajemen-dokumen-konsumen {
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
      gap: 16px;
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

    :deep(.table__row) {
      height: 67px;
    }

    .table {
      margin-bottom: 24px;

      &__link {
        cursor: pointer;
        width: fit-content;
      }

      &__img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 6px;
        display: flex;
        align-items: center;
      }

      &__img-empty-state-wrapper {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        border: 0.8px solid #E9E9E9;
        background: #F0F0F0;
      }

      &__img-empty-state {
        width: 24px;
        height: 24px;
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

    :deep(.el-range-editor) {
      width: 265px;
      box-sizing: border-box;
    }
  }
</style>