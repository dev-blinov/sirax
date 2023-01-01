<template>
  <q-page>
    <q-table
      title="Symbols"
      :rows="rows"
      :columns="columns"
      :loading="loading"
      row-key="name"
      :rows-per-page-options="[20]"
    >
      <template v-slot:body-cell="props">
        <q-td
          :props="props"
          @click="toSymbol(props.value)"
          class="cursor-pointer"
        >
          {{ props.value }}
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { useExchangeInfoStore } from 'stores/exchangeInfo';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ExchangeInfoPage',
  async setup() {
    const loading = ref(true);
    const router = useRouter();
    const exchangeStore = useExchangeInfoStore();

    try {
      await exchangeStore.getExchangeInfo();
    } finally {
      loading.value = false;
    }

    return {
      loading,
      rows: computed(() => exchangeStore.symbols.filter((symbol) => symbol.status === 'TRADING')),
      toSymbol: (symbol) => {
        router.push({ name: 'symbol-view', params: { symbol } });
      },
      columns: [
        {
          label: 'Symbol',
          name: 'symbol',
          align: 'left',
          field: (row) => row.symbol,
        },
      ],
    };
  },
});
</script>
