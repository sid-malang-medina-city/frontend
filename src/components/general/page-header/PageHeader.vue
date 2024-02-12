<template>
  <div class="page-header">
    <div class="page-header__wrapper">
      <el-icon
        v-if="showBackIcon"
        class="page-header__icon"
        @click="back"
      >
        <Back />
      </el-icon>
      <div class="page-header__title">
        {{ title }}
      </div>
    </div>
    <img
      v-if="filter"
      :src="gearIcon"
      class="page-header__filter"
      alt=""
      @click="handleFilterClick"
    >
  </div>
</template>

<script src="./js/page-header.js"></script>

<style lang="scss" scoped>
  .page-header {
    z-index: 2001;
    position: sticky;
    display: flex;
    gap: 16px;
    align-items: center;
    // justify-content: space-between;
    top: 0;
    padding: 20px;
    background-color: white;
    border-bottom: 1px solid #EAEAEA;

    &__wrapper {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    &__icon {
      cursor: pointer;
    }

    &__title {
      color: #282828;
      font-family: Plus Jakarta Sans;
      font-size: 20px;
      font-weight: 600;
    }

    &__filter {
      cursor: pointer;
    }
  }
</style>