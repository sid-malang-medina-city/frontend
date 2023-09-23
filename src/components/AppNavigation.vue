<template>
  <div class="navigation">
    <div class="navigation__container">
      <div
        :class="{ 'navigation__logo--collapse': isCollapse }"
        class="navigation__logo"
      >
        <img
          v-if="!isCollapse"
          :src="sidIcon"
          alt=""
          class="navigation__logo-icon"
        >
        <div
          v-if="!isCollapse"
          class="navigation__title"
        >
          Sistem Informasi Developer
        </div>
        <el-button
          :class="{ active : isCollapse }"
          class="navigation__btn-toggle-menu"
          link
          @click="toggleNavigation"
        >
          <el-icon>
            <Menu />
          </el-icon>
        </el-button>
      </div>
      <el-scrollbar>
        <div
          v-if="!isCollapse"
          class="navigation__main-menu-title"
        >
          MENU UTAMA
        </div>
        <el-menu
          :key="1"
          :default-active="$route.name"
          class="ep-menu-vertical"
          :collapse="isCollapse"
          unique-opened
          router
        >
          <div
            v-for="(menu, menuIndex) in menuItems"
            :key="'menu-item' + menuIndex"
            class="ep-menu__custom-wrapper"
          >
            <el-sub-menu
              v-if="menu.children.length"
              :index="`${menu.labelIndex}`"
            >
              <template #title>
                <div class="navigation__menu-wrapper">
                  <img
                    :src="menu.iconPath"
                    alt=""
                    class="navigation__menu-icon"
                  >
                  <div v-if="!isCollapse">
                    {{ menu.label }}
                  </div>
                </div>
              </template>
              <el-menu-item
                v-for="(subMenu, subIndex) in getChildren(menuIndex)"
                :key="'sub-menu-item' + subIndex"
                :route="{ name: subMenu.routeName }"
                :index="subMenu.routeName"
              >
                {{ subMenu.label }}
              </el-menu-item>
            </el-sub-menu>

            <el-menu-item
              v-else
              :route="{ name: menu.routeName }"
              :index="menu.routeName"
            >
              <img
                :src="menu.iconPath"
                :class="{ grayscale: menu.routeName !== $route.name}"
                class="ep-menu__icon"
                alt=""
              >
              <template #title>
                <div>
                  {{ menu.label }}
                </div>
              </template>
            </el-menu-item>
          </div>
        </el-menu>

        <div
          v-if="!isCollapse"
          class="navigation__main-menu-title"
        >
          KONFIGURASI
        </div>
        <el-menu
          :key="2"
          :default-active="$route.name"
          class="ep-menu-vertical"
          :collapse="isCollapse"
          unique-opened
          router
        >
          <div
            v-for="(menu, menuIndex) in adminMenuItems"
            :key="'menu-item' + menuIndex"
            class="ep-menu__custom-wrapper"
          >
            <el-menu-item
              :route="{ name: menu.routeName }"
              :index="menu.routeName"
            >
              <img
                :src="menu.iconPath"
                :class="{ grayscale: menu.routeName !== $route.name, 'ep-menu__icon--collapse': isCollapse }"
                class="ep-menu__icon"
                alt=""
              >
              <template #title>
                <div>
                  {{ menu.label }}
                </div>
              </template>
            </el-menu-item>
          </div>
        </el-menu>

        <div
          :class="{ 'navigation__logout-btn-wrapper--collapse': isCollapse }"
          class="navigation__logout-btn-wrapper"
        >
          <el-button
            v-if="!isCollapse"
            :icon="logoutIcon"
            type="primary"
            class="navigation__logout-btn"
            plain
            @click="logout"
          >
            Logout
          </el-button>
          <el-button
            v-else
            :icon="logoutIcon"
            type="primary"
            class="navigation__logout-btn--collapse"
            plain
            @click="logout"
          />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script src="./js/app-navigation.js"></script>

<style lang="scss" scoped>
  /* CUSTOM CSS FOR ELEMENT-UI NAVIGATION */

  :deep(.ep-menu--collapse) {
    width: 100px;
  }

  .ep-menu {
    border: none;
    height: 100%;

    .ep-menu-item {
      height: 42px;
      line-height: 42px;

      &.is-active::v-deep {
        border-left: 4px solid #859671;
        // background-color: rgba(0, 218, 84, 0.05);
        font-weight: 600;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        color: #859671;
        padding-left: 16px;
      }
    }

    :deep(.ep-tooltip__trigger) {
      justify-content: center;
      padding-right: 20px;
    }

    .ep-sub-menu::v-deep {
      .ep-sub-menu__title {
        height: 42px;
        line-height: 42px;
      }

      &.is-active {

        .ep-sub-menu__title {
          color: #0095da;
        }
      }
    }

    &__icon {
      margin-right: 7px;

      &.grayscale {
        filter: grayscale(1);
      }

      &--collapse {
        margin-right: 0;
      }
    }

    &--collapse {

      &>.ep-menu__custom-wrapper {

        &>.ep-menu-item::v-deep {

          span {
            height:0;
            width:0;
            overflow:hidden;
            visibility:hidden;
            display:inline-block
          }

          [class^=ep-icon-] {
            margin:0;
            vertical-align:middle;
            width:24px;
            text-align:center
          }

          .ep-sub-menu__icon-arrow {
            display: none;
          }

          &.is-active i{
            color:inherit;
          }
        }

        &>.ep-sub-menu::v-deep {

          span {
            height:0;
            width:0;
            overflow:hidden;
            visibility:hidden;
            display:inline-block
          }

          .ep-sub-menu__title {

            [class^=ep-icon-] {
              margin:0;
              vertical-align:middle;
              width:24px;
              text-align:center
            }
          }

          .ep-sub-menu__icon-arrow {
            display: none;
          }
        }
      }
    }
  }

  .ep-menu-vertical:not(.ep-menu--collapse) {
    width: 300px;
    // min-height: 400px;
    border: none;
  }
  /* -- */

  /* CUSTOM CSS FOR epEMENT-UI SCROLLBAR */
  .ep-scrollbar {
    height: 100%;

    &::v-deep &__bar.is-vertical {
      opacity: 1;
    }
  }

  .ep-scrollbar__wrapper {
    overflow-y: auto;
  }
  /* -- */

  .navigation {

    &__container {
      height: calc(100vh - 60px);
    }

    &__logo {
      margin: 0 20px;
      height: 70px;
      align-items: center;
      display: flex;
      gap: 12px;

      &--collapse {
        justify-content: center;
      }

      &-icon {
        width: 40px;
      }

      span {
        font-size: 2em;
        font-weight: bold;
        color: #0095da;
      }
    }

    &__title {
      width: 148px;
      color: #61876E;
      font-family: Plus Jakarta Sans;
      font-size: 16px;
      font-weight: 700;
    }

    &__menu-wrapper {
      display: flex;
      gap: 8px;
    }

    &__menu-icon {
      width: 20px;
    }

    &__btn-toggle-menu {
      position: absolute;
      right: 13px;
      padding: 5px;
      width: 20px;

      &.active {
        position: static;
      }
    }

    &__main-menu-title {
      padding-left: 20px;
      margin-top: 24px;
      margin-bottom: 10px;
      color: #9D9D9D;
      font-size: 14px;
      font-weight: 600;
    }

    &__logout-btn-wrapper {
      padding: 0 20px;
      margin-top: 32px;

      &--collapse {
        padding: 8px 0;
        display: flex;
        justify-content: center;
      }
    }

    &__logout-btn {
      width: 100%;

      &--collapse {
        padding: 0;
        width: 68px;
      }
    }
  }
</style>
