<template>
  <div class="view-edit-broker" content>
    <h1>Edit Broker</h1>

    <tl-flow v-if="!broker"></tl-flow>
    <template v-else>
      <br />
      <b>Displayname</b>
      <tc-input :dark="true" v-model="broker.displayName" />

      <br />
      <b>Type</b>
      <tc-select
        tfbackground="error"
        :dark="true"
        placeholder="Type"
        @selectedItems="s => (broker.type = s[0])"
      >
        <tc-select-item
          title="private"
          :defaultSelected="broker.type === 'private'"
        />
        <tc-select-item
          title="business"
          :defaultSelected="broker.type === 'business'"
        />
        <tc-select-item
          title="simulation"
          :defaultSelected="broker.type === 'simulation'"
        />
        <tc-select-item
          title="liquiditydonor"
          :defaultSelected="broker.type === 'liquiditydonor'"
        />
        <tc-select-item
          title="stockmarket"
          :defaultSelected="broker.type === 'stockmarket'"
        />
      </tc-select>

      <br />
      <b>Token</b>
      <tc-input :dark="true" :value="broker.token" :disabled="true" />

      <br />
      <tl-flow horizontal="space-between">
        <b>Banned</b>
        <tc-switch
          :dark="true"
          :value="broker.banned"
          tfcolor="error"
          @input="v => toggleBanned(v)"
        />
      </tl-flow>

      <br />
      <tl-flow horizontal="start">
        <tc-button
          :disabled="submitting"
          tfbackground="success"
          variant="filled"
          name="Save changes"
          @click="update"
        />
        <tc-button
          v-if="broker.type !== 'stockmarket'"
          :disabled="submitting"
          tfbackground="error"
          variant="filled"
          name="Delete broker"
          @click="remove"
        />
      </tl-flow>

      <p error>{{ error }}</p>
    </template>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { Broker, BrokerManager } from '@/utils/BrokerManager';
import { CreateBrokerDto } from '@/utils/dtos';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class EditBroker extends Vue {
  public broker: Broker | null = null;
  public submitting = false;
  public error = '';

  async mounted() {
    await BrokerManager.loadBrokers();
    const broker = BrokerManager.getBroker(this.$route.params.id);
    if (!broker) {
      this.$router.push({ name: 'mgmt-brokers' });
    } else {
      this.broker = { ...broker };
    }
  }

  public update() {
    const broker = this.broker;
    if (this.submitting || !broker) return;
    this.submitting = true;
    const dto: CreateBrokerDto = {
      type: broker.type,
      displayName: broker.displayName
    };
    backend
      .patch('broker/' + broker.id, dto)
      .then(res => {
        BrokerManager.addBroker(res.data);
        this.$router.push({ name: 'mgmt-brokers' });
      })
      .catch(error => {
        this.error = error.message;
        this.submitting = false;
      });
  }

  public remove() {
    if (this.submitting || !this.broker) return;
    this.submitting = true;
    const id = this.broker.id;
    backend
      .delete('broker/' + id)
      .then(() => {
        BrokerManager.removeBroker(id);
        this.$router.push({ name: 'mgmt-brokers' });
      })
      .catch(error => {
        this.error = error.message;
        this.submitting = false;
      });
  }

  public toggleBanned(banned: boolean) {
    if (!this.broker) return;
    backend
      .patch('broker/' + this.broker.id + '/banned/' + (banned ? 1 : 0))
      .then(res => {
        BrokerManager.addBroker(res.data);
      });
  }
}
</script>

<style lang="scss" scoped>
.view-edit-broker {
  b {
    display: block;
    margin: 5px;
  }
}
</style>
