<template>
  <div class="b-list-item" :cursor="to || routeName" @click="handleClick">
    <tl-flow>
      <tc-avatar :src="avatar" v-if="avatar" />
      <i :class="'ti-' + icon" v-if="icon" />
    </tl-flow>
    <tl-flow class="content">
      <tl-flow flow="column" vertical="start">
        <div class="title">{{ title }}</div>
        <div v-if="subtitle" class="subtitle">{{ subtitle }}</div>
      </tl-flow>
      <tl-flow>
        <div class="description" v-if="description">{{ description }}</div>
        <slot />
        <i
          tiny
          class="ti-chevron-right"
          v-if="!description && !$slots.default && (to || routeName)"
        />
      </tl-flow>
    </tl-flow>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Location } from 'vue-router';

@Component
export default class BListItem extends Vue {
  @Prop() avatar!: string;
  @Prop() icon!: string;
  @Prop() title!: string;
  @Prop() subtitle!: string;
  @Prop() description!: string;
  @Prop() routeName!: string;
  @Prop() to!: Location;

  public handleClick(e: MouseEvent) {
    this.$emit('click', e);
    const to = this.to;
    if (this.routeName && !to) {
      this.to = { name: this.routeName };
    }
    if (to) {
      this.$router.push(to);
    }
  }
}
</script>

<style lang="scss" scoped>
.b-list-item {
  &[cursor] {
    cursor: pointer;
  }

  display: grid;
  grid-template-columns: 50px 1fr;
  grid-gap: 10px;
  min-height: 50px;
  padding-right: 10px;
  border-radius: inherit;

  background: $paragraph_dark;

  &:not(:last-child) {
    .content {
      position: relative;
      &::after {
        position: absolute;
        content: '';
        z-index: 10;
        bottom: 0;
        right: 0;
        left: 0;
        height: 1px;
        background: currentColor;
        opacity: 0.2;
      }
    }
  }

  transition: 0.2s ease-in-out;
  &:hover {
    background: rgba(lighten($paragraph_dark, 20%), 0.5);
  }

  .tc-avatar {
    height: 35px;
    width: 35px;
  }
  .content {
    flex-wrap: nowrap;
    margin-right: 5px;
    .tl-flow {
      &:first-child {
        flex-grow: 1;
      }
      &:nth-child(2) {
        margin-left: 5px;
      }
    }
    .title {
      font-weight: 600;
    }
    .subtitle {
      margin-top: 2px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      opacity: 0.5;
      font-size: 15px;
      font-weight: 500;
      text-transform: capitalize;
    }
    .description {
      font-style: italic;
    }
  }
  i[tiny] {
    font-size: 12px;
  }
}
</style>
