<template>
  <div class="grid gap-6">
    <h3 class="text-2xl font-bold">Услуги снижающие ставку по кредиту</h3>
    <div>
      <span class="text-gray-800">Выгода от снижения ставки&nbsp;</span>
      <span class="text-green-500">— {{ formatedSum }}₽</span>
    </div>
    <div class="flex flex-col" v-for="item in items" :key="item.id">
      <div class="flex items-center">
        <div>{{ item.text }}</div>
        <AppToggle class="ml-auto" v-model="item.active">
          <template #label
            ><span class="text-xl font-medium"
              >-{{ item.sale / 10 }}%</span
            ></template
          >
        </AppToggle>
      </div>
      <div
        class="flex text-green-500 font-bold cursor-pointer"
        @click="item.more = !item.more"
      >
        <div class="mr-3">
          <span v-if="!item.more">Подробнее</span>
          <span v-else>Скрыть</span>
        </div>
        <svg
          class="arrow"
          :class="{ 'arrow-active': item.more }"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 330 330"
          width="20"
          height="20"
        >
          <path
            d="M325.6 79.4a15 15 0 0 0-21.2 0L165 218.8 25.6 79.4a15 15 0 0 0-21.2 21.2l150 150a15 15 0 0 0 21.2 0l150-150a15 15 0 0 0 0-21.2z"
          />
        </svg>
      </div>
      <div class="more-info my-3" :class="{ 'more-info-active': item.more }">
        <div>{{ item.desc }}</div>
        <a class="text-green-500 underline" href="#">{{ item.linkText }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import AppToggle from "@/components/AppToggle.vue";
export default {
  components: { AppToggle },
  props: {
    creditSum: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      items: [
        {
          id: 1,
          text: "Страхование жзни и здоровья",
          desc: "Будьте уверены, что при несчастном случае страховая выплата полностью компенсирует обязательства перед банком по ипотеке.",
          linkText: "Посчитать стоимость страховки",
          sale: 10,
          active: false,
          more: false,
        },
        {
          id: 2,
          text: "Скидка от застройщика на 1 год",
          sale: 20,
          active: false,
          desc: "Действует при покупке жилья у определённых застройщиков. Размер скидки зависит от срока кредита: до 7 лет — 7,8%, 8—12 лет — 7,5%, 13–30 лет — 7,2%. Если скидка выше базовой ставки, ставка в первый год будет 0,1%. Решение принимает застройщик.",
          linkText: "Посмотреть список застройщиков",
          more: false,
        },
        {
          id: 3,
          text: "Электронная регистрация сделки",
          sale: 3,
          active: true,
          more: false,
          desc: "Услуга позволяет зарегистрировать сделку с недвижимостью без посещения Росреестра или МФЦ. Все действия происходят онлайн.",
          linkText: "Узнать об услуге",
        },
      ],
    };
  },
  computed: {
    totalSale() {
      return this.items.reduce((acc, item) => {
        if (item.active) {
          acc += item.sale;
        }
        return acc;
      }, 0);
    },
    sum() {
      if (this.creditSum > 0) {
        const creditSum = this.creditSum;
        return (creditSum / 1000) * this.totalSale;
      }
      return 0;
    },
    formatedSum() {
      const formatter = new Intl.NumberFormat("ru-RU");
      return formatter.format(this.sum);
    },
  },
  watch: {
    totalSale: {
      immediate: true,
      handler() {
        this.$emit("sale", this.totalSale);
      },
    },
  },
};
</script>

<style scoped>
.arrow {
  transition-duration: 0.2s;
  transition-property: transform;
  transition-timing-function: ease-in;
}
.arrow-active {
  transform: rotate(180deg);
}

.more-info {
  height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all;
  transition-duration: 0.4s;
  transition-timing-function: ease-in;
}
.more-info-active {
  opacity: 100;
  height: auto;
}
</style>
