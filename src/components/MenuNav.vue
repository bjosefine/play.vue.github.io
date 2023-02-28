<template>
  <div class="MenuNav">
    <ul>
      <li><i class="bi bi-house"></i> Home</li>
      <router-link tag="li" to="/search">
        <i class="bi bi-search"></i> Search
      </router-link>
      <li><i class="bi bi-person"></i> Profile</li>
    </ul>
  </div>
</template>

<script></script>

<style scoped>
  .MenuNav {
    display: flex;
    height: 100vh;
    position: fixed;
    bottom: 0;
    background-color: rgb(241, 179, 241);
    float: left;
  }
  ul {
    margin: 0;
    padding: 0;
    float: left;
  }
  li {
    display: flex;
    padding: 15px;
    margin-right: 20px;
    list-style: none;
  }
  a {
    color: rgb(21, 22, 23);
  }
</style>
