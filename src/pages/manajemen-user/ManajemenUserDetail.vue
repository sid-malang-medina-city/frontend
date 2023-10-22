<template>
  <div class="manajemen-user-detail">
    <page-header
      title="Detail User"
      show-back-icon
      @back="goToManajemenUser"
    />

    <div class="page-content">
      <div class="manajemen-user-detail__wrapper">
        <div class="manajemen-user-detail__header header">
          <div class="header__title">
            <div class="header__title-user">
              User
            </div>
            <div class="header__title-name">
              {{ helpers.convertEmptyValueWithDash(user.name) }}
            </div>
          </div>
          <div class="header__actions actions">
            <el-button
              v-if="hasAccess('UPDATE_USER')"
              type="primary"
              class="actions__edit-btn"
              plain
              @click="goToEditPage"
            >
              Edit User
              <el-icon class="el-icon--right">
                <EditPen />
              </el-icon>
            </el-button>
            <el-button
              v-if="hasAccess('DELETE_USER')"
              :icon="icons.delete"
              type="danger"
              class="actions__delete-btn"
              plain
              @click="openModalConfirmation"
            >
            </el-button>
          </div>
        </div>

        <div class="manajemen-user-detail__content content">
          <div class="content__name-wrapper">
            <div class="content__name-label">
              Nama User
            </div>
            <div class="content__name">
              {{ helpers.convertEmptyValueWithDash(user.name) }}
            </div>
          </div>

          <div class="content__rows">
            <div class="content__row">
              <div class="content__data">
                <div class="content__label">
                  Divisi
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(user.division?.name) }}
                </div>
              </div>
              <div class="content__data">
                <div class="content__label">
                  Role
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(user.role?.name) }}
                </div>
              </div>
            </div>
            <div class="content__row">
              <div class="content__data">
                <div class="content__label">
                  Email
                </div>
                <div class="content__value">
                  {{ helpers.convertEmptyValueWithDash(user.email) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/manajemen-user-detail.js"></script>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";

  .manajemen-user-detail {
    &__wrapper {
      background-color: white;
      border-radius: 12px;
      border: 1px solid #EAEAEA;
      box-shadow: 0px 4px 8px 0px rgba(224, 224, 224, 0.20);
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
      padding: 20px;
      border-top: 1px solid #E9E9E9;

      &__name-wrapper {
        margin-bottom: 28px;
        padding: 16px;
        background-color: #F5F5F5;
        border-left: 6px solid #C4C4C4;
        border-radius: 8px;
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
    }
  }
</style>