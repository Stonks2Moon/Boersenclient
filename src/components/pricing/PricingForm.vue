<template>
  <div class="b-pricing-form">
    <template v-if="p">
      <tl-flow flow="column" vertical="start">
        <b>Type</b>
        <tc-input :dark="true" v-model="p.type" />
      </tl-flow>

      <div class="table-wrapper">
        <table>
          <tr>
            <th>Changeover</th>
            <th>Fixum</th>
            <th colspan="3">Transaction</th>
            <th colspan="3">Trade</th>
            <th>
              <tc-button tfbackground="success" icon="plus" @click="addRow" />
            </th>
          </tr>
          <tr>
            <th>Limit</th>
            <th>netto</th>
            <th>‰</th>
            <th>Min</th>
            <th>Max</th>
            <th>‰</th>
            <th>Min</th>
            <th>Max</th>
            <th></th>
          </tr>
          <tr v-for="(pr, i) in p.entries" :key="i">
            <td v-for="(k, j) in Object.keys(pr)" :key="i + k">
              <tc-input
                :dark="true"
                v-model="pr[k]"
                type="number"
                :step="j === 0 ? 500 : 0.01"
                :min="0"
              />
            </td>
            <td>
              <tc-button
                tfbackground="error"
                icon="minus"
                @click="removeRow(i)"
              />
            </td>
          </tr>
        </table>
      </div>

      <br />
      <tl-flow horizontal="start">
        <tc-button
          :disabled="submitting"
          name="Submit pricing"
          icon="share"
          tfbackground="success"
          variant="filled"
          @click="submit"
        />

        <tc-button
          v-if="$route.params.id"
          :disabled="submitting"
          name="Delete pricing"
          icon="trashcan-alt"
          tfbackground="error"
          variant="filled"
          @click="remove"
        />
      </tl-flow>
    </template>

    <p error v-if="error.length > 0">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { Pricing, PricingEntry, PricingManager } from '@/utils/PricingManager';
import { Vue, Component, Prop } from 'vue-property-decorator';

const EMPTY_ROW: PricingEntry = {
  changeoverLimit: 2500,
  fixum: 0.3,
  transactionPromille: 0.75,
  transactionMin: 1.5,
  transactionMax: 1.88,
  tradePromille: 0.52,
  tradeMin: 0.5,
  tradeMax: 1.3
};

@Component
export default class BPricingForm extends Vue {
  @Prop({
    default: () => {
      return { type: 'Private', entries: [{ ...EMPTY_ROW }] };
    }
  })
  pricing!: Pricing;

  public submitting = false;
  public p: Pricing = this.pricing;
  public error = '';

  public addRow(): void {
    this.p.entries.push({ ...EMPTY_ROW });
  }

  public removeRow(index: number) {
    this.p.entries.splice(index, 1);
  }

  public submit(): void {
    if (this.submitting) return;
    this.submitting = true;
    if (this.p.type.length === 0) {
      this.error = 'Bitte gib einen Typ an';
      this.submitting = false;
      return;
    }

    backend
      .post('pricing', this.p)
      .then(res => {
        PricingManager.addPricing(res.data);
        this.$router.push({ name: 'mgmt-pricings' });
      })
      .catch(err => {
        this.error = err.message;
        this.submitting = false;
      });
  }

  public remove(): void {
    if (this.submitting) return;
    this.submitting = true;
    const id = this.$route.params.id;
    backend.delete('pricing/' + id).then(() => {
      PricingManager.removePricing(id);
      this.$router.push({ name: 'mgmt-pricings' });
    });
  }
}
</script>

<style lang="scss" scoped>
.b-pricing-form {
  b {
    display: block;
    margin: 5px;
  }

  .table-wrapper {
    margin-top: 20px;
    overflow-x: auto;
    @include custom-scrollbar__dark();

    table {
      width: 100%;
      border-collapse: collapse;
      border-radius: $border-radius;
      overflow: hidden;

      tr {
        &:nth-child(1) th {
          padding-top: 5px;
        }
        &:nth-child(2) th {
          padding-bottom: 15px;
          line-height: 10px;
          color: rgba($color_dark, 0.5);
          font-size: 13px;
          text-transform: uppercase;
        }
        &:nth-child(ODD) td {
          background: $paragraph_dark;
        }

        th {
          background: $color;
          padding-left: 10px;
          padding-right: 10px;
        }

        td {
          padding: 5px;
          .tc-input {
            width: 50px;
            margin: auto;
          }
          &:nth-child(1) .tc-input {
            width: 88px;
          }

          .tc-button {
            margin-left: 8px;
          }

          &:nth-child(1),
          &:nth-child(2),
          &:nth-child(5) {
            border-right: 1px solid $container_dark;
          }
        }
      }
    }
  }
}
</style>
