<template>
  <div class="manajemen-dokumen-konsumen-edit">
    <page-header
      title="Edit Dokumen Konsumen"
      show-back-icon
      @back="goToManajemenDokumenKonsumen"
    />

    <div class="page-content">
      <div class="manajemen-dokumen-konsumen-edit__input-image-wrapper input-image-wrapper">
        <div
          v-if="hasAccess('LIST_FILEVIEW_DOKUMEN_KONSUMEN')"
          class="manajemen-dokumen-konsumen-edit__input-section input-section input-section--top"
        >
          <div class="input-section__header header">
            <div class="header__title-wrapper">
              <img
                :src="icons.newspaperClipping"
                alt="Image Icon"
              />
              <div class="header__title">
                Data Diri
              </div>
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Nama Konsumen
              </div>
              <el-input
                v-model="formData.konsumen_nama"
                placeholder="Masukkan jumlah kamar tidur"
                class="row__input"
                disabled
              />
            </div>
            <div class="rows__row">
              <div class="row__label">
                Tanggal Lahir
              </div>
              <el-date-picker
                v-model="formData.tanggal_lahir"
                type="date"
                placeholder="Pilih tanggal lahir"
                format="DD-MM-YYYY"
                value-format="YYYY-MM-DD"
                class="row__input"
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Provinsi
              </div>
              <el-select
                v-model="formData.provinsi_id"
                :loading="loading.province"
                placeholder="Pilih provinsi"
                class="row__input"
                filterable
                @change="reGetCities"
              >
                <el-option
                  v-for="province in filteredProvinces"
                  :key="province.id"
                  :label="province.name"
                  :value="province.id"
                  @click="handleSelectProvince(province)"
                />
              </el-select>
            </div>
            <div class="rows__row">
              <div class="row__label">
                Kabupaten/Kota
              </div>
              <el-select
                v-model="formData.kota_id"
                :loading="loading.city"
                :disabled="!formData.provinsi_id"
                placeholder="Pilih kota"
                class="row__input"
                filterable
              >
                <el-option
                  v-for="city in cities"
                  :key="city.id"
                  :label="city.name"
                  :value="city.id"
                />
              </el-select>
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Pekerjaan
              </div>
              <el-select
                v-model="formData.pekerjaan_id"
                placeholder="Pilih pekerjaan"
                class="row__input"
                filterable
              >
                <el-option
                  v-for="pekerjaan in pekerjaans"
                  :key="pekerjaan.id"
                  :label="pekerjaan.nama"
                  :value="pekerjaan.id"
                />
              </el-select>
            </div>
            <div class="rows__row">
              <div class="row__label">
                Gaji per Bulan
              </div>
              <el-input
                v-model="formData.gaji_per_bulan"
                :formatter="(value) => `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`"
                :parser="(value) => value.replace(/[^\d]/g, '')"
                placeholder="Masukkan gaji"
                class="row__input"
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Alasan
              </div>
              <el-select
                v-model="formData.alasan_ids"
                :loading="visibleLoading"
                placeholder="Masukkan alasan"
                class="row__input"
                multiple
                filterable
              >
                <el-option
                  v-for="alasan in alasans"
                  :key="alasan.id"
                  :label="alasan.nama"
                  :value="alasan.id"
                />
              </el-select>
            </div>
          </div>
        </div>

        <div class="input-image-wrapper__header header">
          <div class="header__title-wrapper">
            <img
              :src="icons.image"
              alt="Image Icon"
            />
            <div class="header__title">
              Lampiran Berkas
            </div>
          </div>
        </div>

        <div class="input-image-wrapper__image-upload image-upload">
          <div
            v-for="uploadField in uploadFields"
            class="image-upload__wrapper"
          >
            <el-upload
              :http-request="() => {}"
              :show-file-list="false"
              :before-upload="(...args) => validateUpload(...args, uploadField.accessUrl)"
              :class="{ error: uploadedImages[uploadField.accessUrl].error }"
              :disabled="!hasAccess('UPLOAD_DOKUMEN_KONSUMEN_FILE')"
              accept=".jpg, .jpeg, .png, .pdf"
              action=""
              class="image-upload__uploader"
            >
              <template v-if="uploadedImages[uploadField.accessUrl].visible">
                <div
                  class="image-upload__content content"
                  :class="{ 'content--w-auto': uploadedImages[uploadField.accessUrl].visible }"
                  @click.stop=""
                  @mouseenter="addVisibleImageActionIcons(uploadField.accessUrl)"
                  @mouseleave="removeVisibleImageActionIcons(uploadField.accessUrl)"
                >
                  <img
                    :src="uploadedImages[uploadField.accessUrl].url"
                    :class="{ 'content__img--hovered': visibleImageActionIcons[uploadField.accessUrl] }"
                    alt=""
                    class="content__img"
                  />
                  <span
                    :class="{ 'item-actions--visible': visibleImageActionIcons[uploadField.accessUrl], 'item-actions--view-only': !hasAccess('UPLOAD_DOKUMEN_KONSUMEN_FILE') }"
                    class="content__item-actions item-actions"
                  >
                    <div
                      class="item-actions__wrapper"
                      @click="handlePictureCardPreview(uploadField.accessUrl)"
                    >
                      <el-icon color="#434343">
                        <View />
                      </el-icon>
                    </div>
                    <div
                      v-if="hasAccess('UPLOAD_DOKUMEN_KONSUMEN_FILE')"
                      class="item-actions__wrapper"
                      @click="handleRemove(uploadField.accessUrl)"
                    >
                      <el-icon color="#FF613A">
                        <Delete />
                      </el-icon>
                    </div>
                  </span>
                </div>
              </template>
              <template v-else-if="uploadedDocuments[uploadField.accessUrl].visible">
                <div
                  class="image-upload__content content content--bg-success"
                  :class="{ 'content--w-auto': uploadedDocuments[uploadField.accessUrl].visible }"
                  @click.stop=""
                  @mouseenter="addVisibleImageActionIcons(uploadField.accessUrl)"
                  @mouseleave="removeVisibleImageActionIcons(uploadField.accessUrl)"
                >
                  <el-icon
                    size="77"
                    color="#89AE8B"
                    class="empty-state__upload-image-icon"
                  >
                    <CircleCheckFilled />
                  </el-icon>
                  <div class="empty-state__desc">
                    Dokumen berhasil di-upload
                  </div>
                  <span
                    :class="{ 'item-actions--visible': visibleImageActionIcons[uploadField.accessUrl], 'item-actions--view-only': !hasAccess('UPLOAD_DOKUMEN_KONSUMEN_FILE') }"
                    class="content__item-actions item-actions"
                  >
                    <div
                      class="item-actions__wrapper"
                      @click="openDocumentInNewTab(uploadField.accessUrl)"
                    >
                      <el-icon color="#434343">
                        <View />
                      </el-icon>
                    </div>
                    <div
                      v-if="hasAccess('UPLOAD_DOKUMEN_KONSUMEN_FILE')"
                      class="item-actions__wrapper"
                      @click="handleRemoveDocument(uploadField.accessUrl)"
                    >
                      <el-icon color="#FF613A">
                        <Delete />
                      </el-icon>
                    </div>
                  </span>
                </div>
              </template>
              <div
                v-else
                class="image-upload__empty-state empty-state"
              >
                <img
                  :src="icons.uploadImage"
                  alt="Upload Image"
                  class="empty-state__upload-image-icon"
                />
                <div
                  v-if="hasAccess('UPLOAD_DOKUMEN_KONSUMEN_FILE')"
                  class="empty-state__desc"
                >
                  Letakkan file disini atau telusuri file dari PC Anda
                </div>
                <div
                  v-if="hasAccess('UPLOAD_DOKUMEN_KONSUMEN_FILE')"
                  class="empty-state__format"
                >
                  Format yang didukung: .jpg, .png, .pdf, ukuran maksimum PDF: 2mb
                </div>
              </div>
            </el-upload>
            <div class="image-upload__label">
              {{ uploadField.label }}
            </div>
          </div>
          <div class="image-upload__wrapper">
            <el-upload
              :http-request="() => {}"
              :show-file-list="false"
              :before-upload="(...args) => uploadDocument(...args, 'dokumen_pendukung_access_url')"
              :disabled="!hasAccess('UPLOAD_DOKUMEN_KONSUMEN_FILE')"
              action=""
              class="image-upload__uploader"
            >
              <template v-if="uploadedDocuments.dokumen_pendukung_access_url.visible">
                <div
                  class="image-upload__content content content--bg-success"
                  :class="{ 'content--w-auto': uploadedDocuments.dokumen_pendukung_access_url.visible }"
                  @click.stop=""
                  @mouseenter="addVisibleImageActionIcons('dokumen_pendukung_access_url')"
                  @mouseleave="removeVisibleImageActionIcons('dokumen_pendukung_access_url')"
                >
                  <el-icon
                    size="77"
                    color="#89AE8B"
                    class="empty-state__upload-image-icon"
                  >
                    <CircleCheckFilled />
                  </el-icon>
                  <div class="empty-state__desc">
                    Dokumen berhasil di-upload
                  </div>
                  <span
                    :class="{ 'item-actions--visible': visibleImageActionIcons.dokumen_pendukung_access_url, 'item-actions--view-only': !hasAccess('UPLOAD_DOKUMEN_KONSUMEN_FILE') }"
                    class="content__item-actions item-actions"
                  >
                    <div
                      class="item-actions__wrapper"
                      @click="openDocumentInNewTab('dokumen_pendukung_access_url')"
                    >
                      <el-icon color="#434343">
                        <View />
                      </el-icon>
                    </div>
                    <div
                      v-if="hasAccess('UPLOAD_DOKUMEN_KONSUMEN_FILE')"
                      class="item-actions__wrapper"
                      @click="handleRemoveDocument('dokumen_pendukung_access_url')"
                    >
                      <el-icon color="#FF613A">
                        <Delete />
                      </el-icon>
                    </div>
                  </span>
                </div>
              </template>
              <div
                v-else
                class="image-upload__empty-state empty-state"
              >
                <el-icon
                  size="77"
                  color="#9D9D9D"
                  class="empty-state__upload-image-icon"
                >
                  <Document />
                </el-icon>
                <div
                  v-if="hasAccess('UPLOAD_DOKUMEN_KONSUMEN_FILE')"
                  class="empty-state__desc"
                >
                  Letakkan dokumen disini atau telusuri dokumen dari PC Anda
                </div>
                <div
                  v-if="hasAccess('UPLOAD_DOKUMEN_KONSUMEN_FILE')"
                  class="empty-state__format"
                >
                  Format yang didukung: .pdf, ukuran maksimum: 2mb
                </div>
              </div>
            </el-upload>
            <div class="image-upload__label">
              Dokumen Pendukung
            </div>
          </div>
        </div>

        <div class="manajemen-dokumen-konsumen-edit__input-section input-section">
          <div class="input-section__header header">
            <div class="header__title-wrapper">
              <img
                :src="icons.newspaperClipping"
                alt="Image Icon"
              />
              <div class="header__title">
                Rincian Pembelian Unit
              </div>
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Nama Marketer
              </div>
              <el-input
                v-model="formData.marketer_nama"
                class="row__input"
                disabled
              />
            </div>
            <div class="rows__row">
              <div class="row__label">
                Unit
              </div>
              <el-input
                :model-value="`${formData.unit_cluster_nama} - ${formData.unit_nomor_kavling}`"
                class="row__input"
                disabled
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row row">
              <div class="row__label required">
                Status Verifikasi
              </div>
              <el-select
                v-model="formData.status_verifikasi"
                :disabled="isCurrentEndVerificationStatus"
                placeholder="Pilih status verifikasi"
                class="row__input"
              >
                <el-option
                  v-for="status in verificationStatuses"
                  :key="status.code"
                  :label="status.name"
                  :value="status.code"
                />
              </el-select>
            </div>
            <div
              v-if="formData.status_verifikasi === 'TERVERIFIKASI' || isEndVerificationStatus"
              class="rows__row"
            >
              <div class="row__label">
                Status Pembayaran
              </div>
              <el-select
                v-model="formData.status_pembayaran"
                placeholder="Pilih status pembayaran"
                class="row__input"
              >
                <el-option
                  v-for="status in paymentStatuses"
                  :key="status.code"
                  :label="status.name"
                  :value="status.code"
                />
              </el-select>
            </div>
            <div
              v-else-if="formData.status_verifikasi === 'TERJADWAL_VERIFIKASI'"
              class="rows__row"
            >
              <div class="row__label required">
                Tanggal Verifikasi
              </div>
              <el-date-picker
                v-model="formData.tanggal_verifikasi"
                type="date"
                placeholder="Pilih tanggal verifikasi"
                format="DD-MM-YYYY"
                value-format="YYYY-MM-DD"
                class="row__input"
              />
            </div>
            <div
              v-else
              class="rows__row"
            >
              <div class="row__label">
                Keterangan
              </div>
              <el-input
                v-model="formData.keterangan"
                :rows="3"
                resize="none"
                placeholder="Masukkan keterangan"
                type="textarea"
                class="row__input"
              />
            </div>
          </div>
          <div
            v-if="formData.status_verifikasi === 'TERVERIFIKASI' || formData.status_verifikasi === 'TERJADWAL_VERIFIKASI' || isEndVerificationStatus"
            class="input-section__rows rows"
          >
            <div
              class="rows__row"
            >
              <div class="row__label">
                Keterangan
              </div>
              <el-input
                v-model="formData.keterangan"
                :rows="3"
                resize="none"
                placeholder="Masukkan keterangan"
                type="textarea"
                class="row__input"
              />
            </div>
          </div>
        </div>
        <div class="manajemen-dokumen-konsumen-edit__input-section input-section">
          <div class="input-section__header header">
            <div class="header__title-wrapper">
              <img
                :src="icons.newspaperClipping"
                alt="Image Icon"
              />
              <div class="header__title">
                Rincian Deal
              </div>
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Harga Deal Awal
              </div>
              <el-input
                v-model="formData.harga_deal_awal"
                :formatter="(value) => `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`"
                :parser="(value) => value.replace(/[^\d]/g, '')"
                placeholder="Masukkan harga deal awal"
                class="row__input"
                @input="validateDiskon"
              />
            </div>
            <div class="rows__row">
              <div class="row__label">
                Harga Cash
              </div>
              <el-input
                v-model="formData.unit_harga"
                :formatter="(value) => `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`"
                :parser="(value) => value.replace(/[^\d]/g, '')"
                placeholder="Masukkan diskon terlebih dahulu"
                class="row__input"
                disabled
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Harga Deal Akhir
              </div>
              <el-input
                v-model="formData.harga_deal_akhir"
                :formatter="(value) => `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`"
                :parser="(value) => value.replace(/[^\d]/g, '')"
                placeholder="Masukkan harga deal awal dan diskon terlebih dahulu"
                class="row__input"
                disabled
              />
            </div>
            <div class="rows__row">
              <div class="row__label">
                Harga Cash Setelah Diskon
              </div>
              <el-input
                v-model="formData.harga_cash_setelah_diskon"
                :formatter="(value) => `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`"
                :parser="(value) => value.replace(/[^\d]/g, '')"
                placeholder="Masukkan diskon terlebih dahulu"
                class="row__input"
                disabled
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Diskon
              </div>
              <el-input
                v-model="formData.nominal_diskon"
                :formatter="(value) => `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`"
                :parser="(value) => value.replace(/[^\d]/g, '')"
                :class="{ 'row__input--error': !!error.diskon }"
                placeholder="Masukkan diskon"
                class="row__input"
                @input="validateDiskon"
              />
              <div class="row__email">
                <el-icon
                  v-if="!!error.diskon"
                  color="#CC4E2E"
                >
                  <WarningFilled />
                </el-icon>
                <div class="row__email-msg">
                  {{ error.diskon }}
                </div>
              </div>
            </div>
            <div class="rows__row">
              <div class="row__label">
                Kategori Diskon
              </div>
              <el-input
                v-model="formData.kategori_diskon"
                placeholder="Masukkan kategori diskon"
                class="row__input"
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Skema Pembayaran
              </div>
              <el-input
                v-model="formData.skema_bayar"
                placeholder="Masukkan skema pembayaran"
                class="row__input"
              />
            </div>
            <div class="rows__row">
              <div class="row__label">
                Tanggal PPJB
              </div>
              <el-date-picker
                v-model="formData.tanggal_ppjb"
                type="date"
                placeholder="Pilih tanggal PPJB"
                format="DD-MM-YYYY"
                value-format="YYYY-MM-DD"
                class="row__input"
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Keterangan Deal
              </div>
              <el-input
                v-model="formData.keterangan_deal"
                placeholder="Masukkan keterangan deal"
                class="row__input"
              />
            </div>
          </div>
        </div>
        <div class="manajemen-dokumen-konsumen-edit__submit-section">
          <el-button
            type="secondary"
            class="manajemen-dokumen-konsumen-edit__cancel-btn"
            @click="goToManajemenDokumenKonsumen"
          >
            Cancel
          </el-button>
          <el-button
            :disabled="!isSubmitButtonDisabled"
            :loading="visibleLoading"
            type="primary"
            class="manajemen-dokumen-konsumen-edit__submit-btn"
            @click="submit"
          >
            Simpan
          </el-button>
        </div>
      </div>
    </div>
  </div>

  <el-dialog v-model="visibleImagePreviewDialog">
    <img
      :src="selectedImageUrl"
      alt="Preview Image"
      class="manajemen-dokumen-konsumen-edit__preview-image"
    />
  </el-dialog>
</template>

<script src="./js/manajemen-dokumen-konsumen-edit.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";

  .manajemen-dokumen-konsumen-edit {
    &__form-wrapper {
      background: white;
      border-radius: 12px;
      border: 1px solid #EAEAEA;
      background: #FFF;
      box-shadow: 0px 4px 8px 0px rgba(224, 224, 224, 0.20);
    }

    .input-image-wrapper {
      background: white;
      border-radius: 12px;
      border: 1px solid #EAEAEA;
      background: #FFF;
      box-shadow: 0px 4px 8px 0px rgba(224, 224, 224, 0.20);
      margin-bottom: 24px;

      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;
        padding-top: 20px;
        padding-right: 20px;
        padding-left: 20px;

        &__title-wrapper {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        &__title {
          color: #555;
          font-size: 16px;
          font-weight: 600;
        }

        &__total-image-uploaded {
          color: #434343;
          font-size: 14px;
          font-weight: 600;
        }

        &__max-image {
          color: #9D9D9D;
          font-size: 14px;
          font-weight: 500;
        }
      }

      .image-upload {
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 24px;

        &__label {
          margin-top: 8px;
          color: #434343;
          font-family: Plus Jakarta Sans;
          font-size: 14px;
          font-weight: 600;
        }

        &__uploader {
          height: 250px;
        }

        :deep(.el-upload) {
          height: 100%;
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

        .content {
          width: 270px;
          height: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          border: 1px dashed #C4C4C4;
          transform: 0.3s;

          &--bg-success {
            background-color: #D4E6D5;
          }

          // &--w-auto {
          //   width: auto;
          // }
          
          &__img {
            width: 270px;
            height: 100%;
            object-fit: cover;
            border-radius: 4px;
            transition: 0.3s;

            &--hovered {
              filter: brightness(50%);
            }
          }

          .item-actions {
            display: flex;
            gap: 8px;
            bottom: 115px;
            left: calc((100% - 80px) / 2);
            position: absolute;
            opacity: 0;
            transition: 0.3s;

            &--view-only {
              left: calc((100% - 40px) / 2);
            }

            &--visible {
              opacity: 1;
            }

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

          &__upload-image-icon {
            display: block;
            margin-bottom: 16px;
            margin-left: auto;
            margin-right: auto;
          }

          &__desc {
            color: #696969;
            text-align: center;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 8px;
          }

          &__format {
            color: #A9A9A9;
            text-align: center;
            font-size: 12px;
            font-weight: 500;
          }
        }
      }
    }

    &__preview-image {
      width: 50%;
      display: block;
      margin: auto;
    }

    .input-section {
      margin-top: 20px;
      border-top: 1px solid #E9E9E9;

      &--top {
        margin-top: 0;
        border-top: none;
        border-bottom: 1px solid #E9E9E9;
      }

      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;

        &--bordered {
          border-top: 1px solid #E9E9E9;
          padding-top: 36px;
          margin-top: 36px;
        }

        &__title-wrapper {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        &__title {
          color: #555;
          font-size: 16px;
          font-weight: 600;
        }

        &__total-image-uploaded {
          color: #434343;
          font-size: 14px;
          font-weight: 600;
        }

        &__max-image {
          color: #9D9D9D;
          font-size: 14px;
          font-weight: 500;
        }
      }
    }

    &__submit-section {
      border-top: 1px solid #E9E9E9;
      padding: 20px;
      display: flex;
      justify-content: end;
    }

    &__submit-btn, &__cancel-btn {
      width: 100px;
    }

    .rows {
      display: flex;
      gap: 24px;
      padding-left: 20px;
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

    .required::after {
      content: "*";
      color: #FF613A;
    }

    :deep(.el-date-editor) {
      width: 400px;
    }
  }
</style>