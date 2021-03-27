<template>
  <div class="view-shares" content>
    <tl-flow horizontal="space-between">
      <h1>Shares</h1>
      <tc-link tfcolor="error" routeName="mgmt-create-share">
        create share
      </tc-link>
    </tl-flow>

    <BList v-if="shares">
      <BListItem
        v-for="s in shares"
        :key="s.id"
        :avatar="s.thumbnail"
        :title="s.name"
        :to="{ name: 'mgmt-edit-share', params: { id: s.id } }"
        :subtitle="s.price + '€'"
      />
    </BList>
  </div>
</template>

<script lang="ts">
import BList from '@/components/list/BList.vue';
import BListItem from '@/components/list/BListItem.vue';
import { Share, ShareManager } from '@/utils/ShareManager';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    BList,
    BListItem
  }
})
export default class Shares extends Vue {
  mounted() {
    ShareManager.loadShares();
  }

  get shares(): Share[] | null {
    return ShareManager.shares;
  }
}
</script>

<style lang="scss" scoped>
.view-shares {
  //
  .tc-avatar {
    height: 30px;
    width: 30px;
    margin: 5px 0;
  }
}
</style>
