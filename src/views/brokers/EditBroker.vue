<template>
  <div class="view-edit-broker" content v-if="broker">
    <h1>Edit Broker</h1>

    <br />
    <tc-input title="Displayname" :dark="true" v-model="broker.displayName" />
    <br />
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
        title="stockmarket"
        :defaultSelected="broker.type === 'stockmarket'"
      />
    </tc-select>

    <br />
    <tl-flow horizontal="start">
      <tc-button
        :disabled="submitting"
        tfbackground="success"
        variant="filled"
        name="Speichern"
        @click="update"
      />
      <tc-button
        v-if="broker.type !== 'stockmarket'"
        :disabled="submitting"
        tfbackground="error"
        variant="filled"
        name="Löschen"
        @click="remove"
      />
    </tl-flow>
    <p error>{{ error }}</p>
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
      this.$router.push({ name: 'brokers' });
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
        this.$router.push({ name: 'brokers' });
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
        this.$router.push({ name: 'brokers' });
      })
      .catch(error => {
        this.error = error.message;
        this.submitting = false;
      });
  }
}
</script>

<style lang="scss" scoped>
.view-edit-broker {
  //
}
</style>
