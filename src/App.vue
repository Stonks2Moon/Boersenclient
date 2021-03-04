<template>
  <div class="boersenclient">
    <BRouter />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import BRouter from './components/BRouter.vue';

@Component({
  components: {
    BRouter
  }
})
export default class App extends Vue {}
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
  padding: calc(20px + env(safe-area-inset-top)) 5vw
    calc(20px + env(safe-area-inset-bottom));
}

[max-width] {
  max-width: 800px;
  margin: 0 auto;
}

[line-break] {
  white-space: pre-line;
}
</style>
