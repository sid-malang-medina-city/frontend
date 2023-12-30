<template>
  <div class="manajemen-unit-detail">
    <page-header
      title="Detail Unit"
      show-back-icon
      @back="goToManajemenUnit"
    />

    <div class="page-content">
      <div class="manajemen-unit-detail__wrapper">
        <div class="manajemen-unit-detail__header header">
          <div class="header__title">
            <div class="header__title-unit">
              Unit
            </div>
            <div class="header__title-name">
              {{ unit.nomor_kavling }}
            </div>
          </div>
          <div class="header__actions actions">
            <el-button
              v-if="hasAccess('UPDATE_UNIT')"
              type="primary"
              class="actions__edit-btn"
              plain
              @click="goToEditPage"
            >
              Edit Unit
              <el-icon class="el-icon--right">
                <EditPen />
              </el-icon>
            </el-button>
            <!-- <el-button
              v-if="hasAccess('DELETE_UNIT')"
              :icon="icons.delete"
              type="danger"
              class="actions__delete-btn"
              plain
              @click="openModalConfirmation"
            >
            </el-button> -->
          </div>
        </div>

        <div class="manajemen-unit-detail__content content">
          <div class="content__informasi-utama-wrapper">

            <div class="content__header">
              <img
                :src="icons.signature"
                alt="Image Icon"
              />
              <div class="content__header-title">
                Informasi Utama
              </div>
            </div>
            <div class="content__informasi-utama informasi-utama">
              <div class="informasi-utama__column column">
                <div class="column__label">
                  Cluster
                </div>
                <div class="column__value">
                  {{ unit.cluster?.nama }}
                </div>
              </div>
              <div class="informasi-utama__column column">
                <div class="column__label">
                  Nomor Kavling
                </div>
                <div class="column__value">
                  {{ unit.nomor_kavling }}
                </div>
              </div>
              <div class="informasi-utama__column column">
                <div class="column__label">
                  Harga Unit
                </div>
                <div class="column__value">
                  {{ helpers.convertPriceToRupiah(unit.harga) }}
                </div>
              </div>
              <div class="informasi-utama__column column">
                <div class="column__label">
                  Tipe Unit
                </div>
                <div class="column__value">
                  {{ unit.tipe?.nama }}
                </div>
              </div>
              <div class="informasi-utama__column column">
                <div class="column__label">
                  Status
                </div>
                <div class="column__value">
                  <status-badge
                    :text="statuses[unit.status] ? statuses[unit.status].name: ''"
                    :color="statuses[unit.status] ? statuses[unit.status].color: ''"
                    type="detail"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="isImagesExists"
            class="content__image-upload image-upload"
          >
            <el-upload
              v-for="index in 3"
              :http-request="() => {}"
              :show-file-list="false"
              accept=".jpg, .jpeg, .png"
              action=""
              class="image-upload__uploader"
            >
              <template v-if="!!getImageUrl(index)">
                <div
                  class="image-upload__image-content image-content"
                  :class="{ 'image-content--w-auto': !!getImageUrl(index) }"
                  @click.stop=""
                  @mouseenter="addVisibleImageActionIcons(index)"
                  @mouseleave="removeVisibleImageActionIcons(index)"
                >
                  <img
                    :src="getImageUrl(index)"
                    :class="{ 'image-content__img--hovered': visibleImageActionIcons[index-1] }"
                    alt=""
                    class="image-content__img"
                  />
                  <span
                    v-if="visibleImageActionIcons[index-1]"
                    class="image-content__item-actions item-actions"
                  >
                    <div
                      class="item-actions__wrapper"
                      @click="handlePictureCardPreview(index)"
                    >
                      <el-icon color="#434343">
                        <View />
                      </el-icon>
                    </div>
                  </span>
                </div>
              </template>
            </el-upload>
          </div>

          <div class="content__informasi-pendukung-wrapper">
            <div class="content__header">
              <img
                :src="icons.newspaperClipping"
                alt="Image Icon"
              />
              <div class="content__header-title">
                Informasi Pendukung
              </div>
            </div>
  
            <div class="content__rows rows">
              <div class="rows__row">
                <div class="row__label required">
                  Luas Tanah
                </div>
                <div class="row__value row__value--flex">
                  {{ `${helpers.convertEmptyValueWithDash(unit.luas_tanah)} ` }}
                  <div
                    v-if="helpers.convertEmptyValueWithDash(unit.luas_tanah) !== '-'"
                    class="row__uom"
                  >
                    m<sup>2</sup>
                  </div>
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Luas Bangunan
                </div>
                <div class="row__value row__value--flex">
                  {{ helpers.convertEmptyValueWithDash(unit.luas_bangunan) }}
                  <div
                    v-if="helpers.convertEmptyValueWithDash(unit.luas_bangunan) !== '-'"
                    class="row__uom"
                  >
                    m<sup>2</sup>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="content__rows rows">
              <div class="rows__row">
                <div class="row__label required">
                  Fasilitas
                </div>
                <div class="row__value row__value--flex-start">
                  <div
                    v-if="unit.fasilitas?.length > 0"
                    v-for="fasilitas in unit.fasilitas"
                    class="row__fasilitas"
                  >
                    {{ fasilitas.nama }}
                  </div>
                  <div v-else>-</div>
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Daya Listrik
                </div>
                <div class="row__value row__value--flex">
                  {{ helpers.convertEmptyValueWithDash(unit.daya_listrik) }}
                  <div
                    v-if="helpers.convertEmptyValueWithDash(unit.daya_listrik) !== '-'"
                    class="row__uom"
                  >
                    watt
                  </div>
                </div>
              </div>
            </div>
            
            <div class="content__rows rows">
              <div class="rows__row">
                <div class="row__label required">
                  Jumlah Kamar Tidur
                </div>
                <div class="row__value">
                  {{ helpers.convertEmptyValueWithDash(unit.jumlah_kamar_tidur) }}
                </div>
              </div>
              <div class="rows__row">
                <div class="row__label required">
                  Jumlah Kamar Mandi
                </div>
                <div class="row__value">
                  {{ helpers.convertEmptyValueWithDash(unit.jumlah_kamar_mandi) }}
                </div>
              </div>
            </div>
            
            <div class="content__rows rows last-row">
              <div class="rows__row">
                <div class="row__label required">
                  Jadwal Bangun
                </div>
                <div class="row__value">
                  {{ helpers.convertEmptyValueWithDash(helpers.convertDateTimeZoneToDateString(unit.jadwal_bangun)) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="manajemen-unit-detail__author-info author-info">
          <div class="author-info__label">
            Dibuat oleh
          </div>
          <div class="author-info__value">
            <div class="author-info__author">
              {{ unit.created_by_name }}
            </div>
            <div class="author-info__date-time">
              {{ helpers.convertDateTimeZoneToDateTimeString(unit.created_at) }}
            </div>
          </div>
          <div class="author-info__label">
            Dimodifikasi oleh
          </div>
          <div class="author-info__value">
            <div class="author-info__author">
              {{ unit.updated_by_name }}
            </div>
            <div class="author-info__date-time">
              {{ helpers.convertDateTimeZoneToDateTimeString(unit.updated_at) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog v-model="visibleImagePreviewDialog">
      <img
        :src="selectedImageUrl"
        alt="Preview Image"
        class="manajemen-unit-detail__preview-image"
      />
    </el-dialog>
  </div>
</template>

<script src="./js/manajemen-unit-detail.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";

  .manajemen-unit-detail {
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
        gap: 8px;
        margin-bottom: 24px;

        &-title {
          color: #555;
          font-size: 16px;
          font-weight: 600;
        }
      }

      &__informasi-utama-wrapper, &__informasi-pendukung-wrapper {
        padding: 20px;
      }

      &__informasi-pendukung-wrapper {
        border-top: 1px solid #E9E9E9;
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
            width: 400px;
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

      .image-upload {
        display: flex;
        gap: 24px;
        margin-bottom: 20px;
        padding: 20px;
        background: #F5F5F5;

        :deep(.el-upload) {
          height: 100%;
          cursor: default;
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

        .image-content {
          width: 270px;
          height: 100%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;

          &--w-auto {
            width: auto;
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
  }
</style>