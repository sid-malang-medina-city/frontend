<template>
  <div class="manajemen-unit-create">
    <page-header
      title="Buat Unit Baru"
      show-back-icon
      @back="goToManajemenUnit"
    />

    <div class="page-content">
      <div class="manajemen-unit-create__input-image-wrapper input-image-wrapper">
        <div class="input-image-wrapper__header header">
          <div class="header__title-wrapper">
            <img
              :src="icons.image"
              alt="Image Icon"
            />
            <div class="header__title">
              Unggah Gambar Unit
            </div>
          </div>
          <div class="header__image-counter">
            <span class="header__total-image-uploaded">{{ totalImagesUploaded }}</span>
            <span class="header__max-image">/3</span>
          </div>
        </div>

        <div class="input-image-wrapper__image-upload image-upload">
          <el-upload
            :http-request="() => {}"
            :show-file-list="false"
            :before-upload="validateUpload1"
            :class="{ error: uploadedImages[0].error }"
            accept=".jpg, .jpeg, .png"
            action=""
            class="image-upload__uploader"
          >
            <template v-if="uploadedImages[0].visible">
              <div
                class="image-upload__content content"
                :class="{ 'content--w-auto': uploadedImages[0].visible }"
                @click.stop=""
                @mouseenter="addVisibleImageActionIcons(0)"
                @mouseleave="removeVisibleImageActionIcons(0)"
              >
                <img
                  :src="uploadedImages[0].url"
                  :class="{ 'content__img--hovered': visibleImageActionIcons[0] }"
                  alt=""
                  class="content__img"
                />
                <span
                  v-if="visibleImageActionIcons[0]"
                  class="content__item-actions item-actions"
                >
                  <div
                    class="item-actions__wrapper"
                    @click="handlePictureCardPreview(0)"
                  >
                    <el-icon color="#434343">
                      <View />
                    </el-icon>
                  </div>
                  <div
                    class="item-actions__wrapper"
                    @click="handleRemove(0)"
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
                Letakkan gambar unit disini atau telusuri gambar dari PC Anda
              </div>
              <div class="empty-state__format">
                Format yang didukung: .jpg, .png, ukuran maksimum: 2mb
              </div>
            </div>
          </el-upload>
          <el-upload
            :http-request="() => {}"
            :show-file-list="false"
            :before-upload="validateUpload2"
            :class="{ error: uploadedImages[1].error }"
            accept=".jpg, .jpeg, .png"
            action=""
            class="image-upload__uploader"
          >
            <template v-if="uploadedImages[1].visible">
              <div
                class="image-upload__content content"
                :class="{ 'content--w-auto': uploadedImages[1].visible }"
                @click.stop=""
                @mouseenter="addVisibleImageActionIcons(1)"
                @mouseleave="removeVisibleImageActionIcons(1)"
              >
                <img
                  :src="uploadedImages[1].url"
                  :class="{ 'content__img--hovered': visibleImageActionIcons[1] }"
                  alt=""
                  class="content__img"
                />
                <span
                  v-if="visibleImageActionIcons[1]"
                  class="content__item-actions item-actions"
                >
                  <div
                    class="item-actions__wrapper"
                    @click="handlePictureCardPreview(1)"
                  >
                    <el-icon color="#434343">
                      <View />
                    </el-icon>
                  </div>
                  <div
                    class="item-actions__wrapper"
                    @click="handleRemove(1)"
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
                Letakkan gambar unit disini atau telusuri gambar dari PC Anda
              </div>
              <div class="empty-state__format">
                Format yang didukung: .jpg, .png, ukuran maksimum: 2mb
              </div>
            </div>
          </el-upload>
          <el-upload
            :http-request="() => {}"
            :show-file-list="false"
            :before-upload="validateUpload3"
            :class="{ error: uploadedImages[2].error }"
            accept=".jpg, .jpeg, .png"
            action=""
            class="image-upload__uploader"
          >
            <template v-if="uploadedImages[2].visible">
              <div
                class="image-upload__content content"
                :class="{ 'content--w-auto': uploadedImages[2].visible }"
                @click.stop=""
                @mouseenter="addVisibleImageActionIcons(2)"
                @mouseleave="removeVisibleImageActionIcons(2)"
              >
                <img
                  :src="uploadedImages[2].url"
                  :class="{ 'content__img--hovered': visibleImageActionIcons[2] }"
                  alt=""
                  class="content__img"
                />
                <span
                  v-if="visibleImageActionIcons[2]"
                  class="content__item-actions item-actions"
                >
                  <div
                    class="item-actions__wrapper"
                    @click="handlePictureCardPreview(2)"
                  >
                    <el-icon color="#434343">
                      <View />
                    </el-icon>
                  </div>
                  <div
                    class="item-actions__wrapper"
                    @click="handleRemove(2)"
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
                Letakkan gambar unit disini atau telusuri gambar dari PC Anda
              </div>
              <div class="empty-state__format">
                Format yang didukung: .jpg, .png, ukuran maksimum: 2mb
              </div>
            </div>
          </el-upload>
        </div>
      </div>

      <div class="manajemen-unit-create__form-wrapper">
        <div class="manajemen-unit-create__input-section input-section">
          <div class="input-section__header header">
            <div class="header__title-wrapper">
              <img
                :src="icons.signature"
                alt="Image Icon"
              />
              <div class="header__title">
                Informasi Utama
              </div>
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label required">
                Nomor Kavling
              </div>
              <el-input
                v-model="formData.nomor_kavling"
                placeholder="Masukkan nama unit"
                class="row__input"
              />
            </div>
            <div class="rows__row">
              <div class="row__label required">
                Harga Unit
              </div>
              <el-input
                v-model="formData.harga"
                placeholder="Masukkan harga unit"
                class="row__input"
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row row">
              <div class="row__label required">
                Tipe Unit
              </div>
              <el-input
                v-model="formData.tipe"
                placeholder="Masukkan tipe unit"
                class="row__input"
              />
              <!-- <el-select
                v-model="formData.tipe"
                placeholder="Pilih tipe unit"
                class="row__input"
              >
                <el-option
                  v-for="unit in units"
                  :key="unit.code"
                  :label="unit.name"
                  :value="unit.code"
                />
              </el-select> -->
            </div>
          </div>
          <div class="input-section__header header header--bordered">
            <div class="header__title-wrapper">
              <img
                :src="icons.newspaperClipping"
                alt="Image Icon"
              />
              <div class="header__title">
                Informasi Pendukung
              </div>
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Luas Bangunan
              </div>
              <el-input
                v-model="formData.luas_bangunan"
                placeholder="Masukkan luas bangunan"
                class="row__input"
              />
            </div>
            <div class="rows__row row">
              <div class="row__label">
                Luas Tanah
              </div>
              <el-input
                v-model="formData.luas_tanah"
                placeholder="Masukkan luas area"
                class="row__input"
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Fasilitas
              </div>
              <el-input
                v-model="formData.fasilitas"
                placeholder="Masukkan fasilitas"
                class="row__input"
              />
              <!-- <el-select
                v-model="formData.fasilitas"
                placeholder="Pilih fasilitas"
                class="row__input"
              >
                <el-option
                  v-for="facility in facilities"
                  :key="facility.code"
                  :label="facility.name"
                  :value="facility.code"
                />
              </el-select> -->
            </div>
            <div class="rows__row row">
              <div class="row__label">
                Daya Listrik
              </div>
              <el-input
                v-model="formData.daya_listrik"
                placeholder="Masukkan daya listrik"
                class="row__input"
              />
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Jumlah Kamar Tidur
              </div>
              <el-input
                v-model="formData.jumlah_kamar_tidur"
                placeholder="Masukkan jumlah kamar tidur"
                class="row__input"
              />
            </div>
            <div class="rows__row row">
              <div class="row__label">
                Jumlah Kamar Mandi
              </div>
              <el-input
                v-model="formData.jumlah_kamar_mandi"
                placeholder="Masukkan jumlah kamar mandi"
                class="row__input"
              />
            </div>
          </div>
        </div>
        <div class="manajemen-unit-create__submit-section">
          <el-button
            :disabled="!isSubmitButtonDisabled"
            type="primary"
            class="manajemen-unit-create__submit-btn"
            @click="submit"
          >
            Buat Unit
          </el-button>
        </div>
      </div>
    </div>
  </div>

  <el-dialog v-model="visibleImagePreviewDialog">
    <img
      :src="selectedImageUrl"
      alt="Preview Image"
      class="manajemen-unit-create__preview-image"
    />
  </el-dialog>
</template>

<script src="./js/manajemen-unit-create.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";

  .manajemen-unit-create {
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
      padding: 20px;
      margin-bottom: 24px;

      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;

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
        display: flex;
        gap: 24px;

        :deep(.el-upload) {
          height: 100%;
        }

        &__wrapper {
          height: 250px;
          
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
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          border: 1px dashed #C4C4C4;

          &--w-auto {
            width: auto;
          }
          
          &__img {
            width: 250px;
            height: 100%;
            object-fit: contain;
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
      padding: 20px 20px 32px 20px;
      border-bottom: 1px solid #E9E9E9;

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
      padding: 20px;
      display: flex;
      justify-content: end;
    }

    &__submit-btn {
      width: 100px;
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

    .required::after {
      content: "*";
      color: #FF613A;
    }
  }
</style>