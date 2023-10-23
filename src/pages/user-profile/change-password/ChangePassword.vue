<template>
  <div class="change-password">
    <page-header
      title="Ubah Kata Sandi"
      show-back-icon
      @back="goToDashboard"
    />
    <div class="change-password__wrapper page-content">
      <div class="change-password__my-profile my-profile">
        <!-- <div class="my-profile__header header">
          <img
            :src="userIcon"
            alt=""
          >
          <div class="header__title">
            Profil Anda
          </div>
        </div> -->
        <div class="my-profile__input-section input-section">
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Kata sandi
              </div>
              <el-input
                v-model="formData.password"
                :class="{ 'row__input--error': !!error.password }"
                placeholder="Masukkan kata sandi"
                class="row__input"
                type="password"
                show-password
              />
              <div class="row__password">
                <el-icon
                  v-if="!!error.password"
                  color="#CC4E2E"
                >
                  <WarningFilled />
                </el-icon>
                <div class="row__password-msg">
                  {{ error.password }}
                </div>
              </div>
            </div>
            <div class="rows__row row">
              <div class="row__label">
                Ulangi Kata Sandi
              </div>
              <el-input
                v-model="confirmPassword"
                placeholder="Masukkan kembali kata sandi"
                class="row__input"
                type="password"
                show-password
              />
              <div class="row__confirm-password">
                <el-icon :color="isPasswordSame ? '#74C627' : '#7B7B7B'">
                  <CircleCheckFilled />
                </el-icon>
                <div
                  :class="{ 'row__confirm-password-msg--success': isPasswordSame }"
                  class="row__confirm-password-msg"
                >
                  Kata sandi sama
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="my-profile__submit-section">
          <el-button
            :loading="visibleLoading"
            :disabled="!isPasswordSame"
            type="primary"
            class="my-profile__submit-btn"
            @click="submit"
          >
            Simpan
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/change-password.js"></script>

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
