<template>
  <div class="user-profile">
    <page-header
      title="Edit Profil"
      show-back-icon
      @back="goToDashboard"
    />
    <div class="user-profile__wrapper page-content">
      <div class="user-profile__my-profile my-profile">
        <div class="my-profile__header header">
          <img
            :src="userIcon"
            alt=""
          >
          <div class="header__title">
            Profil Anda
          </div>
        </div>
        <div class="my-profile__input-section input-section">
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label required">
                Nama
              </div>
              <el-input
                v-model="formData.name"
                placeholder="Masukkan nama"
                class="row__input"
              />
            </div>
            <div class="rows__row">
              <div class="row__label required">
                Role
              </div>
              <el-select
                v-model="formData.role_id"
                placeholder="Pilih role"
                class="row__input"
                disabled
              >
                <el-option
                  v-for="role in roles"
                  :key="role.id"
                  :label="role.name"
                  :value="role.id"
                />
              </el-select>
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label required">
                Divisi
              </div>
              <el-select
                v-model="formData.division_ids"
                placeholder="Pilih divisi"
                class="row__input"
                multiple
                disabled
              >
                <el-option
                  v-for="division in divisions"
                  :key="division.id"
                  :label="division.name"
                  :value="division.id"
                />
              </el-select>
            </div>
            <div class="rows__row">
              <div class="row__label">
                Email
              </div>
              <el-input
                v-model="formData.email"
                :class="{ 'row__input--error': !!error.email }"
                placeholder="Masukkan email"
                class="row__input"
                disabled
              />
              <div class="row__email">
                <el-icon
                  v-if="!!error.email"
                  color="#CC4E2E"
                >
                  <WarningFilled />
                </el-icon>
                <div class="row__email-msg">
                  {{ error.email }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="my-profile__submit-section">
          <el-button
            :loading="visibleLoading"
            type="primary"
            class="my-profile__submit-btn"
            @click="submit"
          >
            Simpan
          </el-button>
        </div>
      </div>
      
      <div class="user-profile__reset-password reset-password">
        <div class="reset-password__wrapper">
          <img
            :src="keyIcon"
            alt=""
          >
          <div class="reset-password__title">
            Ubah Kata Sandi
          </div>
        </div>
        <el-button
          type="secondary"
          class="reset-password__btn"
          @click="goToChangePassword"
        >
          Ubah
        </el-button>
      </div>
    </div>
  </div>
</template>

<script src="./js/user-profile.js"></script>

<style lang="scss" scoped>
  @import "~/assets/scss/main.scss";

  .my-profile {
    padding: 20px;
    background-color: white;
    border-radius: 12px;
    border: #EAEAEA;
    box-shadow: 0px 4px 8px 0px rgba(224, 224, 224, 0.20);

    .header {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-bottom: 16px;

      &__title {
        color: #555;
        font-size: 20px;
        font-weight: 600;
      }
    }

    .input-section {
      border-bottom: 1px solid #E9E9E9;
    }

    &__submit-section {
      padding-top: 20px;
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

      &:last-child {
        margin-bottom: 28px;
      }

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
  }

  .reset-password {
    margin-top: 24px;
    padding: 20px;
    background-color: white;
    border-radius: 12px;
    border: #EAEAEA;
    box-shadow: 0px 4px 8px 0px rgba(224, 224, 224, 0.20);
    display: flex;
    justify-content: space-between;

    &__wrapper {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    &__btn {
      width: 100px;
    }
  }
</style>
