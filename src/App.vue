<template>
  <el-config-provider namespace="ep">
    <div
      v-if="routeIsNotLogin"
      class="app"
    >
      <div
        id="main"
        class="app__main"
        :class="{ fullscreen : isCollapse }"
      >
        <header class="app__header">
          <app-header />
        </header>
        <section
          class="app__pages"
        >
          <router-view
            v-if="visibleRouterView"
            class="app__content"
          />
        </section>
      </div>
      <nav
        id="navigation-sidebar"
        class="app__nav"
        :class="{ collapse : isCollapse }"
      >
        <app-navigation @toggle="toggleNavigation"/>
      </nav>
    </div>
    <router-view v-else />
  </el-config-provider>
</template>

<script src="./js/app.js"></script>

<style lang="scss" scoped>

  .app {
    position: relative;
    height: 100vh;
    overflow: auto;

    &__header {
      height: 52px;
      border-bottom: 1px solid #EAEAEA;
    }

    &__main {
      transition: margin-left .3s;
      margin-left: 240px;

      &.fullscreen {
        margin-left: 100px;
      }
    }

    &__nav {
      height: 100%;
      width: 300px;
      position: fixed;
      top: 0;
      left: 0;
      transition: .3s;
      background-color: #fff;
      z-index: 6;
      border-right: 1px solid #EAEAEA;
      box-shadow: 0px 4px 8px 0px rgba(224, 224, 224, 0.20);

      &.collapse {
        width: 100px;
      }
    }

    &__pages {
      min-height: calc(100vh - 108px);
      padding: 20px 20px 30px;
      background: #FAFAFA;
    }

    &__back-top {
      background: #9FCE62;
      box-shadow: 0 0 16px -4px #9FCE62;
      border-radius: 16px;
      width: 114px;
      height: 42px;

      &-text {
        margin-left: 8px;
      }
    }
  }
</style>
