<template>
  <q-page>
    <pre>{{ data }}</pre>
  </q-page>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useHistoryStore } from 'stores/history';

export default defineComponent({
  name: 'SymbolPage',
  async setup() {
    const loading = ref(true);
    const route = useRoute();
    const { symbol } = route.params;
    const historyStore = useHistoryStore();

    try {
      await historyStore.getHistory(symbol);
    } finally {
      loading.value = false;
    }

    return {
      route: computed(() => route.params),
      data: computed(() => historyStore.symbols[symbol]),
    };
  },
});
</script>
