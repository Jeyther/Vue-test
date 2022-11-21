<script setup>
defineProps({
  buttons: Array,
  stockLimit: String,
});
const emit = defineEmits(["handleStock"]);
const handleStock = (limit) => {
  emit("handleStock", limit);
};
</script>
<template>
  <button
    v-for="button in buttons"
    :key="button"
    class="greenButton"
    :class="{ greenButtonSelected: stockLimit === button.name ? true : false }"
    v-on:click="handleStock(button.name)"
  >
    {{ button.label }}
  </button>
</template>

<style>
.greenButton {
  background-color: rgb(0, 189, 126);
  color: white;
  border-radius: 10px;
  padding: 10px 20px;
  border-color: transparent;
}

.greenButton:hover,
.blueButton:hover,
.grayButton:hover,
.redButton:hover,
.actionButton:hover {
  cursor: pointer;
  transform: scale(1.05);
}

.greenButtonSelected {
  background-color: rgb(2, 90, 61);
}
</style>
