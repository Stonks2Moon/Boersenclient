<template>
  <div class="view-options" content>
    <h1>Options</h1>

    <tl-grid gap="0 20">
      <div>
        <h4>Share Managemenet</h4>
        <tc-list :dark="true">
          <tc-list-item
            icon="shield-star-duo"
            title="Shares overview"
            routeName="mgmt-shares"
          />
          <tc-list-item
            icon="plus"
            title="Create share"
            routeName="mgmt-create-share"
          />
        </tc-list>
      </div>

      <div>
        <h4>Broker Managemenet</h4>
        <tc-list :dark="true">
          <tc-list-item
            icon="user-shield-duo"
            title="Broker overview"
            routeName="mgmt-brokers"
          />
          <tc-list-item
            icon="plus"
            title="Create broker"
            routeName="mgmt-create-broker"
          />
        </tc-list>
      </div>
      <div>
        <h4>Market Managemenet</h4>
        <tc-list :dark="true">
          <tc-list-item icon="blocked" title="Close market" />
          <tc-list-item icon="checkbox" title="Open market" />
        </tc-list>
      </div>
      <div>
        <h4>Pricing Management</h4>
        <tc-list :dark="true">
          <tc-list-item
            icon="dollar"
            title="Pricing overview"
            routeName="mgmt-pricings"
          />
          <tc-list-item
            icon="plus"
            title="Create pricing"
            routeName="mgmt-create-pricing"
          />
        </tc-list>
      </div>
    </tl-grid>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Options extends Vue {}
</script>

<style lang="scss" scoped>
.view-options {
  h4 {
    margin-bottom: 5px;
    margin-left: 5px;
    opacity: 0.75;
    font-weight: 550;
  }
}
</style>
