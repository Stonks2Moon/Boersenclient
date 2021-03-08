<template>
  <div class="b-navbar" v-if="$store.getters.valid && $route.name !== 'login'">
    <div class="navbar-wrapper">
      <tl-flow class="prev">
        <router-link
          v-if="$route && $route.meta.nav && $route.meta.nav.prevName"
          :to="{ name: $route.meta.nav.prevName }"
        >
          <i class="ti-chevron-left" />
          <span>{{ $route.meta.nav.prevTitle }}</span>
        </router-link>
      </tl-flow>

      <div class="title">
        <transition name="appear">
          <span v-if="showTitle">
            {{ $route.meta.nav.title }}
          </span>
        </transition>
      </div>

      <tl-flow class="logo">
        <img src="pwa/moonstonks.svg" alt="" />
      </tl-flow>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class BNavbar extends Vue {
  public showTitle = false;

  mounted() {
    window.addEventListener('scroll', this.scrollListener);
    this.scrollListener();
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  public scrollListener() {
    this.showTitle = window.scrollY > 40;
  }
}
</script>

<style lang="scss" scoped>
.b-navbar {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  @include backdrop-blur($color);
  padding: 0 5vw;
  padding-top: env(safe-area-inset-top);

  .navbar-wrapper {
    max-width: $max-width;
    position: relative;
    height: 50px;
    margin: 0 auto;
  }

  .prev {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);

    a {
      text-decoration: none;
      color: $error;
      i {
        font-size: 14px;
        margin-right: 5px;
      }
    }
  }

  .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 600;
  }

  .logo {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    img {
      height: 30px;
    }
  }
}

.appear-leave-active,
.appear-enter-active {
  transition: 0.2s ease-in-out;
}
.appear-leave-to,
.appear-enter {
  opacity: 0;
}
</style>
