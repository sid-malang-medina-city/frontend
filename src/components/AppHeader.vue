<template>
  <div
    id="id-header"
    class="header"
  >
    <el-popover
      :width="300"
      placement="bottom-start"
      trigger="click"
      popper-style="width: 360px; border-radius: 8px; padding: 0;"
    >
      <el-scrollbar max-height="545px">
        <div class="notification-header">
          <div class="notification-header__title">
            Notifikasi ({{ notifications.length }})
          </div>
          <div class="notification-header__read-all">
            <el-button
              v-if="!!notifications.length"
              link
              @click="markAllAsRead"
            >
              <el-icon>
                <Check />
              </el-icon>
              Tandai semua telah dibaca
            </el-button>
          </div>
        </div>
        <div class="notification-content">
          <div
            v-if="!!notifications.length"
            v-for="notification in notifications"
            :class="{ 'notification-content__row--read': notification.is_read }"
            class="notification-content__row"
            @click="markAsRead(notification)"
          >
            <div class="notification-content__row-title">
              <div
                :class="{ 'notification-content__row-title-text--read': notification.is_read }"
                class="notification-content__row-title-text"
              >
                {{ notification.title }}
              </div>
              <div
                v-if="!notification.is_read"
                class="notification-content__row-title-circle"
              />
            </div>
            <div class="notification-content__row-desc">
              {{ notification.message }}
            </div>
            <div class="notification-content__row-date">
              {{ helpers.convertDateTimeZoneToDateTimeStringWib(notification.created_at) }}
            </div>
          </div>
          <el-empty
            v-else
            :image-size="100"
            description="Belum ada notifikasi"
            class="notification-content__empty-state"
          />
        </div>
      </el-scrollbar>
      <template #reference>
        <div class="header__wrapper" @click="visibleNotification = true">
          <el-icon class="header__icon">
            <Bell />
          </el-icon>
          <div
            v-if="isSomeNotificationHasNotBeenRead"
            class="header__red-circle"
          />
        </div>
      </template>
    </el-popover>
    <el-icon
      class="header__icon"
      @click="goToUserProfile"
    >
      <User />
    </el-icon>
  </div>
</template>

<script src="./js/app-header.js"></script>

<style lang="scss" scoped>
  .header {
    box-sizing: border-box;
    padding: 10px 20px;
    display: flex;
    justify-content: end;
    align-items: center;
    height: 52px;
    gap: 18px;

    &__wrapper {
      position: relative;
    }

    &__icon {
      cursor: pointer;
      color: #555555;
    }

    &__red-circle {
      background-color: #FF613A;
      top: 0;
      right: 0;
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 50%;
    }
  }

  .notification-header {
    position: sticky;
    top: 0;
    background-color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #C4C4C4;

    &__title {
      color: #434343;
      font-size: 16px;
      font-weight: 700;
    }

    &__read-all {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 3px;
      color: #61876E;
      font-size: 12px;
    }
  }

  .notification-content {
    &__row {
      padding: 12px 20px;
      border-bottom: 1px solid #E9E9E9;
      background: #EFF3F1;
      cursor: pointer;

      &--read {
        background: white;
      }

      &-title {
        display: flex;
        justify-content: space-between;

        &-text {
          color: #434343;
          word-break: break-word;
          max-width: 80%;
          font-size: 12px;
          font-weight: 700;
          line-height: 20px;

          &--read {
            max-width: 100%;
          }
        }

        &-circle {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #61876E;
        }
      }

      &-desc {
        color: #7B7B7B;
        font-size: 12px;
        line-height: 20px;
        word-break: break-word;
      }

      &-date {
        color: #C4C4C4;
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
</style>