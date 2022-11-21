<script setup>
import { ref, computed } from "vue";

import TableComp from "./components/TableComp.vue";
import FilterButton from "./components/FilterButton.vue";
import AddModal from "./components/AddModal.vue";

import "vue3-emoji-picker/css";

//constants
const styleColor = "color: white";
const active = true;
const buttons = [
  { name: "all", label: "Show All" },
  { name: "lower", label: "Show Lower Stock" },
  { name: "larger", label: "Show Larger Stock" },
];

//refs
const showModal = ref(false);
const showDeleteModal = ref(false);
const showTable = ref(false);
const stockLimit = ref("all");
const fruits = ref([
  { name: "Apple", price: "$1.00", icon: "🍎", stock: 10 },
  { name: "Banana", price: "$3.00", icon: "🍌", stock: 20 },
  { name: "Watermelon", price: "$2.70", icon: "🍉", stock: 7 },
  { name: "Strawberry", price: "$2.00", icon: "🍓", stock: 35 },
  { name: "Cherry", price: "$1.20", icon: "🍒", stock: 2 },
]);
const selectedFruit = ref({});

//methods
const handleShow = () => {
  showTable.value = !showTable.value;
};

const handleStock = (limit) => {
  stockLimit.value = limit;
};

const handleAdd = () => {
  showModal.value = !showModal.value;
};

const handleCancel = () => {
  closeModal();
};

const handleEdit = (fruit) => {
  showModal.value = !showModal.value;
  selectedFruit.value = {
    name: fruit.name,
    price: fruit.price,
    icon: fruit.icon,
    stock: fruit.stock,
  };
};

const handleSubmit = (newFruit) => {
  let isNew = true;

  const fruit = {
    name: newFruit.name,
    price: newFruit.price,
    icon: newFruit.icon,
    stock: newFruit.stock,
  };

  fruits.value.map((lastFruit) => {
    if (lastFruit.name.toLocaleLowerCase() === fruit.name.toLocaleLowerCase()) {
      lastFruit.price = fruit.price;
      lastFruit.icon = fruit.icon;
      lastFruit.stock = fruit.stock;

      isNew = false;
      closeModal();
    }
  });

  if (isNew) {
    fruits.value.push(fruit);
    closeModal();
  }
};

const handleDelete = () => {
  if (Object.entries(selectedFruit.value).length === 0) {
    fruits.value = [];
  } else {
    const fruit = {
      name: selectedFruit.value.name,
      price: selectedFruit.value.price,
      icon: selectedFruit.value.icon,
      stock: selectedFruit.value.stock,
    };

    const newArray = fruits.value.filter((lastFruit) => {
      return !lastFruit.name.includes(fruit.name);
    });

    fruits.value = newArray;
  }
  closeModal();
};

const filteredFruits = computed(() => {
  if (stockLimit.value === "lower") {
    return fruits.value.filter((fruit) => fruit.stock < 10);
  } else if (stockLimit.value === "larger") {
    return fruits.value.filter((fruit) => fruit.stock >= 10);
  } else {
    return fruits.value;
  }
});

const openDeleteModal = (fruit) => {
  if (fruit.name !== undefined) {
    selectedFruit.value = fruit;
  } else {
    selectedFruit.value = {};
  }
  showDeleteModal.value = !showDeleteModal.value;
};

const closeModal = () => {
  showModal.value = false;
  showDeleteModal.value = false;
  selectedFruit.value = {};
};
</script>

<template>
  <header>
    <h1 v-bind:style="styleColor">Fruit Stacker 🚛</h1>
    <h4 v-if="active">Little Vue Test Project</h4>
  </header>

  <button class="blueButton" v-on:click="handleShow">Show Table</button>

  <template v-if="showTable">
    <div class="flex-row">
      <FilterButton
        :buttons="buttons"
        :stockLimit="stockLimit"
        @handleStock="(limit) => handleStock(limit)"
      />
    </div>
    <TableComp
      :filteredFruits="filteredFruits"
      @handleEdit="(fruit) => handleEdit(fruit)"
      @openDeleteModal="(fruit) => openDeleteModal(fruit)"
    />
    <template class="flex-row">
      <button class="blueButton" v-on:click="handleAdd">
        <v-icon name="md-plusone" />
        Add
      </button>
      <button class="redButton" v-on:click="openDeleteModal">
        <v-icon name="bi-trash-fill" />Delete All
      </button>
    </template>
  </template>

  <template v-if="showModal">
    <AddModal
      :showModal="showModal"
      :selectedFruit="selectedFruit"
      @handleSubmit="handleSubmit"
      @handleCancel="handleCancel"
    />
  </template>

  <div class="deleteModal" v-if="showDeleteModal">
    <h3>Delete Fruit</h3>
    <h4>are you sure?</h4>
    <div class="flex-row">
      <button class="grayButton" @click="handleCancel">Cancel</button>
      <button class="redButton" @click="handleDelete">Delete</button>
    </div>
  </div>
</template>

<style>
header {
  padding: 20px;
  font-weight: bold;
  text-align: center;
}

.blueButton {
  background-color: rgb(0, 151, 189);
  color: white;
  border-radius: 10px;
  padding: 10px 20px;
  border-color: transparent;
}

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

.redButton {
  background-color: rgb(189, 0, 0);
  color: white;
  border-radius: 10px;
  padding: 10px 20px;
  border-color: transparent;
}

.grayButton {
  background-color: rgb(103, 103, 103);
  color: white;
  border-radius: 10px;
  padding: 10px 20px;
  border-color: transparent;
}

.actionButton {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  color: white;
  margin-left: 10px;
}
.red {
  background-color: rgb(189, 0, 0);
}
.blue {
  background-color: rgb(0, 151, 189);
}

.deleteModal {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;

  padding: 20px 40px;
  border-radius: 10px;
  top: 50%;
  left: 30px;
  right: 30px;

  background-color: rgb(42, 42, 42);
}

.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}
</style>
