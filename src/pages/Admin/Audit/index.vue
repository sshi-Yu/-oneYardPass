<template>
  <div id="audit">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from "@/pages/Admin/Header";
export default {
  name: "Audit_List",
  components: { Header },
  mounted() {},
};
</script>

<style scoped>
#audit{
  margin: 0 20px;
}
</style>