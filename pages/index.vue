<template>
  <section class="container">
    <h1>Simple WebRTC video streaming</h1>
    <div class="links">
      <nuxt-link to="/broadcast">
        Broadcast
      </nuxt-link>
      <nuxt-link to="/view">
        View
      </nuxt-link>
    </div>
  </section>
</template>

<script lang="js">

export default {
}
</script>

<style lang="scss">
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

body {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: white;
  margin: 0;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  text-align: center;

  .links {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
