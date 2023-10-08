<template>
  <div
    class="status-badge"
    :class="{ 'status-badge-detail': type === 'detail' }"
    :style="`border: 1px solid ${color};`"
  >
    <div
      class="status-badge__circle"
      :class="{ 'status-badge__circle-detail': type === 'detail' }"
      :style="`background-color: ${color};`"
    />
    <div
      class="status-badge__text"
      :class="{ 'status-badge__text-detail': type === 'detail' }"
    >
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

    &-detail {
      display: flex;
      padding: 6px 12px;
      align-items: center;
      gap: 6px;
      border-radius: 30px;
    }

    &__circle {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    &__text {
      color: #434343;
      font-size: 12px;
      font-weight: 500;

      &-detail {
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
</style>