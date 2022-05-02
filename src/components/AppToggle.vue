<template>
  <div class="flex items-center">
    <label class="flex items-center cursor-pointer">
      <!-- label -->
      <div class="mr-3" v-if="hasLabelSlot"><slot name="label"></slot></div>
      <!-- toggle -->
      <div class="relative">
        <!-- input -->
        <input
          type="checkbox"
          class="sr-only"
          :checked="value"
          @input="$emit('input', $event.target.checked)"
        />
        <!-- line -->
        <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
        <!-- dot -->
        <div
          class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"
        ></div>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name: "AppToggle",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasLabelSlot() {
      return !!this.$slots.label;
    },
  },
};
</script>

<style scoped lang="postcss">
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #48bb78;
}
</style>
