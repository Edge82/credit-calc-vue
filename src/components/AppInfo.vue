<template>
  <div>
    <div class="rounded-lg border p-5 grid grid-cols-2 gap-4">
      <div>
        <div class="text-gray-500">Ежемесячный платеж</div>
        <div class="font-medium text-3xl">{{ formatSum(monthlyPayment) }}₽</div>
      </div>
      <div>
        <div class="text-gray-500">Процентная ставка</div>
        <div class="font-medium text-3xl text-green-500">
          {{ percent / 10 }}%
        </div>
      </div>
      <div>
        <div class="text-gray-500">Сумма кредита</div>
        <div class="font-medium text-3xl">{{ formatSum(creditSum) }}₽</div>
      </div>
      <div>
        <div class="text-gray-500">Налоговый вычет</div>
        <div class="font-medium text-3xl">{{ formatSum(tax) }}₽</div>
      </div>
      <div>
        <div class="text-gray-500">Необходимый доход</div>
        <div class="font-medium text-3xl">
          {{ formatSum(monthlyPayment + 30000) }}₽
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0,
    },
    creditSum: {
      type: Number,
      default: 0,
    },
    term: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    totalCreditSum() {
      return (
        this.creditSum + (this.creditSum / 1000) * this.percent * this.term
      );
    },
    monthlyPayment() {
      return this.totalCreditSum / (this.term * 12);
    },
    tax() {
      return (this.creditSum / 100) * 13;
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

<style></style>
