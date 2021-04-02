<template>
  <tc-navbar class="b-navbar" :dark="true" v-if="$store.getters.valid">
    <tl-flow v-if="$store.getters.isDesktop" slot="logo">
      <img src="pwa/moonstonks.svg" alt="" />
      <b>Börsenclient</b>
    </tl-flow>
    <div slot="logo" v-else class="mobile-header">
      <transition name="slide-left" mode="out-in">
        <tc-header-button
          v-if="$route.meta.prevName"
          :name="$route.meta.prevTitle || 'back'"
          :routeName="$route.meta.prevName"
          tfcolor="error"
        />
        <b v-else>Börsenclient</b>
      </transition>
      <div class="title" v-if="$route.meta.title">
        <transition name="appear">
          <span v-if="showTitle">
            {{ $route.meta.title }}
          </span>
        </transition>
      </div>
      <img src="pwa/moonstonks.svg" alt="" />
    </div>
    <template v-if="$store.getters.isDesktop">
      <tc-navbar-item
        icon="house-duo"
        name="Home"
        routeName="home"
        tfcolor="error"
      />
      <tc-navbar-item
        icon="file-text"
        name="Clearing"
        routeName="clearing"
        tfcolor="error"
      />
      <tc-navbar-item
        icon="gears"
        name="Options"
        routeName="options"
        tfcolor="error"
      />
    </template>
  </tc-navbar>
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
  .mobile-header {
    width: 90vw;
    display: flex;
    align-items: center;
    position: relative;

    .title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-weight: 600;
      opacity: 0.75;
    }
    img {
      position: absolute;
      right: 0;
    }
  }
  img {
    height: 30px;
    margin-right: 10px;
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

.slide-left-leave-active,
.slide-left-enter-active {
  transition: 0.2s ease-in-out;
}
.slide-left-leave-to {
  opacity: 0;
  margin-left: 10px;
}
.slide-left-enter {
  opacity: 0;
  margin-left: -10px;
}
</style>
