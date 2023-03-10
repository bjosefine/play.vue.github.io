<!-- Settings Page  -->
<template>
  <body :class="newTheme">
    <!-- Big flexbox -->
    <div class="container">
      <!-- Big header -->
      <h1 class="header">Settings</h1>
      <!-- Small header -->
      <h1 class="smallHeaders">Change theme</h1>

      <!-- Small flexbox -->
      <div class="smallContainer">
        <h3 class="alternatives">Dark Theme</h3>
        <button @click="newTheme = 'darkTheme'">Click</button>

        <h3 class="alternatives">Light Theme</h3>
        <button @click="newTheme = 'lightTheme'">Click</button>

        <h3 class="alternatives">Bubblegum Theme</h3>
        <button @click="newTheme = 'bubblegumTheme'">Click</button>
      </div>
    </div>
  </body>
</template>

<script>
  export default {
    data() {
      return {
        newTheme: 'lightTheme'
      }
    }
  }
</script>

<style>
  .darkTheme {
    background-color: blue;
  }

  .lightTheme {
    background-color: rgb(167, 220, 168);
  }

  .bubblegumTheme {
    background-color: rgb(255, 0, 217);
  }
  .container {
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    padding: 0;
  }
  .header {
    font-size: 20px;
  }

  .smallContainer {
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .smallHeaders {
    font-size: 17px;
    width: 100%;
  }

  .alternatives {
    font-size: 15px;
    width: 50%;
  }

  button {
    width: 10%;
    background-color: rgb(241, 0, 0);
  }
</style>
