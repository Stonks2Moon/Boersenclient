<template>
  <div class="view-brokers" content>
    <tl-flow horizontal="space-between">
      <h1>Brokers</h1>
      <tc-button
        icon="plus"
        routeName="create-broker"
        tfbackground="error"
        variant="opaque"
      />
    </tl-flow>

    <tc-table v-if="brokers" :dark="true" @sort="s => (sort = s)">
      <template slot="head">
        <tc-th attribute="displayName">Name</tc-th>
        <tc-th attribute="type">Type</tc-th>
        <tc-th><i error class="ti-blocked"/></tc-th>
        <tc-th></tc-th>
      </template>
      <tc-tr v-for="b in brokers" :key="b.id">
        <tc-td>{{ b.displayName }}</tc-td>
        <tc-td>{{ b.type }}</tc-td>
        <tc-td>
          <tc-switch
            :dark="true"
            :value="b.banned"
            tfcolor="error"
            @input="v => toggleBanned(b.id, v)"
          />
        </tc-td>
        <tc-td>
          <tc-link
            tfcolor="alarm"
            :to="{ name: 'edit-broker', params: { id: b.id } }"
          >
            edit
          </tc-link>
        </tc-td>
      </tc-tr>
    </tc-table>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { Broker, BrokerManager } from '@/utils/BrokerManager';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Brokers extends Vue {
  public sort: { direction: number; attribute: string } | null = null;

  get brokers(): Broker[] | null {
    const brokers = BrokerManager.getBrokers();
    if (!brokers) return null;
    const s = this.sort;
    if (!s) return brokers;
    return brokers.sort(
      // eslint-disable-next-line
      (a: any, b: any) =>
        s.direction * a[s.attribute].localeCompare(b[s.attribute])
    );
  }

  public toggleBanned(brokerId: string, banned: boolean) {
    backend
      .patch('broker/' + brokerId + '/banned/' + (banned ? 1 : 0))
      .then(res => {
        BrokerManager.addBroker(res.data);
      });
  }
}
</script>

<style lang="scss" scoped>
.view-brokers {
  //
  .tc-td {
    padding: 10px;
  }
}
</style>
