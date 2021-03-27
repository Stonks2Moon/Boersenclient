<template>
  <div class="view-brokers" content>
    <tl-flow horizontal="space-between">
      <h1>Brokers</h1>
      <tc-link routeName="mgmt-create-broker" tfcolor="error">
        create broker
      </tc-link>
    </tl-flow>

    <BList :dark="true" v-if="brokers">
      <BListItem
        v-for="b in brokers"
        :key="b.id"
        :title="b.displayName"
        :subtitle="b.type"
        :to="{ name: 'mgmt-edit-broker', params: { id: b.id } }"
        :icon="b.banned ? 'blocked' : 'checkmark'"
      />
    </BList>
  </div>
</template>

<script lang="ts">
import BListItem from '@/components/list/BListItem.vue';
import BList from '@/components/list/BList.vue';
import { Broker, BrokerManager } from '@/utils/BrokerManager';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    BList,
    BListItem
  }
})
export default class Brokers extends Vue {
  public sort: { direction: number; attribute: string } | null = null;

  get brokers(): Broker[] | null {
    return BrokerManager.brokers;
  }
}
</script>
