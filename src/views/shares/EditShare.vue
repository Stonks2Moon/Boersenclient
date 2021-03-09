<template>
  <div class="view-edit-share" content v-if="share">
    <h1>Share bearbeiten</h1>

    <br />
    <tl-flow horizontal="space-around">
      <tc-avatar :src="share.thumbnail" size="tiny" />
      <div class="color" :style="'background: ' + share.color" />
    </tl-flow>
    <br />

    <tc-input :dark="true" title="Name" v-model="share.name" />
    <tc-input :dark="true" title="Color" v-model="share.color" />
    <tc-input :dark="true" title="Thumbnail" v-model="share.thumbnail" />

    <br />
    <tc-button
      :disabled="submitting"
      tfbackground="success"
      variant="filled"
      name="Speichern"
      @click="update"
    />
    <p error>{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import backend from '@/utils/backend';
import { Share, ShareManager } from '@/utils/ShareManager';

@Component
export default class EditShare extends Vue {
  public share: Share | null = null;
  public submitting = false;
  public error = '';

  async mounted() {
    await ShareManager.loadShares();
    const share = ShareManager.getShare(this.$route.params.id);
    if (!share) {
      this.$router.push({ name: 'shares' });
    } else {
      this.share = { ...share };
    }
  }

  public update() {
    if (this.submitting || !this.share) return;
    this.submitting = true;
    backend
      .patch('share/' + this.share.id, this.share)
      .then(res => {
        ShareManager.updateShare(res.data);
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
.view-edit-share {
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
