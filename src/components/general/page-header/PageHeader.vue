<template>
  <div class="page-header">
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
</template>

<script src="./js/page-header.js"></script>

<style lang="scss" scoped>
  .page-header {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 20px;
    background-color: white;
    border-bottom: 1px solid #EAEAEA;

    &__icon {
      cursor: pointer;
    }

    &__title {
      color: #282828;
      font-family: Plus Jakarta Sans;
      font-size: 20px;
      font-weight: 600;
    }
  }
</style>