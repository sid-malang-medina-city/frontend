<template>
  <div class="status-badge">
    <div
      class="status-badge__circle"
      :style="`background-color: ${color};`"
    />
    <div class="status-badge__text">
      {{ text }}
    </div>
  </div>
</template>

<script src="./js/status-badge.js"></script>

<style lang="scss" scoped>
  .status-badge {
    width: fit-content;
    display: flex;
    padding: 4px 8px 4px 6px;
    align-items: center;
    gap: 6px;
    border-radius: 4px;
    border: 1px solid #D9D9D9;

    &__circle {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    &__text {
      color: #434343;
      font-size: 12px;
      font-weight: 500;
    }
  }
</style>