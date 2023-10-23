<template>
  <div class="manajemen-dokumen-konsumen-edit">
    <page-header
      title="Edit Dokumen Konsumen"
      show-back-icon
      @back="goToManajemenDokumenKonsumen"
    />

    <div class="page-content">
      <div class="manajemen-dokumen-konsumen-edit__input-image-wrapper input-image-wrapper">
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
          <div class="image-upload__wrapper">
            <el-upload
              :http-request="() => {}"
              :show-file-list="false"
              :before-upload="(...args) => validateUpload(...args, 'e_ktp_access_url')"
              :class="{ error: uploadedImages.e_ktp_access_url.error }"
              accept=".jpg, .jpeg, .png"
              action=""
              class="image-upload__uploader"
            >
              <template v-if="uploadedImages.e_ktp_access_url.visible">
                <div
                  class="image-upload__content content"
                  :class="{ 'content--w-auto': uploadedImages.e_ktp_access_url.visible }"
                  @click.stop=""
                  @mouseenter="addVisibleImageActionIcons('e_ktp_access_url')"
                  @mouseleave="removeVisibleImageActionIcons('e_ktp_access_url')"
                >
                  <img
                    :src="uploadedImages.e_ktp_access_url.url"
                    :class="{ 'content__img--hovered': visibleImageActionIcons.e_ktp_access_url }"
                    alt=""
                    class="content__img"
                  />
                  <span
                    :class="{ 'item-actions--visible': visibleImageActionIcons.e_ktp_access_url }"
                    class="content__item-actions item-actions"
                  >
                    <div
                      class="item-actions__wrapper"
                      @click="handlePictureCardPreview('e_ktp_access_url')"
                    >
                      <el-icon color="#434343">
                        <View />
                      </el-icon>
                    </div>
                    <div
                      class="item-actions__wrapper"
                      @click="handleRemove('e_ktp_access_url')"
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
                <div class="empty-state__desc">
                  Letakkan gambar disini atau telusuri gambar dari PC Anda
                </div>
                <div class="empty-state__format">
                  Format yang didukung: .jpg, .png, ukuran maksimum: 2mb
                </div>
              </div>
            </el-upload>
            <div class="image-upload__label">
              e-KTP
            </div>
          </div>
          <div class="image-upload__wrapper">
            <el-upload
              :http-request="() => {}"
              :show-file-list="false"
              :before-upload="(...args) => validateUpload(...args, 'slip_gaji_access_url')"
              :class="{ error: uploadedImages.slip_gaji_access_url.error }"
              accept=".jpg, .jpeg, .png"
              action=""
              class="image-upload__uploader"
            >
              <template v-if="uploadedImages.slip_gaji_access_url.visible">
                <div
                  class="image-upload__content content"
                  :class="{ 'content--w-auto': uploadedImages.slip_gaji_access_url.visible }"
                  @click.stop=""
                  @mouseenter="addVisibleImageActionIcons('slip_gaji_access_url')"
                  @mouseleave="removeVisibleImageActionIcons('slip_gaji_access_url')"
                >
                  <img
                    :src="uploadedImages.slip_gaji_access_url.url"
                    :class="{ 'content__img--hovered': visibleImageActionIcons.slip_gaji_access_url }"
                    alt=""
                    class="content__img"
                  />
                  <span
                    :class="{ 'item-actions--visible': visibleImageActionIcons.slip_gaji_access_url }"
                    class="content__item-actions item-actions"
                  >
                    <div
                      class="item-actions__wrapper"
                      @click="handlePictureCardPreview('slip_gaji_access_url')"
                    >
                      <el-icon color="#434343">
                        <View />
                      </el-icon>
                    </div>
                    <div
                      class="item-actions__wrapper"
                      @click="handleRemove('slip_gaji_access_url')"
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
                <div class="empty-state__desc">
                  Letakkan gambar disini atau telusuri gambar dari PC Anda
                </div>
                <div class="empty-state__format">
                  Format yang didukung: .jpg, .png, ukuran maksimum: 2mb
                </div>
              </div>
            </el-upload>
            <div class="image-upload__label">
              Slip Gaji
            </div>
          </div>
          <div class="image-upload__wrapper">
            <el-upload
              :http-request="() => {}"
              :show-file-list="false"
              :before-upload="(...args) => validateUpload(...args, 'kartu_keluarga_access_url')"
              :class="{ error: uploadedImages.kartu_keluarga_access_url.error }"
              accept=".jpg, .jpeg, .png"
              action=""
              class="image-upload__uploader"
            >
              <template v-if="uploadedImages.kartu_keluarga_access_url.visible">
                <div
                  class="image-upload__content content"
                  :class="{ 'content--w-auto': uploadedImages.kartu_keluarga_access_url.visible }"
                  @click.stop=""
                  @mouseenter="addVisibleImageActionIcons('kartu_keluarga_access_url')"
                  @mouseleave="removeVisibleImageActionIcons('kartu_keluarga_access_url')"
                >
                  <img
                    :src="uploadedImages.kartu_keluarga_access_url.url"
                    :class="{ 'content__img--hovered': visibleImageActionIcons.kartu_keluarga_access_url }"
                    alt=""
                    class="content__img"
                  />
                  <span
                    :class="{ 'item-actions--visible': visibleImageActionIcons.kartu_keluarga_access_url }"
                    class="content__item-actions item-actions"
                  >
                    <div
                      class="item-actions__wrapper"
                      @click="handlePictureCardPreview('kartu_keluarga_access_url')"
                    >
                      <el-icon color="#434343">
                        <View />
                      </el-icon>
                    </div>
                    <div
                      class="item-actions__wrapper"
                      @click="handleRemove('kartu_keluarga_access_url')"
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
                <div class="empty-state__desc">
                  Letakkan gambar disini atau telusuri gambar dari PC Anda
                </div>
                <div class="empty-state__format">
                  Format yang didukung: .jpg, .png, ukuran maksimum: 2mb
                </div>
              </div>
            </el-upload>
            <div class="image-upload__label">
              Kartu Keluarga
            </div>
          </div>
          <div class="image-upload__wrapper">
            <el-upload
              :http-request="() => {}"
              :show-file-list="false"
              :before-upload="(...args) => validateUpload(...args, 'mutasi_tabungan_access_url')"
              :class="{ error: uploadedImages.mutasi_tabungan_access_url.error }"
              accept=".jpg, .jpeg, .png"
              action=""
              class="image-upload__uploader"
            >
              <template v-if="uploadedImages.mutasi_tabungan_access_url.visible">
                <div
                  class="image-upload__content content"
                  :class="{ 'content--w-auto': uploadedImages.mutasi_tabungan_access_url.visible }"
                  @click.stop=""
                  @mouseenter="addVisibleImageActionIcons('mutasi_tabungan_access_url')"
                  @mouseleave="removeVisibleImageActionIcons('mutasi_tabungan_access_url')"
                >
                  <img
                    :src="uploadedImages.mutasi_tabungan_access_url.url"
                    :class="{ 'content__img--hovered': visibleImageActionIcons.mutasi_tabungan_access_url }"
                    alt=""
                    class="content__img"
                  />
                  <span
                    :class="{ 'item-actions--visible': visibleImageActionIcons.mutasi_tabungan_access_url }"
                    class="content__item-actions item-actions"
                  >
                    <div
                      class="item-actions__wrapper"
                      @click="handlePictureCardPreview('mutasi_tabungan_access_url')"
                    >
                      <el-icon color="#434343">
                        <View />
                      </el-icon>
                    </div>
                    <div
                      class="item-actions__wrapper"
                      @click="handleRemove('mutasi_tabungan_access_url')"
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
                <div class="empty-state__desc">
                  Letakkan gambar disini atau telusuri gambar dari PC Anda
                </div>
                <div class="empty-state__format">
                  Format yang didukung: .jpg, .png, ukuran maksimum: 2mb
                </div>
              </div>
            </el-upload>
            <div class="image-upload__label">
              Mutasi Tabungan
            </div>
          </div>
          <div class="image-upload__wrapper">
            <el-upload
              :http-request="() => {}"
              :show-file-list="false"
              :before-upload="(...args) => validateUpload(...args, 'surat_pernikahan_access_url')"
              :class="{ error: uploadedImages.surat_pernikahan_access_url.error }"
              accept=".jpg, .jpeg, .png"
              action=""
              class="image-upload__uploader"
            >
              <template v-if="uploadedImages.surat_pernikahan_access_url.visible">
                <div
                  class="image-upload__content content"
                  :class="{ 'content--w-auto': uploadedImages.surat_pernikahan_access_url.visible }"
                  @click.stop=""
                  @mouseenter="addVisibleImageActionIcons('surat_pernikahan_access_url')"
                  @mouseleave="removeVisibleImageActionIcons('surat_pernikahan_access_url')"
                >
                  <img
                    :src="uploadedImages.surat_pernikahan_access_url.url"
                    :class="{ 'content__img--hovered': visibleImageActionIcons.surat_pernikahan_access_url }"
                    alt=""
                    class="content__img"
                  />
                  <span
                    :class="{ 'item-actions--visible': visibleImageActionIcons.surat_pernikahan_access_url }"
                    class="content__item-actions item-actions"
                  >
                    <div
                      class="item-actions__wrapper"
                      @click="handlePictureCardPreview('surat_pernikahan_access_url')"
                    >
                      <el-icon color="#434343">
                        <View />
                      </el-icon>
                    </div>
                    <div
                      class="item-actions__wrapper"
                      @click="handleRemove('surat_pernikahan_access_url')"
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
                <div class="empty-state__desc">
                  Letakkan gambar disini atau telusuri gambar dari PC Anda
                </div>
                <div class="empty-state__format">
                  Format yang didukung: .jpg, .png, ukuran maksimum: 2mb
                </div>
              </div>
            </el-upload>
            <div class="image-upload__label">
              Surat Pernikahan
            </div>
          </div>
          <div class="image-upload__wrapper">
            <el-upload
              :http-request="() => {}"
              :show-file-list="false"
              :before-upload="uploadDocument"
              action=""
              class="image-upload__uploader"
            >
              <template v-if="uploadedDocument.visible">
                <div
                  class="image-upload__content content content--bg-success"
                  :class="{ 'content--w-auto': uploadedDocument.visible }"
                  @click.stop=""
                  @mouseenter="addVisibleImageActionIcons('document_pendukung_file')"
                  @mouseleave="removeVisibleImageActionIcons('document_pendukung_file')"
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
                    :class="{ 'item-actions--visible': visibleImageActionIcons.document_pendukung_file }"
                    class="content__item-actions item-actions"
                  >
                    <div
                      class="item-actions__wrapper"
                      @click="openDocumentInNewTab()"
                    >
                      <el-icon color="#434343">
                        <View />
                      </el-icon>
                    </div>
                    <div
                      class="item-actions__wrapper"
                      @click="handleRemoveDocument('dokumen_pendukung_file')"
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
                <div class="empty-state__desc">
                  Letakkan dokumen disini atau telusuri dokumen dari PC Anda
                </div>
                <div class="empty-state__format">
                  Ukuran maksimum: 2mb
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
                Nama Marketer
              </div>
              <el-input
                v-model="formData.marketer_nama"
                class="row__input"
                disabled
              />
            </div>
          </div>
          <div class="input-section__rows rows">
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
            <div class="rows__row row">
              <div class="row__label required">
                Status Verifikasi
              </div>
              <el-select
                v-model="formData.status_verifikasi"
                :disabled="isEndVerificationStatus"
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
          </div>
          <div class="input-section__rows rows">
            <div
              v-if="formData.status_verifikasi === 'TERVERIFIKASI'"
              class="rows__row"
            >
              <div class="row__label">
                Status Pembayaran
              </div>
              <el-select
                v-model="formData.status_pembayaran"
                :disabled="isEndPaymentStatus"
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
            bottom: 125px;
            left: calc((100% - 80px) / 2);
            position: absolute;
            opacity: 0;
            transition: 0.3s;

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