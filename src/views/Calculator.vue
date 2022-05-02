<template>
  <div class="flex gap-5 p-10">
    <div class="grid gap-10 grid-flow-row grid-rows-1 w-2/3">
      <AppSelect
        v-model="creditGoal"
        :items="creditGoalsItems"
        label="Цель кредита"
      ></AppSelect>

      <AppTypeBtn
        class="inline-block"
        v-model="formType"
        :items="creditTypeItems"
      ></AppTypeBtn>

      <AppSelect
        v-model="creditRegion"
        :items="creditRegionItems"
        label="Регион покупки недвижимости"
      ></AppSelect>

      <div class="flex items-center">
        <span class="font-medium mr-auto">Есть зарплатная карта СберБанка</span>
        <AppToggle v-model="isUseOwrCard">
          <template #label>
            <span class="text-xl font-medium text-green-500">-0.5 %</span>
          </template>
        </AppToggle>
      </div>

      <AppRangeInput
        v-model="totalCreditSum"
        :min="{ value: 300000 }"
        :max="{ value: 10000000 }"
        :step="100000"
        label="Стоимость недвижимости"
      ></AppRangeInput>

      <div
        class="w-full flex border rounded-lg p-6 bg-blue-800 text-white text-xl font-medium cursor-pointer justify-between"
      >
        <div>Включите расходы на недвижимость в кредит</div>
        <div>></div>
      </div>

      <AppRangeInput
        v-model="userMoney"
        :percent="userMoneyLimit.percent"
        :min="userMoneyLimit.min"
        :max="userMoneyLimit.max"
        :step="100000"
        label="Первоначальный взнос"
      ></AppRangeInput>

      <AppRangeInput
        v-model="creditTerm"
        :min="{ value: 1, text: '1 год' }"
        :max="{ value: 10, text: '10 лет' }"
        :step="1"
        label="Срок кредита"
      ></AppRangeInput>

      <AppMore :creditSum="creditSum" @sale="moreSale = $event"></AppMore>
    </div>
    <AppInfo
      :percent="totalPercent"
      :creditSum="creditSum"
      :term="creditTerm"
      class="w-1/3"
    ></AppInfo>
  </div>
</template>

<script>
import AppToggle from "@/components/AppToggle.vue";
import AppTypeBtn from "@/components/AppTypeBtn.vue";
import AppSelect from "@/components/AppSelect.vue";
import AppMore from "@/components/AppMore.vue";
import AppRangeInput from "../components/AppRangeInput.vue";
import AppInfo from "../components/AppInfo.vue";
export default {
  name: "Calculator",
  inject: ["Names"],
  components: {
    AppToggle,
    AppTypeBtn,
    AppSelect,
    AppMore,
    AppRangeInput,
    AppInfo,
  },
  data() {
    return {
      selected: "Квартира в новостройке",
      region: "Москва",
      totalCreditSum: 300000,
      creditTerm: 1,
      userMoney: 0,
      moreSale: 0,
      isUseOwrCard: true,
      formType: "0",
      creditGoal: null,
      creditRegion: null,
      creditRegionItems: [
        {
          id: "1",
          text: "Москва",
        },
        {
          id: "2",
          text: "Санкт-Петербург",
        },
        {
          id: "3",
          text: "Московская область",
        },
        {
          id: "4",
          text: "Ленинградская область",
        },
        {
          id: "5",
          text: "Другой регион",
        },
      ],
      creditTypeItems: [
        {
          id: "0",
          text: "Базовая программа от 16,9%",
          percent: 169,
        },
        {
          id: "1",
          text: "Ипотека для IT от 5%",
          percent: 50,
        },
        {
          id: "2",
          text: "Господдержка от 11,7%",
          percent: 117,
        },
        {
          id: "3",
          text: "Господдержка от 9%",
          percent: 90,
        },
        {
          id: "4",
          text: "Для семей с детьми от 5,7%",
          percent: 57,
        },
        {
          id: "5",
          text: "Дальневосточная ипотека от 1,7%",
          percent: 17,
        },
        {
          id: "6",
          text: "Военная ипотека от 15,8%",
          percent: 158,
        },
      ],
      creditGoalsItems: [
        {
          id: "1",
          text: "Квартира в новостройке",
        },
        {
          id: "2",
          text: "Квартира на вторичном рынке",
        },
        {
          id: "3",
          text: "Купить дом",
        },
        {
          id: "4",
          text: "Построить дом",
        },
      ],
    };
  },

  computed: {
    percent() {
      return this.creditTypeItems[this.formType].percent;
    },
    userMoneyLimit() {
      let minLimit = this.totalCreditSum / 10;
      let maxLimit = (this.totalCreditSum / 100) * 90;
      let userMoney = 0;
      if (this.userMoney < minLimit) {
        userMoney = minLimit;
      } else if (this.userMoney > maxLimit) {
        userMoney = maxLimit;
      } else {
        userMoney = this.userMoney;
      }
      return {
        percent: (userMoney / this.totalCreditSum) * 100,
        min: { value: minLimit },
        max: { value: maxLimit },
      };
    },
    creditSum() {
      const sum = this.totalCreditSum - this.userMoney;
      return sum;
    },
    totalPercent() {
      return this.percent - (this.moreSale + (this.isUseOwrCard ? 5 : 0));
    },
  },

  watch: {
    totalCreditSum: {
      immediate: true,
      handler() {
        if (this.userMoney < this.userMoneyLimit.min.value) {
          this.userMoney = this.userMoneyLimit.min.value;
        }
        if (this.userMoney > this.userMoneyLimit.max.value) {
          this.userMoney = this.userMoneyLimit.max.value;
        }
      },
    },
  },
};
</script>
