<template>
  <div class="manajemen-spk-edit">
    <page-header
      title="Edit SPK"
      show-back-icon
      @back="goToManajemenSPK"
    />

    <div class="page-content">
      <div class="manajemen-spk-edit__wrapper">
        <div class="manajemen-spk-edit__input-section input-section">
          <div class="input-section__header">
            <img
              :src="icons.receipt"
              alt=""
              class="input-section__header-icon"
            >
            <div class="input-section__header-text">
              Info General
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label required">
                Tipe SPK
              </div>
              <el-select
                v-model="formData.spk_type"
                placeholder="Pilih tipe SPK"
                class="row__input"
                disabled
                @change="handleSPKTypeChange"
              >
                <el-option
                  v-for="(label, value) in spkTypes"
                  :key="value"
                  :label="label"
                  :value="value"
                />
              </el-select>
            </div>
            <div
              v-if="isNotDefaultSPK"
              class="rows__row"
            >
              <div class="row__label required">
                SPK
              </div>
              <el-select
                v-model="formData.related_spk"
                v-loading="visibleLoading.spkDropdown"
                placeholder="Pilih SPK"
                class="row__input"
                remote-show-suffix
                filterable
                remote
                disabled
                reserve-keyword
              >
                <el-option
                  v-for="spk in spks"
                  :key="spk.id"
                  :label="spk.nomor"
                  :value="spk.id"
                  @click="getSPK(spk.id)"
                />
              </el-select>
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label required">
                Nomor SPK
              </div>
              <el-input
                v-model="formData.nomor"
                v-loading="!isDataFetched"
                :disabled="isStatusNotDraft"
                placeholder="Masukkan nomor SPK"
                class="row__input"
              />
            </div>
            <div class="rows__row">
              <div class="row__label required">
                Unit
              </div>
              <el-select
                v-if="formData.spk_type === 'SPK_ADDENDUM' || formData.spk_type === 'SPK_LANJUTAN'"
                v-model="formData.unit"
                v-loading="visibleLoading.unitDropdown || !isDataFetched"
                :disabled="isStatusNotDraft"
                placeholder="Pilih unit"
                class="row__input"
                remote-show-suffix
                filterable
                disabled
                remote
                reserve-keyword
              >
                <el-option
                  v-for="unit in units"
                  :key="unit.id"
                  :label="`${unit.cluster.nama} - ${unit.nomor_kavling}`"
                  :value="unit.id"
                  @click="handleUnitChange(unit)"
                />
              </el-select>
              <el-select
                v-else
                v-model="formData.unit"
                v-loading="visibleLoading.unitDropdown"
                :disabled="isStatusNotDraft"
                placeholder="Pilih unit"
                class="row__input"
                remote-show-suffix
                filterable
                remote
                reserve-keyword
              >
                <el-option
                  v-for="unit in units"
                  :key="unit.id"
                  :label="`${unit.cluster.nama} - ${unit.nomor_kavling}`"
                  :value="unit.id"
                  @click="handleUnitChange(unit)"
                />
              </el-select>
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label required">
                Periode
              </div>
              <el-input
                v-if="!isDataFetched"
                v-loading="true"
                class="row__input"
              />
              <el-date-picker
                v-else
                v-model="periodeValue"
                :clearable="false"
                :disabled="isStatusNotDraft"
                type="monthrange"
                range-separator="-"
                start-placeholder="Tanggal awal"
                end-placeholder="Tanggal akhir"
                format="MM-YYYY"
                value-format="YYYY-MM-DD"
                @change="handleDateRangeChange"
              />
            </div>
            <div class="rows__row">
              <div class="row__label required">
                Vendor
              </div>
              <el-select
                v-model="formData.vendor"
                v-loading="visibleLoading.vendorDropdown || !isDataFetched"
                :disabled="isStatusNotDraft"
                placeholder="Pilih unit"
                class="row__input"
                remote-show-suffix
                filterable
                remote
                reserve-keyword
              >
                <el-option
                  v-for="vendor in vendors"
                  :key="vendor.id"
                  :label="vendor.nama"
                  :value="vendor.id"
                />
              </el-select>
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Keterangan
              </div>
              <el-input
                v-model="formData.keterangan"
                v-loading="!isDataFetched"
                :rows="3"
                resize="none"
                placeholder="Masukkan keterangan"
                type="textarea"
                class="row__input"
              />
            </div>
            <div class="rows__row">
              <div class="row__label required">
                Status
              </div>
              <el-select
                v-model="formData.status"
                v-loading="!isDataFetched"
                :disabled="['PARTIALLY_DONE', 'DONE'].includes(currentStatus)"
                placeholder="Pilih status"
                class="row__input"
              >
                <el-option
                  v-for="status in currentStatus === 'FINAL' ? finalStatuses : statuses"
                  :key="status.code"
                  :label="status.name"
                  :value="status.code"
                />
              </el-select>
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Tipe Unit
              </div>
              <el-input
                v-model="selectedTipeUnitNomor"
                v-loading="!isDataFetched"
                placeholder="Pilih unit terlebih dahulu"
                class="row__input"
                disabled
              />
            </div>
            <div
              v-if="formData.spk_type === 'SPK_ADDENDUM'"
              class="rows__row"
            >
              <div class="row__label">
                Harga Total Penambahan
              </div>
              <el-input
                v-model="totalPrice"
                v-loading="!isDataFetched"
                :formatter="(value) => {
                  const parts = value.toString().split(',');
                  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                  return `Rp ${parts.slice(0,2).join(',')}`;
                }"
                :parser="(value) => value.replace(/[^\d,]/g, '')"
                placeholder="Masukkan pekerjaan tambahan"
                class="row__input"
                disabled
              />
            </div>
            <div
              v-else
              class="rows__row"
            >
              <div class="row__label">
                Harga Subsidi
              </div>
              <el-input
                v-model="formData.harga_subsidi"
                v-loading="!isDataFetched"
                :disabled="isStatusNotDraft"
                :formatter="(value) => {
                  const parts = value.toString().split(',');
                  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                  return `Rp ${parts.slice(0,2).join(',')}`;
                }"
                :parser="(value) => value.replace(/[^\d,]/g, '')"
                placeholder="Masukkan harga subsidi"
                class="row__input"
                @input="calculateHargaTotal"
              />
            </div>
          </div>
          <div
            v-if="formData.spk_type === 'SPK_ADDENDUM'"
            class="input-section__rows rows"
          >
            <div class="rows__row">
              <div class="row__label">
                Harga Total Pengurangan
              </div>
              <el-input
                v-model="totalPricePengurangan"
                v-loading="!isDataFetched"
                :formatter="(value) => {
                  const parts = value.toString().split(',');
                  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                  return `Rp ${parts.slice(0,2).join(',')}`;
                }"
                :parser="(value) => value.replace(/[^\d,]/g, '')"
                placeholder="Masukkan pekerjaan pengurangan"
                class="row__input"
                disabled
              />
            </div>
            <div class="rows__row">
              <div class="row__label">
                Harga Total
              </div>
              <el-input
                v-model="formData.harga_total"
                v-loading="!isDataFetched"
                :formatter="(value) => {
                  const parts = value.toString().split(',');
                  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                  return `Rp ${parts.slice(0,2).join(',')}`;
                }"
                :parser="(value) => value.replace(/[^\d,]/g, '')"
                placeholder="Masukkan pekerjaan tambahan atau pekerjaan pengurangan"
                class="row__input"
                disabled
              />
            </div>
          </div>
          <div
            v-if="formData.spk_type !== 'SPK_ADDENDUM'"
            class="input-section__rows rows"
          >
            <div class="rows__row">
              <div class="row__label">
                Harga Pekerjaan Pembangunan Rumah
              </div>
              <el-input
                v-model="formData.harga_pekerjaan_pembangunan_rumah"
                v-loading="!isDataFetched"
                :disabled="isStatusNotDraft"
                :formatter="(value) => {
                  const parts = value.toString().split(',');
                  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                  return `Rp ${parts.slice(0,2).join(',')}`;
                }"
                :parser="(value) => value.replace(/[^\d,]/g, '')"
                placeholder="Masukkan harga pekerjaan pembangunan rumah"
                class="row__input"
                @input="calculateHargaTotal"
              />
            </div>
            <div class="rows__row">
              <div class="row__label">
                Harga Total Pekerjaan Pembangunan Rumah dan Subsidi
              </div>
              <el-input
                v-model="formData.harga_total_ppr_subsidi"
                v-loading="!isDataFetched"
                :formatter="(value) => {
                  const parts = value.toString().split(',');
                  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                  return `Rp ${parts.slice(0,2).join(',')}`;
                }"
                :parser="(value) => value.replace(/[^\d,]/g, '')"
                placeholder="Masukkan harga pekerjaan pembangunan rumah, harga subsidi, dan tipe unit  terlebih dahulu"
                class="row__input"
                disabled
              />
            </div>
          </div>
          <div
            v-if="formData.spk_type !== 'SPK_ADDENDUM'"
            class="input-section__rows rows"
          >
            <div class="rows__row">
              <div class="row__label">
                Harga Total Pekerjaan Pembangunan Rumah
              </div>
              <el-input
                v-model="formData.harga_total_ppr"
                v-loading="!isDataFetched"
                :formatter="(value) => {
                  const parts = value.toString().split(',');
                  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                  return `Rp ${parts.slice(0,2).join(',')}`;
                }"
                :parser="(value) => value.replace(/[^\d,]/g, '')"
                placeholder="Masukkan harga pekerjaan pembangunan rumah dan tipe unit terlebih dahulu"
                class="row__input"
                disabled
              />
            </div>
            <div class="rows__row">
              <div class="row__label">
                Harga PPh 21
              </div>
              <el-input
                v-model="formData.harga_pph21"
                v-loading="!isDataFetched"
                :disabled="isStatusNotDraft"
                :formatter="(value) => {
                  const parts = value.toString().split(',');
                  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                  return `Rp ${parts.slice(0,2).join(',')}`;
                }"
                :parser="(value) => value.replace(/[^\d,]/g, '')"
                placeholder="Masukkan harga PPh 21"
                class="row__input"
                @input="calculateHargaTotal"
              />
            </div>
          </div>
          <div
            v-if="formData.spk_type !== 'SPK_ADDENDUM'"
            class="input-section__rows rows"
          >
            <div class="rows__row">
              <div class="row__label">
                Harga Total SPK
              </div>
              <el-input
                v-model="formData.harga_total_spk"
                v-loading="!isDataFetched"
                :formatter="(value) => {
                  const parts = value.toString().split(',');
                  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                  return `Rp ${parts.slice(0,2).join(',')}`;
                }"
                :parser="(value) => value.replace(/[^\d,]/g, '')"
                placeholder="Masukkan harga pekerjaan pembangunan rumah, harga subsidi, harga PPh 21, dan tipe unit  terlebih dahulu"
                class="row__input"
                disabled
              />
            </div>
          </div>
          <div class="input-section__header input-section__header--flex">
            <div class="input-section__header-left">
              <img
                :src="icons.briefcase"
                alt=""
                class="input-section__header-icon"
              >
              <div class="input-section__header-text">
                {{ formData.spk_type === 'SPK_ADDENDUM' ? 'Pekerjaan Tambahan' : 'Pekerjaan' }} 
              </div>
            </div>
            <div v-if="!isStatusNotDraft">
              <el-button
                type="primary"
                class="input-section__import-template"
                @click="toggleDialog()"
              >
                Import Template
                <el-icon class="el-icon--right">
                  <Download />
                </el-icon>
              </el-button>
              <el-button
                type="primary"
                @click="toggleDrawer()"
              >
                Tambah Pekerjaan
                
                <el-icon class="el-icon--right">
                  <Plus />
                </el-icon>
              </el-button>
            </div>
          </div>
          <el-table
            v-loading="!isDataFetched"
            :data="formData.jenis_pekerjaans"
            class="input-section__table table general-table table--pekerjaan"
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
            >
              <template #default="scope">
                {{ helpers.convertToTwoDecimalPoint(scope.row.volume) }}
              </template>
            </el-table-column>
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
            <el-table-column
              v-if="!isStatusNotDraft"
              label="Action"
              align="center"
              fixed="right"
            >
              <template #default="scope">
                <div class="table__actions">
                  <el-button
                    v-if="scope.row.id_table-1 !== 0 && scope.row.hasOwnProperty('actions')"
                    :icon="icons.arrowUp"
                    type="primary"
                    class="table__actions-edit"
                    text
                    @click.stop="moveJenisPekerjaan(scope.row.id_table-1, 'UP')"
                  />
                  <el-button
                    v-if="scope.row.id_table-1 !== formData.jenis_pekerjaans.length-1 && scope.row.hasOwnProperty('actions')"
                    :icon="icons.arrowDown"
                    type="primary"
                    class="table__actions-edit"
                    text
                    @click.stop="moveJenisPekerjaan(scope.row.id_table-1, 'DOWN')"
                  />
                  <el-button
                    v-if="scope.row.actions"
                    :icon="icons.edit"
                    type="primary"
                    class="table__actions-edit"
                    text
                    @click.stop="toggleDrawer(scope.row.nama)"
                  />
                  <el-button
                    v-if="scope.row.actions"
                    :icon="icons.delete"
                    type="primary"
                    class="table__actions-delete"
                    text
                    @click.stop="deleteJenisPekerjaan(scope.row.nama)"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div
            v-if="formData.spk_type === 'SPK_ADDENDUM'"
            class="input-section__header input-section__header--flex input-section__header--pengurangan"
          >
            <div class="input-section__header-left">
              <img
                :src="icons.briefcase"
                alt=""
                class="input-section__header-icon"
              >
              <div class="input-section__header-text">
                Pekerjaan Pengurangan
              </div>
            </div>
            <div>
              <el-button
                type="primary"
                class="input-section__import-template"
                @click="toggleDialog()"
              >
                Import Template
                <el-icon class="el-icon--right">
                  <Download />
                </el-icon>
              </el-button>
              <el-button
                type="primary"
                @click="toggleDrawer('', true)"
              >
                Tambah Pekerjaan
                <el-icon class="el-icon--right">
                  <Plus />
                </el-icon>
              </el-button>
            </div>
          </div>
          <el-empty
            v-if="!formData.jenis_pekerjaan_pengurangans.length && formData.spk_type === 'SPK_ADDENDUM'"
            description="Belum ada pekerjaan pengurangan"
          />
          <el-table
            v-else-if="formData.spk_type === 'SPK_ADDENDUM'"
            :data="formData.jenis_pekerjaan_pengurangans"
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
            >
              <template #default="scope">
                {{ helpers.convertToTwoDecimalPoint(scope.row.volume) }}
              </template>
            </el-table-column>
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
            <el-table-column
              label="Action"
              align="center"
              fixed="right"
            >
              <template #default="scope">
                <div class="table__actions">
                  <el-button
                    v-if="scope.row.id_table-1 !== 0 && scope.row.hasOwnProperty('actions')"
                    :icon="icons.arrowUp"
                    type="primary"
                    class="table__actions-edit"
                    text
                    @click.stop="moveJenisPekerjaan(scope.row.id_table-1, 'UP', true)"
                  />
                  <el-button
                    v-if="scope.row.id_table-1 !== formData.jenis_pekerjaans.length-1 && scope.row.hasOwnProperty('actions')"
                    :icon="icons.arrowDown"
                    type="primary"
                    class="table__actions-edit"
                    text
                    @click.stop="moveJenisPekerjaan(scope.row.id_table-1, 'DOWN', true)"
                  />
                  <el-button
                    v-if="scope.row.actions"
                    :icon="icons.edit"
                    type="primary"
                    class="table__actions-edit"
                    text
                    @click.stop="toggleDrawer(scope.row.nama, true)"
                  />
                  <el-button
                    v-if="scope.row.actions"
                    :icon="icons.delete"
                    type="primary"
                    class="table__actions-delete"
                    text
                    @click.stop="deleteJenisPekerjaan(scope.row.nama, true)"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="manajemen-spk-edit__submit-section">
          <el-button
            type="secondary"
            class="manajemen-spk-edit__cancel-btn"
            @click="goToManajemenSPK"
          >
            Cancel
          </el-button>
          <el-button
            :disabled="!isAllRequiredFieldsFilled"
            :loading="visibleLoading.submitButton"
            type="primary"
            class="manajemen-spk-edit__submit-btn"
            @click="submit"
          >
            Simpan SPK
          </el-button>
        </div>
      </div>
    </div>

    <el-drawer
      v-model="visibleDrawer"
      :size="800"
      class="manajemen-spk-edit__drawer drawer"
    >
      <template #header>
        <div class="drawer__header">
          {{ !isEditMode ? 'Tambah Pekerjaan' : 'Ubah Pekerjaan' }}
        </div>
      </template>
      <el-scrollbar class="drawer__scrollbar">
        <div class="drawer__form form">
          <div class="form__label required">
            Jenis Pekerjaan
          </div>
          <el-input
            v-model="form.jenisPekerjaan"
            placeholder="Masukkan jenis pekerjaan"
            class="form__input"
          />
          
          <div class="form__input-flex">
            <div class="form__input-flex-wrapper">
              <div class="form__label required">
                Nama Pekerjaan
              </div>
              <el-input
                v-model="namaPekerjaan"
                placeholder="Masukkan nama pekerjaan"
                class="form__input"
              />
            </div>
            <div class="form__input-flex-wrapper">
              <div class="form__label required">
                Satuan Ukuran
              </div>
              <el-select
                v-model="satuanUkuran"
                placeholder="Pilih satuan ukuran"
                class="form__input"
                clearable
              >
                <el-option
                  v-for="satuanUkuran in satuanUkurans"
                  :key="satuanUkuran"
                  :label="satuanUkuran"
                  :value="satuanUkuran"
                />
              </el-select>
            </div>
          </div>
          
          <div class="form__input-flex">
            <div class="form__input-flex-wrapper">
              <div class="form__label required">
                Volume
              </div>
              <el-input
                v-model="volume"
                placeholder="Masukkan volume"
                class="form__input"
                type="number"
              />
            </div>
            <div class="form__input-flex-wrapper">
              <div class="form__label required">
                Harga Satuan
              </div>
              <el-input
                v-model="hargaSatuan"
                :formatter="(value) => {
                  const parts = value.toString().split(',');
                  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                  return `Rp ${parts.slice(0,2).join(',')}`;
                }"
                :parser="(value) => value.replace(/[^\d,]/g, '')"
                placeholder="Masukkan harga satuan"
                class="form__input"
              />
            </div>
          </div>
  
          <el-button
            :disabled="!isAddPekerjaanFormIsFilled"
            type="primary"
            class="form__button"
            @click="!isEditPekerjaanMode ? addPekerjaan() : editPekerjaan()"
          >
            {{ isEditPekerjaanMode ? 'Simpan' : 'Tambah Pekerjaan' }}
          </el-button>

          <div class="drawer__table-header">
            <div class="drawer__table-title">
              List Pekerjaan
            </div>
            <el-button
              type="danger"
              class="drawer__delete-all-btn"
              link
              @click="deleteAllPekerjaan"
            >
              Hapus Semua
            </el-button>
          </div>
  
          <el-tag class="form__tag" size="large">
            <div>
              Persentase Pekerjaan akan terkalkulasi setelah menambahkan jenis dan detail pekerjaan ke dalam tabel utama
            </div>
          </el-tag>
  
          <el-table
            :data="form.pekerjaans"
            :class="{ 'table__edit-mode': isEditPekerjaanMode }"
            class="drawer__table table general-table"
            header-row-class-name="general-table__header-gray"
            stripe
          >
            <el-table-column
              prop="nama"
              label="Nama Pekerjaan"
              min-width="150"
            />
            <el-table-column
              prop="satuan_ukuran"
              label="Satuan Ukuran"
              min-width="50"
            />
            <el-table-column
              prop="volume"
              label="Volume" 
              min-width="50"
            >
              <template #default="scope">
                {{ helpers.convertToTwoDecimalPoint(scope.row.volume) }}
              </template>
            </el-table-column>
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
              label="Action"
              width="90"
              align="center"
              fixed="right"
            >
              <template #default="scope">
                <div class="table__actions">
                  <el-button
                    v-if="scope.$index !== 0"
                    :icon="icons.arrowUp"
                    type="primary"
                    class="table__actions-edit"
                    text
                    @click.stop="movePekerjaan(scope.$index, 'UP')"
                  />
                  <el-button
                    v-if="scope.$index !== form.pekerjaans.length-1"
                    :icon="icons.arrowDown"
                    type="primary"
                    class="table__actions-edit"
                    text
                    @click.stop="movePekerjaan(scope.$index, 'DOWN')"
                  />
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link table__actions-trigger">
                      <el-icon class="el-icon--right">
                        <more-filled />
                      </el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu class="table__actions-dropdown-menu">
                        <el-dropdown-item @click.stop="toggleEditPekerjaan(scope.row)">
                          Edit
                        </el-dropdown-item>
                        <el-dropdown-item @click.stop="deletePekerjaan(scope.row.nama)">
                          Delete
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="drawer__actions actions">
            <el-button
              type="secondary"
              class="actions__cancel-btn"
              @click="toggleDrawer()"
            >
              Cancel
            </el-button>
            <el-button
              :disabled="!isAddJenisPekerjaanFormIsFilled"
              type="primary"
              class="actions__submit-btn"
              @click="!isEditMode ? addJenisPekerjaan() : updateJenisPekerjaan()"
            >
              Simpan
            </el-button>
          </div>
        </div>
      </el-scrollbar>
    </el-drawer>

    <el-dialog
      v-model="visibleDialog"
      :width="480"
      class="manajemen-spk-edit__dialog dialog"
    >
      <template #header>
        <div class="dialog__header header">
          <el-icon color="#E7B10A">
            <Download />
          </el-icon>
          Import Template SPK
        </div>
      </template>
      <div class="dialog__label">
        Template SPK
      </div>
      <el-select
        v-model="templateSPKId"
        placeholder="Pilih template SPK"
        class="dialog__input"
        remote-show-suffix
        filterable
        remote
        reserve-keyword
      >
        <el-option
          v-for="templateSPK in templateSPKs"
          :key="templateSPK.id"
          :label="templateSPK.nama"
          :value="templateSPK.id"
        />
      </el-select>
      <template #footer>
        <el-button
          type="secondary"
          @click="toggleDialog()"
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="importTemplate()"
        >
          Confirm
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script src="./js/manajemen-spk-edit.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
@import "~/assets/scss/table.scss";

  .manajemen-spk-edit {
    &__wrapper {
      background: white;
      border-radius: 12px;
      border: 1px solid #EAEAEA;
      background: #FFF;
      box-shadow: 0px 4px 8px 0px rgba(224, 224, 224, 0.20);
    }

    .input-section {
      padding: 20px 20px 32px 20px;
      border-bottom: 1px solid #E9E9E9;

      &__header {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 20px;

        &--flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        &--pengurangan {
          margin-top: 20px;
        }

        &-left {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        &-text {
          color: #555;
          font-size: 16px;
          font-weight: 600;
        }
      }

      &__import-template {
        border-color: #E7B10A;
        background-color: #E7B10A;
      }

      .table {
        &__actions {
          display: flex;
          justify-content: center;
          gap: 5px;

          &-edit, &-delete {
            padding: 0;
          }
        }

        &__nama-pekerjaan {
          padding-left: 30px;
        }
      }
    }

    &__submit-section {
      padding: 20px;
      display: flex;
      justify-content: end;
    }

    &__submit-btn {
      width: 150px;
    }

    .rows {
      display: flex;
      gap: 24px;
      margin-bottom: 16px;

      .row {
        &__label {
          margin-bottom: 8px;
          color: #434343;
          font-family: Plus Jakarta Sans;
          font-size: 12px;
          font-weight: 600;
        }
  
        &__input {
          width: 400px;

          &--error {
            :deep(.el-input__wrapper) {
              border: 1px solid #FF613A;
            }
          }
        }

        &__confirm-password {
          margin-top: 8px;
          display: flex;
          gap: 4px;

          &-msg {
            color: #7B7B7B;
            font-size: 12px;
            font-weight: 400;

            &--success {
              color: #5D9E1F;
            }
          }
        }
        
        &__email, &__password {
          margin-top: 4px;
          display: flex;
          gap: 4px;

          &-msg {
            color: #CC4E2E;
            font-size: 12px;
            font-weight: 400;
          }
        }
      }
    }

    .drawer {
      &__header {
        color: #282828;
        font-size: 20px;
        font-weight: 600;
      }

      &__table {
        z-index: 0;
        margin-bottom: 60px;
      }

      &__scrollbar {
        z-index: 1;
      }

      &__table-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }

      &__table-title {
        color: #555;
        font-size: 14px;
        font-weight: 600;
      }

      .form {
        padding-bottom: 50px;

        &__label {
          margin-bottom: 8px;
          color: #434343;
          font-family: Plus Jakarta Sans;
          font-size: 12px;
          font-weight: 600;
        }
  
        &__input {
          width: 100%;
          margin-bottom: 20px;

          &-flex {
            display: flex;
            gap: 10px;

            &-wrapper {
              width: 100%;
            }
          }

          &--error {
            :deep(.el-input__wrapper) {
              border: 1px solid #FF613A;
            }
          }
        }

        &__button {
          width: 100%;
          margin-bottom: 30px;
        }

        &__tag {
          width: 100%;
          // padding: 20px;
          // height: 100px;
          font-size: 14px;

          margin-bottom: 15px;
        }
      }

      .table {
        &__actions {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;

          &-edit, &-delete {
            padding: 0;
            margin: 0;
          }

          &-trigger {
            cursor: pointer;
          }
        }

        &__edit-mode {
          filter: opacity(0.3);
        }

        &--pekerjaan {
          margin-bottom: 15px;
        }
      }

      .actions {
        box-shadow: 0px -3px 3px rgb(110 108 108 / 20%);
        position: fixed;
        bottom: 20px;
        right: 0;
        width: 800px;
        padding-top: 20px;
        background-color: white;
        display: flex;
        justify-content: center;

        // &__cancel-btn {
        //   width: 45%;
        // }

        &__submit-btn {
          // width: 45%;
          width: 150px;
        }
      }
    }

    .dialog {
      &__label {
        color: #434343;
        font-family: Plus Jakarta Sans;
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 8px;
      }

      &__input {
        width: 100%;
      }
    }
    
    :deep(.el-drawer__header) {
      padding-bottom: 12px;
      margin-bottom: 12px;
      border-bottom: 1px solid #E9E9E9;
    }

    :deep(.el-table__placeholder) {
      display: none;
    }
    
    :deep(.el-table__indent) {
      display: none;
    }
    
    .required::after {
      content: "*";
      color: #FF613A;
    }

    :deep(.el-date-editor--monthrange) {
      box-sizing: border-box;
      width: 400px;
    }
  }
</style>