<template>
  <div class="login">
    <div class="login__wrapper">
      <div class="login__main-section">
        <img
          :src="logo"
          alt="SID MMC Logo"
          class="login__logo"
        />
        <div class="login__title">
          Selamat datang di Sistem Informasi Developer
        </div>
        <div class="login__subtitle">
          Sistem informasi developer adalah platform untuk memfasilitasi operasional bisnis Malang Medina City secara daring
        </div>
        <div class="login__input-wrapper">
          <div class="login__label">
            Email
          </div>
          <el-input
            v-model="formData.email"
            placeholder="Masukkan email"
          />
        </div>
        <div class="login__input-wrapper">
          <div class="login__label">
            Password
          </div>
          <el-input
            v-model="formData.password"
            placeholder="Masukkan password"
            type="password"
            show-password
            @keypress.enter="submit"
          />
        </div>
        <el-button
          :disabled="isSubmitButtonDisabled"
          :loading="visibleLoading"
          type="primary"
          class="login__submit-btn"
          @click="submit"
        >
          Login Akun
        </el-button>
      </div>
      <div class="login__forgot-password">
        Lupa password? hubungi administrator terkait
      </div>
    </div>
  </div>
</template>

<script src="./js/login.js"></script>

<style lang="scss" scoped>
  .login {
    background: #F6F8F4;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    &__wrapper {
      width: 524px;
      border-radius: 20px;
      border: 1px solid #D9D9D9;
      background: white;
    }

    &__main-section {
      padding: 32px;
    }

    &__logo {
      width: 140px;
      display: block;
      margin: auto;
    }

    &__title {
      margin-top: 20px;
      margin-bottom: 12px;
      color: #262626;
      text-align: center;
      font-family: Plus Jakarta Sans;
      font-size: 20px;
      font-weight: 800;
    }

    &__subtitle {
      color: #7B7B7B;
      text-align: center;
      font-family: Plus Jakarta Sans;
      font-size: 14px;
      margin-bottom: 32px;
    }

    &__input-wrapper {
      margin-bottom: 20px;
    }

    &__label {
      color: #282828;
      font-family: Plus Jakarta Sans;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    &__submit-btn {
      margin-top: 12px;
      width: 100%;
      height: 40px;
    }

    &__forgot-password {
      padding: 20px 32px;
      text-align: center;
      color: #9D9D9D;
      font-family: Plus Jakarta Sans;
      font-size: 12px;
      font-weight: 500;
      border-top: 1px solid #D9D9D9;
    }
  }
</style>