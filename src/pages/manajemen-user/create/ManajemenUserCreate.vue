<template>
  <div class="manajemen-user-create">
    <page-header
      title="Buat User Baru"
      show-back-icon
      @back="goToManajemenUser"
    />

    <div class="page-content">
      <div class="manajemen-user-create__wrapper">
        <div class="manajemen-user-create__input-section input-section">
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Nama User
              </div>
              <el-input
                v-model="formData.name"
                placeholder="Masukkan nama user"
                class="row__input"
              />
            </div>
            <div class="rows__row row">
              <div class="row__label">
                Divisi
              </div>
              <el-select
                v-model="formData.division_ids"
                placeholder="Pilih divisi"
                class="row__input"
                multiple
              >
                <el-option
                  v-for="division in divisions"
                  :key="division.id"
                  :label="division.name"
                  :value="division.id"
                />
              </el-select>
            </div>
          </div>
          <div class="input-section__rows rows">
            <div class="rows__row">
              <div class="row__label">
                Role
              </div>
              <el-select
                v-model="formData.role_id"
                placeholder="Pilih role"
                class="row__input"
              >
                <el-option
                  v-for="role in roles"
                  :key="role.id"
                  :label="role.name"
                  :value="role.id"
                />
              </el-select>
            </div>
            <div class="rows__row row">
              <div class="row__label">
                Email
              </div>
              <el-input
                v-model="formData.email"
                :class="{ 'row__input--error': !!error.email }"
                placeholder="Masukkan email"
                class="row__input"
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
                v-model="formData.confirmPassword"
                placeholder="Masukkan kembali kata sandi"
                class="row__input"
                type="password"
                show-password
              />
              <div class="row__confirm-password">
                <el-icon
                  v-if="isPasswordSame"
                  color="#74C627"
                >
                  <CircleCheckFilled />
                </el-icon>
                <el-icon
                  v-else
                  color="#7B7B7B"
                >
                  <CircleCloseFilled />
                </el-icon>
                <div
                  :class="{ 'row__confirm-password-msg--success': isPasswordSame }"
                  class="row__confirm-password-msg"
                >
                  {{ isPasswordSame ? 'Kata sandi sama' : 'Kata sandi tidak sama'}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="manajemen-user-create__submit-section">
          <el-button
            :disabled="!isSubmitButtonDisabled"
            :loading="visibleLoading"
            type="primary"
            class="manajemen-user-create__submit-btn"
            @click="submit"
          >
            Buat User
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/manajemen-user-create.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";

  .manajemen-user-create {
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
  }
</style>