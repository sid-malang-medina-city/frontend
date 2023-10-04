<template>
  <div class="manajemen-user-create">
    <page-header
      title="Buat User Baru"
      show-back-icon
      @back="goToManajemenUser"
    />

    <img src="https://storage.googleapis.com/sid-mmc.appspot.com/test/Logo%20Ver1-Sakitapa.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=firebase-adminsdk-lixh8%40sid-mmc.iam.gserviceaccount.com%2F20231002%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20231002T121936Z&X-Goog-Expires=1800&X-Goog-SignedHeaders=host&X-Goog-Signature=33efd321507faf82401b8ca91be4aca2492623905c0dcf54e928fa05751df0121514fc55448c26909989739cc915d8b660fd2d930bc3c97d330b0e424ad88cf8c896662796358aed45f965325873570e527830ad8bbbf5934aca9f8ef68897fa4a7e5ad787dd3366dd9bf48b03d3aff42536be47a388ec6450e8896a7102732edce6508a5c6822a83c4764ae418d86e147188b01a19629e9e8738a8bc5196c45022201d77475ecc1c3d0fc3c8d7a6f4bea93f10a60be02db97159f7312f8ab6ab80cb860f85879f7734101a4ab27752c263e6be0472e9ab3deec311acfd92d2fbaf5b2d13e21844c97c8a26199fb15f09d363e25e78b79c9448f146d5007997f">

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
                v-model="formData.division"
                placeholder="Pilih divisi"
                class="row__input"
              >
                <el-option
                  v-for="division in divisions"
                  :key="division.code"
                  :label="division.name"
                  :value="division.code"
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
                v-model="formData.role"
                placeholder="Pilih role"
                class="row__input"
              >
                <el-option
                  v-for="role in roles"
                  :key="role.code"
                  :label="role.name"
                  :value="role.code"
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
        <div class="manajemen-user-create__submit-section">
          <el-button
            :disabled="!isSubmitButtonDisabled"
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