<template>
  <div id="header">
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="pending">
        <a-icon type="file" />待处理
      </a-menu-item>
      <a-menu-item key="done">
        <a-icon type="file-done" />已处理
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: "Admin-Header",
  data() {
    return {
      current: ["pending"],
    };
  },
};
</script>

<style scoped>
#header{
    display: flex;
    justify-content: center;
}
</style>