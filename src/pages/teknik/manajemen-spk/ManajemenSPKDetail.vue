<template>
  <div class="manajemen-spk-detail">
    <page-header
      title="Detail SPK"
      show-back-icon
      @back="goToManajemenSPK"
    />

    <div class="page-content">
      <div class="manajemen-spk-detail__wrapper">
        <div class="manajemen-spk-detail__header header">
          <div class="header__title">
            <div class="header__title-spk">
              SPK
            </div>
            <div class="header__title-name">
              {{ SPK.nomor }}
            </div>
          </div>
          <div class="header__actions actions">
            <el-button
              v-if="hasAccess('UPDATE_SPK')"
              type="primary"
              class="actions__edit-btn"
              plain
              @click="goToEditPage"
            >
              Edit SPK
              <el-icon class="el-icon--right">
                <EditPen />
              </el-icon>
            </el-button>
            <el-dropdown trigger="click">
              <el-button
                :icon="icons.moreFilled"
                class="actions__delete-btn"
                plain
              >
              </el-button>
              <!-- <span class="el-dropdown-link actions__trigger">
                <el-icon class="el-icon--right">
                  <more-filled />
                </el-icon>
              </span> -->
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
                  <el-dropdown-item @click="generateSPKPDF">PDF</el-dropdown-item>
                  <div
                    v-if="SPK.spk_access_url"
                    class="actions__preview-wrapper"
                  >
                    <el-icon class="actions__preview-icon">
                      <View />
                    </el-icon>
                    <div class="actions__preview">
                      Preview
                    </div>
                  </div>
                  <el-dropdown-item v-if="SPK.spk_access_url" @click="openDocumentInNewTab(SPK.spk_access_url)">
                    PDF
                  </el-dropdown-item>
                  <div
                    v-if="hasAccess('DELETE_SPK')"
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
                    v-if="hasAccess('DELETE_SPK')"
                    @click.stop="openModalConfirmation()"
                  >
                    Delete
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>

        <div class="manajemen-spk-detail__content content">
          <div class="content__informasi-umum-wrapper">
            <div class="content__header">
              <img
                :src="icons.receipt"
                alt="Image Icon"
              />
              <div class="content__header-title">
                Info General
              </div>
            </div>
  
            <div class="content__informasi-utama informasi-utama">
              <div class="informasi-utama__column column">
                <div class="column__label">
                  No SPK
                </div>
                <div class="column__value">
                  {{ SPK.nomor }}
                </div>
              </div>
              <div class="informasi-utama__column column">
                <div class="column__label">
                  Vendor
                </div>
                <div class="column__value">
                  {{ SPK.vendor_nama }}
                </div>
              </div>
              <div class="informasi-utama__column column">
                <div class="column__label">
                  PJ Pekerjaan
                </div>
                <div class="column__value">
                  {{ helpers.convertEmptyValueWithDash(SPK.penanggung_jawab) }}
                </div>
              </div>
            </div>
            <div class="content__informasi-utama informasi-utama">
              <div class="informasi-utama__column column">
                <div class="column__label">
                  Tipe Unit
                </div>
                <div class="column__value">
                  {{ SPK.unit_tipe_nama }}
                </div>
              </div>
              <div class="informasi-utama__column column">
                <div class="column__label">
                  Unit
                </div>
                <div class="column__value">
                  {{ SPK.unit_cluster_nama }} - {{ SPK.unit_nomor_kavling }}
                </div>
              </div>
              <div class="informasi-utama__column column">
                <div class="column__label">
                  Periode
                </div>
                <div class="column__value">
                  {{ helpers.convertDateTimeZoneToDateString(SPK.awal_periode) }} - {{ helpers.convertDateTimeZoneToDateString(SPK.akhir_periode) }}
                </div>
              </div>
              <div class="informasi-utama__column column">
                <div class="column__label">
                  Status
                </div>
                <div class="column__value">
                  <status-badge
                    :text="statuses[SPK.status] ? statuses[SPK.status].name: ''"
                    :color="statuses[SPK.status] ? statuses[SPK.status].color: ''"
                    type="detail"
                  />
                </div>
              </div>
            </div>
            <div class="content__row content__row--column">
              <div class="">
                <div class="content__label">
                  SPK Utama
                </div>
                <div class="content__spks">
                  <div
                    v-if="SPK.related_spk || SPK.related_spk_lanjutan"
                    class="content__value"
                  >
                    <u
                      class="content__link"
                      @click="goToManajemenSPKDetail(SPK.related_spk || SPK.related_spk_lanjutan)"
                    >
                      {{ SPK.related_spk_nomor || SPK.related_spk_lanjutan_nomor }}
                    </u>
                  </div>
                  <div
                    v-else
                    class="content__value"
                  >
                    -
                  </div>
                </div>
              </div>
              <div class="">
                <div class="content__label">
                  SPK Addendum
                </div>
                <div class="content__spks">
                  <div
                    v-if="SPK.addendum_spks?.length > 0"
                    v-for="addendumSPK in SPK.addendum_spks"
                    class="content__value"
                  >
                    <u
                      class="content__link"
                      @click="goToManajemenSPKDetail(addendumSPK.id)"
                    >
                      {{ addendumSPK.nomor }}
                    </u>
                  </div>
                  <div
                    v-else
                    class="content__value"
                  >
                    -
                  </div>
                </div>
              </div>
              <div class="">
                <div class="content__label">
                  SPK Lanjutan
                </div>
                <div class="content__spks">
                  <div
                    v-if="SPK.spk_lanjutans?.length > 0"
                    v-for="spkLanjutan in SPK.spk_lanjutans"
                    class="content__value"
                  >
                    <u
                      class="content__link"
                      @click="goToManajemenSPKDetail(spkLanjutan.id)"
                    >
                      {{ spkLanjutan.nomor }}
                    </u>
                  </div>
                  <div
                    v-else
                    class="content__value"
                  >
                    -
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="content__informasi-umum-wrapper">
            <div class="content__header">
              <img
                :src="icons.receipt"
                alt="Image Icon"
              />
              <div class="content__header-title">
                Info Harga
              </div>
            </div>
  
            <div
              v-if="SPK.spk_type === 'SPK_ADDENDUM'"
              class="content__rows rows"
            >
              <div class="rows__row">
                <div class="row__label required">
                  Harga Pekerjaan Penambahan
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(totalPrice) }}
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Harga Pekerjaan Pengurangan
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(totalPricePengurangan) }}
                </div>
              </div>
            </div>
            
            <div
              v-if="SPK.spk_type === 'SPK_ADDENDUM'"
              class="content__rows rows"
            >
              <div class="rows__row">
                <div class="row__label required">
                  Harga Total
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(totalPrice - totalPricePengurangan) }}
                </div>
              </div>
            </div>

            <div
              v-if="SPK.spk_type !== 'SPK_ADDENDUM'"
              class="content__rows rows"
            >
              <div class="rows__row">
                <div class="row__label required">
                  Harga Subsidi
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(SPK.harga_subsidi) }}
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Harga Pekerjaan Pembangunan Rumah
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(SPK.harga_pekerjaan_pembangunan_rumah) }}
                </div>
              </div>
            </div>
            <div
              v-if="SPK.spk_type !== 'SPK_ADDENDUM'"
              class="content__rows rows"
            >
              <div class="rows__row">
                <div class="row__label required">
                  Harga Total Pekerjaan Pembangunan Rumah
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(SPK.harga_total_ppr) }}
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Harga Total Pekerjaan Pembangunan Rumah dan Subsidi
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(SPK.harga_total_ppr_subsidi) }}
                </div>
              </div>
            </div>
            <div
              v-if="SPK.spk_type !== 'SPK_ADDENDUM'"
              class="content__rows rows last-row"
            >
              <div class="rows__row">
                <div class="row__label required">
                  Harga PPh 21
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(SPK.harga_pph21) }}
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Harga Total SPK
                </div>
                <div class="row__value">
                  {{ helpers.convertPriceToRupiah(SPK.harga_total_spk) }}
                </div>
              </div>
            </div>
          </div>

          <div class="content__informasi-pendukung-wrapper informasi-pendukung-wrapper--top">
            <div class="content__header-items-info">
              <img
                :src="icons.briefcase"
                alt="Image Icon"
              />
              <div
                :class="{ 'content__header-title--inactive': selectedTab === 'LPP' }"
                class="content__header-title--active"
                @click="selectedTab = 'PEKERJAAN'"
              >
                {{ SPK.spk_type === 'SPK_ADDENDUM' ? 'Pekerjaan Tambahan' : 'Pekerjaan' }}
              </div>
              <div>|</div>
              <div
                :class="{ 'content__header-title--inactive': selectedTab === 'PEKERJAAN' }"
                class="content__header-title--active"
                @click="selectedTab = 'LPP'"
              >
                LPP
              </div>
            </div>
  
            <div
              v-show="selectedTab === 'PEKERJAAN'"
              class="content__rows rows last-row"
            >
              <el-table
                v-loading="!isDataFetched"
                :data="SPK.jenis_pekerjaans"
                class="input-section__table table general-table"
                header-row-class-name="general-table__header-gray"
                row-key="id_table"
                stripe
                default-expand-all
              >
                <el-table-column
                  prop="nama"
                  label="Nama Pekerjaan" 
                  fixed="left"
                  width="200"
                >
                <template #default="scope">
                  <div
                    v-if="!scope.row.hasOwnProperty('actions')"
                    class="table__nama-pekerjaan"
                  >
                    {{ scope.row.sequence }}. {{ scope.row.nama }}
                  </div>
                  <template v-else>
                    {{ String.fromCharCode(64 + scope.row.sequence) }}. {{ scope.row.nama }}
                  </template>
                </template>
                </el-table-column>
                <el-table-column
                  prop="satuan_ukuran"
                  label="Satuan Ukuran"
                  width="80"
                />
                <el-table-column
                  prop="volume"
                  label="Volume" 
                  width="80"
                />
                <el-table-column
                  prop="harga_satuan"
                  label="Harga Satuan"
                >
                  <template #default="scope">
                    <el-tooltip
                      :content="helpers.convertPriceToRupiah(scope.row.harga_satuan, true, scope.row.hasOwnProperty('actions'), true)"
                      class="box-item"
                      effect="dark"
                      placement="top"
                    >
                      {{ helpers.convertPriceToRupiah(scope.row.harga_satuan, true, scope.row.hasOwnProperty('actions')) }}
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="harga_total"
                  label="Harga Total"
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
                  prop="persentase_pekerjaan"
                  label="Persentase Pekerjaan"
                >
                  <template #default="scope">
                    <el-tooltip
                      :content="helpers.convertDecimalToPercentage(scope.row.persentase_pekerjaan, scope.row.hasOwnProperty('actions'), true)"
                      class="box-item"
                      effect="dark"
                      placement="top"
                    >
                      {{ helpers.convertDecimalToPercentage(scope.row.persentase_pekerjaan, scope.row.hasOwnProperty('actions')) }}
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            
            <div
              v-show="SPK.spk_type === 'SPK_ADDENDUM' && selectedTab === 'PEKERJAAN'"
              class="content__header"
            >
              <img
                :src="icons.briefcase"
                alt="Image Icon"
              />
              <div class="content__header-title">
                Pekerjaan Pengurangan
              </div>
            </div>

            <div
              v-show="SPK.spk_type === 'SPK_ADDENDUM' && selectedTab === 'PEKERJAAN'"
              class="content__rows rows last-row"
            >
              <el-table
                v-loading="!isDataFetched"
                :data="SPK.jenis_pekerjaan_pengurangans"
                class="input-section__table table general-table"
                header-row-class-name="general-table__header-gray"
                row-key="id_table"
                stripe
                default-expand-all
              >
                <el-table-column
                  prop="nama"
                  label="Nama Pekerjaan" 
                  fixed="left"
                  width="200"
                >
                <template #default="scope">
                  <div
                    v-if="!scope.row.hasOwnProperty('actions')"
                    class="table__nama-pekerjaan"
                  >
                    {{ scope.row.sequence }}. {{ scope.row.nama }}
                  </div>
                  <template v-else>
                    {{ String.fromCharCode(64 + scope.row.sequence) }}. {{ scope.row.nama }}
                  </template>
                </template>
                </el-table-column>
                <el-table-column
                  prop="satuan_ukuran"
                  label="Satuan Ukuran"
                  width="80"
                />
                <el-table-column
                  prop="volume"
                  label="Volume" 
                  width="80"
                />
                <el-table-column
                  prop="harga_satuan"
                  label="Harga Satuan"
                >
                  <template #default="scope">
                    <el-tooltip
                      :content="helpers.convertPriceToRupiah(scope.row.harga_satuan, true, scope.row.hasOwnProperty('actions'), true)"
                      class="box-item"
                      effect="dark"
                      placement="top"
                    >
                      {{ helpers.convertPriceToRupiah(scope.row.harga_satuan, true, scope.row.hasOwnProperty('actions')) }}
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="harga_total"
                  label="Harga Total"
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
                  prop="persentase_pekerjaan"
                  label="Persentase Pekerjaan"
                >
                  <template #default="scope">
                    <el-tooltip
                      :content="helpers.convertDecimalToPercentage(scope.row.persentase_pekerjaan, scope.row.hasOwnProperty('actions'), true)"
                      class="box-item"
                      effect="dark"
                      placement="top"
                    >
                      {{ helpers.convertDecimalToPercentage(scope.row.persentase_pekerjaan, scope.row.hasOwnProperty('actions')) }}
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <div
              v-show="selectedTab === 'LPP'"
              class="content__rows rows rows--no-flex last-row"
            >
              <div class="content__informasi-tambahan informasi-tambahan">
                <div class="informasi-tambahan__column column">
                  <div class="column__label">
                    Total Nominal Yang Harus Dibayar
                  </div>
                  <div class="column__value">
                    {{ helpers.convertEmptyValueWithDash(helpers.convertPriceToRupiah(SPK.harga_total_ppr_subsidi)) }}
                  </div>
                </div>
                <div class="informasi-tambahan__column column">
                  <div class="column__label">
                    Total Nominal Terbayar
                  </div>
                  <div class="column__value column__value--green">
                    {{ helpers.convertEmptyValueWithDash(helpers.convertPriceToRupiah(SPK.lpp_total_harga_terbayar)) }}
                  </div>
                </div>
                <div class="informasi-tambahan__column column">
                  <div class="column__label">
                    Total Nominal Belum Terbayar
                  </div>
                  <div class="column__value column__value--red">
                    {{ helpers.convertEmptyValueWithDash(helpers.convertPriceToRupiah(SPK.harga_total_ppr_subsidi - SPK.lpp_total_harga_terbayar)) }}
                  </div>
                </div>
              </div>
              <el-table
                v-loading="visibleLoadingTableLPP"
                :data="laporanProgresPembangunans"
                class="rows__table table general-table"
                header-row-class-name="general-table__header-gray"
                stripe
              >
                <el-table-column
                  label="Termin"
                  min-width="120"
                  fixed
                >
                  <template #default="scope">
                    Termin ke-{{ scope.row.termin }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="harga_bulan_ini_pembulatan"
                  label="Nominal" 
                  min-width="250"
                >
                  <template #default="scope">
                    {{ helpers.convertPriceToRupiah(scope.row.harga_bulan_ini_pembulatan) }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="Status Pembayaran" 
                  min-width="150"
                >
                  <template #default="scope">
                    <status-badge
                      :color="paymentStatuses[scope.row.status_pembayaran].color"
                      :text="paymentStatuses[scope.row.status_pembayaran].name"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="hasAccess('READ_LAPORAN_PROGRES_PEMBANGUNAN')"
                  label="Action"
                  width="90"
                  align="center"
                  fixed="right"
                >
                  <template #default="scope">
                    <div class="table__actions">
                      <el-button
                        v-if="hasAccess('READ_LAPORAN_PROGRES_PEMBANGUNAN')"
                        :icon="icons.document"
                        type="primary"
                        class="table__actions-edit"
                        text
                        @click.stop="goToLPPDetailPage(scope.row.id)"
                      />
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>

        <div class="manajemen-spk-detail__author-info author-info">
          <div class="author-info__label">
            Dibuat oleh
          </div>
          <div class="author-info__value">
            <div class="author-info__author">
              {{ SPK.created_by_name }}
            </div>
            <div class="author-info__date-time">
              {{ helpers.convertDateTimeZoneToDateTimeString(SPK.created_at) }}
            </div>
          </div>
          <div class="author-info__label">
            Dimodifikasi oleh
          </div>
          <div class="author-info__value">
            <div class="author-info__author">
              {{ SPK.updated_by_name }}
            </div>
            <div class="author-info__date-time">
              {{ helpers.convertDateTimeZoneToDateTimeString(SPK.updated_at) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog v-model="visibleImagePreviewDialog">
      <img
        :src="selectedImageUrl"
        alt="Preview Image"
        class="manajemen-spk-detail__preview-image"
      />
    </el-dialog>
  </div>
</template>

<script src="./js/manajemen-spk-detail.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
@import "~/assets/scss/table.scss";

  .manajemen-spk-detail {
    &__wrapper {
      background-color: white;
      border: 1px solid #EAEAEA;
      box-shadow: 0px 4px 8px 0px rgba(224, 224, 224, 0.20);
      border-radius: 12px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;

      &__actions {
        display: flex;
        gap: 12px;
      }

      &__title {
        color: #434343;
        font-family: Plus Jakarta Sans;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        display: flex;
        gap: 6px;

        &-name {
          color: #61876E;
        }
      }
    }

    .content {
      border-top: 1px solid #E9E9E9;
      border-bottom: 1px solid var(--neutral-gray-100, #E9E9E9);

      &__header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 24px;

        &-items {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;

          &-info {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 24px;
          }
        }

        &-title {
          color: #555;
          font-size: 16px;
          font-weight: 600;

          &--active {
            color: #859671;
            font-weight: 600;
            cursor: pointer;
            text-decoration: underline;
            text-underline-offset: 5px;
            text-decoration-thickness: 1.5px;
          }

          &--inactive {
            font-weight: 600;
            color: #b9b8b8;
            cursor: pointer;
            text-decoration: none;
          }
        }
      }

      &__informasi-pendukung-wrapper, &__informasi-umum-content {
        padding: 20px;
      }

      &__informasi-utama-wrapper {
        padding: 20px 20px 0px 20px;
      }

      &__informasi-umum-wrapper {
        padding: 20px 20px 0px 20px;
        border-bottom: 1px solid var(--neutral-gray-100, #E9E9E9);
      }

      &__informasi-pendukung-wrapper {
        border-top: 1px solid #E9E9E9;
      }

      &__link {
        cursor: pointer;
        width: fit-content;
      }

      .informasi-pendukung-wrapper--top {
        border-top: none;
        border-bottom: 1px solid #E9E9E9;
      }

      .informasi-umum-keterangan {
        margin-top: 16px;
        padding: 16px 22px;
        border: 1px solid #E9E9E9;
        background: #F5F5F5;
        border-radius: 8px;

        &__header {
          margin-bottom: 4px;
          color: #434343;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          gap: 4px;
          align-items: center;
        }

        &__content {
          color: #696969;
          font-size: 14px;
          font-weight: 400;
        }
      }

      .informasi-umum {
        display: flex;
        justify-content: space-between;
        background-color: #F5F5F5;
        padding: 16px;
        border-radius: 8px;
        border-left: 6px solid #C4C4C4;

        .column {

          &__label {
            margin-bottom: 8px;
            color: #434343;
            font-size: 14px;
            font-weight: 400;
          }
  
          &__value {
            color: #434343;
            font-size: 22px;
            font-weight: 600;
          }
        }
      }

      .informasi-utama {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        .column {
          &__label {
            margin-bottom: 8px;
            color: #434343;
            font-size: 14px;
            font-weight: 400;
          }
  
          &__value {
            color: #434343;
            font-size: 22px;
            font-weight: 600;
          }
        }
      }

      .informasi-tambahan {
        display: flex;
        gap: 40px;
        margin-bottom: 20px;

        .column {
          &__label {
            margin-bottom: 8px;
            color: #434343;
            font-size: 14px;
            font-weight: 400;
          }
  
          &__value {
            color: #434343;
            font-size: 18px;
            font-weight: 600;

            &--green {
              color: green;
            }

            &--red {
              color: red;
            }
          }
        }
      }

      .rows {
        display: flex;
        gap: 24px;
        margin-bottom: 16px;

        &--no-flex {
          display: block;
        }

        .row {
          &__label {
            margin-bottom: 8px;
            color: #434343;
            font-family: Plus Jakarta Sans;
            font-size: 12px;
            font-weight: 600;
            width: 400px;
          }

          &__link {
            cursor: pointer;
            width: fit-content;
          }
    
          &__value {
            color: #696969;
            font-size: 14px;
            font-weight: 400;
            width: 400px;

            &--flex {
              display: flex;
              align-items: flex-end;
              gap: 5px;
            }

            &--flex-start {
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              gap: 8px;
            }
          }

          &__fasilitas {
            padding: 4px 12px;
            border-radius: 80px;
            border: 1px solid var(--neutral-gray-200, #D9D9D9);
            background: var(--neutral-gray-100, #E9E9E9);
            box-shadow: 0px 4px 8px 0px rgba(224, 224, 224, 0.20);
          }
        }
      }

      .checkbox-wrapper {
        display: flex;
        gap: 24px;
        padding: 20px;
        flex-wrap: wrap;

        &__title {
          color: #434343;
          font-size: 12px;
          font-weight: 600;
        }

        .card {
          width: 270px;

          &__checkbox {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 8px;
            padding: 10px;
          }

          &__info {
            color: #696969;
            font-size: 14px;
            font-weight: 400;
          }
        }
      }

      .image-upload {
        display: flex;
        gap: 24px;
        padding: 20px;
        flex-wrap: wrap;

        :deep(.el-upload) {
          height: 100%;
          cursor: default;
        }

        &__container {
          width: 270px;
        }

        &__wrapper {
          :deep(.el-upload--picture-card) {
            width: 270px;
            height: 250px;
          }
          
          :deep(.el-upload-list__item) {
            width: 270px;
            height: 250px;
            display: flex;
            justify-content: center;
          }
        }

        .image-content {
          width: 270px;
          height: 250px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          margin-bottom: 8px;

          &--bg-success {
            background: #D4E6D5 !important;
          }
          
          &__img {
            width: 270px;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
            transition: 0.3s;

            &--hovered {
              filter: brightness(50%);
            }
          }

          .item-actions {
            display: flex;
            gap: 8px;
            cursor: pointer;
            position: absolute;

            &__wrapper {
              width: 36px;
              height: 36px;
              border-radius: 50%;
              background-color: white;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-sizing: border-box;
          width: 270px;
          height: 250px;
          padding: 24px;
          border-radius: 4px;
          border: 1px dashed #C4C4C4;
          background: #FAFAFA;
          margin-bottom: 8px;

          &__upload-image-icon {
            display: block;
            margin-bottom: 16px;
            margin-left: auto;
            margin-right: auto;
          }
        }

        &__empty-state-wrapper {
          margin-bottom: 8px;
        }
      }

      &__name-label {
        color: #434343;
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 8px;
      }

      &__name {
        color: #434343;
        font-size: 18px;
        font-weight: 600;
      }

      &__row {
        display: flex;
        gap: 40px;
        margin-bottom: 16px;

        &--column {
          gap: 15px;
          flex-direction: column;
        }
      }

      &__data {
        width: 400px;
      }

      &__label {
        color: #434343;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 8px;
      }

      &__value {
        color: #696969;
        font-size: 14px;
        font-weight: 400;
      }

      &__spks {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }

      &__value-password {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #696969;
        font-size: 14px;
        font-weight: 400;
      }

      &__password-icon {
        cursor: pointer;
      }
    }

    &__preview-image {
      width: 50%;
      display: block;
      margin: auto;
    }

    .author-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;

      &__label {
        color: #434343;
        font-size: 12px;
        font-weight: 600;
      }

      &__value {
        color: #696969;
        font-size: 14px;
        font-weight: 400;
      }
    }

    .table {
      &__nama-pekerjaan {
        padding-left: 30px;
      }
    }

    :deep(.el-table__placeholder) {
      display: none;
    }
    
    :deep(.el-table__indent) {
      display: none;
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