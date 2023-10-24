<template>
  <div class="no-access">
    <div class="no-access__wrapper">
      <img
        :src="emptyBox"
        alt=""
        class="no-access__img"
      >
      <div class="no-access__desc">
        {{ errorType === 'no-access' ? 'Anda tidak memiliki akses ke halaman ini' : 'Halaman tidak ditemukan' }}
      </div>
      <el-button
        type="primary"
        class="no-access__btn"
        @click="goToDashboard"
      >
        Kembali ke Dashboard
      </el-button>
    </div>
  </div>
</template>

<script src="./js/no-access.js"></script>

<style lang="scss" scoped>
  .no-access {
    height: calc(100vh - 108px);
    display: flex;
    justify-content: center;
    align-items: center;

    &__wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__img {
      margin-bottom: 20px;
    }

    &__desc {
      text-align: center;
      margin-bottom: 15px;
    }
  }
</style>