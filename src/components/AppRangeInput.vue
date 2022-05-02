<template>
  <div>
    <div class="relative">
      <input
        type="text"
        class="rounded-lg border p-5 pt-6 w-full text-2xl"
        :value="formatedSum"
        @input="$emit('input', $event.target.value)"
      />
      <label class="absolute top-2 left-5 text-sm text-gray-500">{{
        label
      }}</label>
      <div
        v-if="percent"
        class="absolute text-2xl font-medium right-5 top-5 text-green-500"
      >
        {{ Math.round(percent) }} %
      </div>
      <input
        class="rounded-lg rounded-t-none overflow-hidden appearance-none bg-green-100 h-3 absolute bottom-0 left-0 w-full"
        type="range"
        :min="min.value"
        :max="max.value"
        :step="step"
        :value="value"
        @input="$emit('input', +$event.target.value)"
      />
    </div>
    <div class="flex justify-between">
      <div>{{ min.text || `${formatSum(min.value)} ₽` }}</div>
      <div>{{ max.text || `${formatSum(max.value)} ₽` }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppRangeInput",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    max: {
      type: Object,
      required: true,
    },
    min: {
      type: Object,
      required: true,
    },
    step: {
      type: Number,
      required: true,
    },
    percent: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      required: true,
    },
  },
  computed: {
    formatedSum() {
      return this.formatSum(this.value);
    },
  },
  methods: {
    formatSum(value) {
      const formatter = new Intl.NumberFormat("ru-RU");
      return formatter.format(value);
    },
  },
};
</script>

<style>
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="range"]::-webkit-slider-thumb {
    width: 12px;
    -webkit-appearance: none;
    appearance: none;
    height: 12px;
    cursor: ew-resize;
    background: #fff;
    border: 1px solid black;
    box-shadow: -1010px 0 0 1000px rgba(52, 211, 153, var(--tw-bg-opacity));
    border-radius: 50%;
  }
}
</style>
