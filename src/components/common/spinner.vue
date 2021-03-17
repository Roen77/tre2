<template>
  <div class="spinner-container">
      <div class="spinner"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.spinner-container{
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    height: 100px;
}
.spinner{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 3px solid gray;
    border-bottom: 3px solid orange;
    animation: spin 3s infinite forwards;
}
@keyframes spin {
    0%{
        transform: rotate(0);
    }
    0%{
        transform: rotate(360deg);
    }
}
</style>