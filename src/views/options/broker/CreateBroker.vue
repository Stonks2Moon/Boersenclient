<template>
  <div class="view-create-broker" content>
    <h1>Create Broker</h1>

    <br />
    <b>Displayname</b>
    <tc-input :dark="true" v-model="dto.displayName" />

    <br />
    <b>Type</b>
    <tc-select
      tfbackground="error"
      :dark="true"
      placeholder="Type"
      @selectedItems="s => (dto.type = s[0])"
    >
      <tc-select-item
        title="private"
        :defaultSelected="dto.type === 'private'"
      />
      <tc-select-item
        title="business"
        :defaultSelected="dto.type === 'business'"
      />
      <tc-select-item
        title="simulation"
        :defaultSelected="dto.type === 'simulation'"
      />
    </tc-select>

    <br />
    <tc-button
      :disabled="submitting"
      tfbackground="success"
      variant="filled"
      name="Create"
      @click="create"
    />
    <p error>{{ error }}</p>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { BrokerManager } from '@/utils/BrokerManager';
import { CreateBrokerDto } from '@/utils/dtos';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class CreateBroker extends Vue {
  public dto: CreateBrokerDto = { type: 'private', displayName: '' };
  public error = '';
  public submitting = false;

  public async create(): Promise<void> {
    if (this.submitting || !this.dto) return;
    this.submitting = true;
    backend
      .post('broker', this.dto)
      .then(res => {
        BrokerManager.addBroker(res.data);
        this.$router.push({ name: 'mgmt-brokers' });
      })
      .catch(error => {
        this.error = error.message;
        this.submitting = false;
      });
  }
}
</script>

<style lang="scss" scoped>
.view-create-broker {
  b {
    display: block;
    margin: 5px;
  }
}
</style>
