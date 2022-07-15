<template>

		<button @click="open">打开弹窗</button>
		<uni-popup ref="popup" type="bottom">
			<div class="bg-white">
			底部弹出 Popup
			</div>
		</uni-popup>
</template>

<script setup>
const popup = $ref(null)

const open = () => {
  popup.open('bottom')
}
</script>
