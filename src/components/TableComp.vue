<script setup>
defineProps({
  filteredFruits: Array,
});
const emit = defineEmits(["handleEdit", "openDeleteModal"]);

const handleEdit = (fruit) => {
  emit("handleEdit", fruit);
};
const openDeleteModal = (fruit) => {
  emit("openDeleteModal", fruit);
};
</script>
<template>
  <table>
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Icon</th>
      <th>Stock</th>
      <th>Actions</th>
    </tr>
    <template v-if="filteredFruits.length > 0">
      <template v-for="(fruit, i) in filteredFruits" v-bind:key="i">
        <tr>
          <td v-for="(cell, index) in fruit" :key="index">
            {{ cell }}
          </td>
          <td>
            <button class="actionButton blue" @click="handleEdit(fruit)">
              <v-icon name="md-modeeditoutline" scale="1" />
            </button>
            <button class="actionButton red" @click="openDeleteModal(fruit)">
              <v-icon name="bi-trash-fill" scale="1" />
            </button>
          </td>
        </tr>
      </template>
    </template>
    <template v-else>
      <tr>
        <h3>Is Empty</h3>
      </tr>
    </template>
  </table>
</template>

<style scoped>
header {
  padding: 20px;
}

h3 {
  text-align: center;
}

table {
  border: 1px solid rgb(255, 255, 255);
}

th {
  font-weight: bold;
}

td {
  padding: 10px 20px;
}
</style>
