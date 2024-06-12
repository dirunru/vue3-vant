<template>
	<nav>
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link>
	</nav>
	<van-button type="primary">主要按钮</van-button>
	<van-button type="default">默认按钮</van-button>
	<van-button type="warning">警告按钮</van-button>
	<van-button type="danger">危险按钮</van-button>
  
	<router-view />
</template>
<script setup lang="ts">
</script>
<style lang="less">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
