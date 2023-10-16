<template>
  <div class="header">
    <!-- <el-icon class="header__icon">
      <Search />
    </el-icon> -->
    <el-icon class="header__icon">
      <Bell />
    </el-icon>
    <!-- <el-icon class="header__icon">
      <User />
    </el-icon> -->
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

    &__icon {
      cursor: pointer;
      color: #555555;
    }
  }
</style>