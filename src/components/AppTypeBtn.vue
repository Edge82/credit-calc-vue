<template>
  <div v-if="items.length" class="flex gap-4 flex-wrap">
    <button
      v-for="item in items"
      :key="item.id"
      class="border rounded-lg p-4"
      :class="{ active: item.id === value }"
      @click="$emit('input', item.id)"
    >
      {{ item.text }}
    </button>
  </div>
</template>

<script>
export default {
  name: "AppTypeBtn",
  props: {
    value: { type: String, default: null },
    items: { type: Array, required: true, default: () => [] },
  },
  created() {
    if (!this.value && this.items.length) {
      this.$emit("input", this.items[0].id);
    }
  },
};
</script>

<style>
.active {
  background-color: #48bb78;
  color: white;
}
</style>
