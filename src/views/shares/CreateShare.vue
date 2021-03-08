<template>
  <div class="view-create-share" content v-if="share">
    <h1>Create Share</h1>

    <br />
    <tl-flow horizontal="space-around">
      <tc-avatar :src="share.thumbnail" size="tiny" />
      <div class="color" :style="'background: ' + share.color" />
    </tl-flow>
    <br />

    <tc-input :dark="true" title="Name" v-model="share.name" />
    <tc-input :dark="true" title="Color" v-model="share.color" />
    <tc-input :dark="true" title="Thumbnail" v-model="share.thumbnail" />
    <tc-input
      :dark="true"
      type="numer"
      title="Initial price"
      v-model="share.price"
    />

    <br />
    <tc-button
      :disabled="submitting"
      tfbackground="success"
      variant="filled"
      name="Speichern"
      @click="create"
    />
    <p error>{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { CreateShareDto } from '@/utils/dtos';
import backend from '@/utils/backend';
import { ShareManager } from '@/utils/ShareManager';

@Component
export default class CreateShare extends Vue {
  public share: CreateShareDto = {
    color: '',
    name: '',
    price: 200,
    thumbnail: ''
  };
  public submitting = false;
  public error = '';

  public create() {
    if (this.submitting || !this.share) return;
    this.submitting = true;

    backend
      .post('share', { ...this.share, price: +this.share.price })
      .then(res => {
        ShareManager.createShare(res.data);
        this.$router.push({ name: 'shares' });
      })
      .catch(error => {
        this.error = error.message;
        this.submitting = false;
      });
  }
}
</script>

<style lang="scss" scoped>
.view-create-share {
  .color,
  .tc-avatar {
    height: 60px;
    width: 60px;
    border-radius: 60px;
    margin-bottom: 20px;
  }
  //
}
</style>
