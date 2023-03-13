<template>
  <div class="mainnav" :class="{ 'navbar--visible': scrolled }">
    <div class="goback" @click="goBack" v-if="!hideGoBack && scrolled">
      <i class="bi bi-arrow-left-circle-fill" />
    </div>

    <!-- Settings Icon -->
    <!-- <div class="settings">
      <router-link to="/settings">
        <span class="bi bi-gear" />
      </router-link>
    </div> -->

    <div class="headprofile" />
    <div class="wheel" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        scrolled: false
      }
    },
    props: {
      hideGoBack: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll() {
        this.scrolled = window.scrollY > 0
      },
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .mainnav {
    position: fixed;
    width: 100%;
    height: 50px;
    background-color: transparent;
    text-align: center;
    transition: background-color 0.3s;
    z-index: 1000;
  }

  .navbar--visible {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.9px);
    -webkit-backdrop-filter: blur(7.9px);
    color: rgb(41, 38, 38);
    transition: background-color 0.3s;
    /* background: rgba(206, 17, 206, 0.062); */
  }

  .goback {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(240, 41, 226, 0.199);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
    color: #fff;
    position: fixed;
    cursor: pointer;
    margin-left: 1%;
    margin-top: 5px;
  }

  .goback:hover {
    transform: scale(1.2);
    transition: 0.3s;
  }

  /* .settings {
    display: flex;
    align-items: center;
    justify-content: right;
    width: 95%;
    padding-right: 30px;
    height: 50px;
  }

  span {
    font-size: 20px;
  } */
</style>
