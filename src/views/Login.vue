<template>
  <div class="view-login">
    <div content>
      <div class="login-container">
        <img src="pwa/moonstonks.svg" alt="" />
        <h1>Börsenclient</h1>

        <tc-input placeholder="Enter Token" v-model="token" :dark="true" />
        <tc-button
          variant="filled"
          tfbackground="error"
          name="Anmelden"
          icon="login"
          @click="login"
        />
      </div>
    </div>

    <svg preserveAspectRatio="none" viewBox="0 0 375 183">
      <path
        d="M-717-3074v-181.934A119.99,119.99,0,0,1-701-3257c65.722,0,72.625,68.7,130.662,81.912,23.875,5.436,49.4-14.732,79.122-34.9,40.055-27.183,87.718-54.368,149.216-18.86V-3074Z"
        transform="translate(717 3257)"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { signIn } from '@/utils/auth';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  public token = '';

  public async login(): Promise<void> {
    if (await signIn(this.token)) {
      this.$router.push({ name: 'home' });
    }
  }
}
</script>

<style lang="scss" scoped>
.view-login {
  min-height: calc(100vh - 150px);
  padding-bottom: 150px;
  display: grid;
  place-content: center;

  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      max-width: 100px;
    }
    h1 {
      margin: 0;
    }
    .tc-input {
      margin: 100px 0 20px;
      width: 90vw;
      max-width: 250px;
    }
  }

  svg {
    z-index: -1;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 150px;
    width: 100vw;
    fill: $paragraph_dark;
  }
}
</style>
