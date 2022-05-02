<template>
  <div class="relative">
    <label v-if="label" class="absolute top-2 left-5 text-sm text-gray-500">{{
      label
    }}</label>
    <select
      v-if="items.length"
      class="rounded-lg border p-4 pt-6 w-full text-2xl"
      @change="$emit('input', $event.target.value)"
    >
      <option v-for="item in items" :value="item.id" :key="item.id">
        {{ item.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "AppSelect",
  props: {
    value: { type: String, default: null },
    label: { type: String, default: null },
    items: { type: Array, required: true, default: () => [] },
  },
  created() {
    if (!this.value && this.items.length) {
      this.$emit("input", this.items[0].id);
    }
  },
};
</script>
