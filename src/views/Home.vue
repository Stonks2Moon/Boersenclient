<template>
  <div class="view-home" content>
    <h1>Home</h1>
    <tl-grid minWidth="150" gap="20" arrangement="auto-fill">
      <BNavigationCard
        icon="user-shield-duo"
        title="tokens"
        subtitle="create, delete and manage access tokens"
        :to="{ name: 'tokens' }"
      />

      <BNavigationCard
        icon="shield-star-duo"
        title="shares"
        subtitle="create & delete shares and view their trends"
        :to="{ name: 'shares' }"
      />

      <BNavigationCard
        icon="book-duo"
        title="orderbook"
        subtitle="view current orderbook"
        :to="{ name: 'orderbook' }"
      />

      <BNavigationCard
        icon="file-text-duo"
        title="clearing"
        subtitle="view, send and manage clearing reports"
        :to="{ name: 'home' }"
      />

      <BNavigationCard
        icon="gears"
        title="market"
        subtitle="open and close the stock market"
        :to="{ name: 'home' }"
      />

      <BNavigationCard
        icon="bank-duo"
        title="revenue"
        subtitle="open and close the stock market"
        :to="{ name: 'home' }"
      />

      <BNavigationCard
        icon="chart-bar"
        title="statistics"
        subtitle="tbd"
        :to="{ name: 'home' }"
      />

      <BNavigationCard
        icon="cocktail"
        title="Market Tester"
        subtitle="hehe, will be removed"
        :to="{ name: 'market-tester' }"
      />
    </tl-grid>
  </div>
</template>

<script lang="ts">
import BNavigationCard from '@/components/BNavigationCard.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    BNavigationCard
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.view-home {
  //
}
</style>
