<template>
  <div class="boersenclient">
    <BRouter />
    <BNavbar />
    <BTabbar />
  </div>
</template>

<script lang="ts">
import { Socket } from 'vue-socket.io-extended';
import { Vue, Component } from 'vue-property-decorator';
import BRouter from './components/BRouter.vue';
import BNavbar from './components/BNavbar.vue';
import { Price } from 'moonstonks-boersenapi';
import { ShareManager } from '@/utils/ShareManager';
import BTabbar from './components/BTabbar.vue';
import {
  registerMediaQueries,
  unregisterMediaQueries
} from '@/utils/mediaQueries';
import backend from './utils/backend';

@Component({
  components: {
    BRouter,
    BNavbar,
    BTabbar
  }
})
export default class App extends Vue {
  mounted() {
    registerMediaQueries();
    this.loadOrderbook();
  }

  beforeDestroy() {
    unregisterMediaQueries();
  }

  @Socket('price')
  priceChanged(price: Price & { shareId: string }): void {
    ShareManager.addPrice(price);
  }

  @Socket('update-orderbook')
  public async loadOrderbook(): Promise<void> {
    const { data } = await backend.get('order/orders');
    this.$store.commit('orderbook', data);
  }
}
</script>

<style lang="scss">
html {
  font-family: -apple-system, BlinkMacSystemFont, SF Pro Display, Segoe UI,
    Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
    Segoe UI Symbol;
  scroll-behavior: smooth;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}
html {
  @include custom-scrollbar__light();
  background: $background;
  color: $color;
  @media #{$isDark} {
    @include custom-scrollbar__dark();
    background: $background_dark;
    color: $color_dark;
  }
}
body {
  min-height: 100vh;
  margin: 0;
}

[center] {
  text-align: center;
}

[error] {
  color: $error;
}

[huge] {
  font-size: 40px;
}

[content] {
  padding: calc(50px + env(safe-area-inset-top)) 5vw
    calc(20px + env(safe-area-inset-bottom));

  @media #{$isMobile} {
    padding-bottom: calc(70px + env(safe-area-inset-bottom));
  }
  max-width: $max-width;
  margin: 0 auto;
}

[line-break] {
  white-space: pre-line;
}
</style>
