<!-- 通用面板 -->
<template>
  <div class="panel">
    <div class="panel-header">
      <slot name="header">默认名称</slot>
    </div>
    <div class="panel-container">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.panel {
  position: relative;
  width: 472px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 12px;
  min-height: 0;
  &-header {
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('@/assets/images/titleBg.png') no-repeat center center;
    background-size: 100% 100%;
    font-size: 20px;
    letter-spacing: 1px;
    gap: 8px;
    &::after,
    &::before {
      content: '';
      position: relative;
      width: 6px;
      height: 6px;
      background: rgba(218, 163, 88, 1);
      display: block;
    }
  }
  &-container {
    position: relative;
    flex: 1;
    min-height: 0;
    background: url('@/assets/images/panelBottomBg.png') no-repeat center bottom;
    background-size: 100% 100%;
    padding: 0 20px;
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>
