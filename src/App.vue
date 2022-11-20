<script setup>
import { ref, computed } from "vue";
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";

const newFruit = ref({ name: "", price: "", icon: "", stock: "" });
const title = "Dynamic Vue";
const styleColor = "color: white";
const active = true;
const showPicker = ref(false);
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
const disabledEmojisGroups = [
  "smileys_people",
  "animals_nature",
  "activities",
  "travel_places",
  "objects",
  "symbols",
  "flags",
];

//methods
const handleShow = () => {
  showTable.value = !showTable.value;
};

const handleStock = (limit) => {
  stockLimit.value = limit;
};

const handlePicker = () => {
  showPicker.value = !showPicker.value;
};

const handleAdd = () => {
  showModal.value = !showModal.value;
};

const handleCancel = () => {
  closeModal();
};

const handleEdit = (fruit) => {
  showModal.value = !showModal.value;
  newFruit.value = {
    name: fruit.name,
    price: fruit.price,
    icon: fruit.icon,
    stock: fruit.stock,
  };
};

const onSelectEmoji = (emoji) => {
  newFruit.value.icon = emoji.i;
  showPicker.value = !showPicker.value;
};

const handleSubmit = () => {
  let isNew = true;

  const fruit = {
    name: newFruit.value.name,
    price: newFruit.value.price,
    icon: newFruit.value.icon,
    stock: newFruit.value.stock,
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
  if (newFruit.value === undefined) {
    fruits.value = [];
  } else {
    const fruit = {
      name: newFruit.value.name,
      price: newFruit.value.price,
      icon: newFruit.value.icon,
      stock: newFruit.value.stock,
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
    newFruit.value = fruit;
  } else {
    newFruit.value = undefined;
  }
  showDeleteModal.value = !showDeleteModal.value;
};

const closeModal = () => {
  newFruit.value = { name: "", price: "", icon: "", stock: "" };
  showModal.value = false;
  showDeleteModal.value = false;
};
</script>

<template>
  <header>
    <h2 v-bind:style="styleColor">Hello {{ title }}! 😄</h2>
    <h4 v-if="active">I'm Happy</h4>
    <h4 v-else>I'm Sad</h4>
  </header>

  <button class="blueButton" v-on:click="handleShow">Show Table</button>

  <template v-if="showTable">
    <div class="flex-row">
      <button
        class="greenButton"
        :class="{ greenButtonSelected: stockLimit === 'larger' ? true : false }"
        v-on:click="handleStock('larger')"
      >
        Show Larger Stock
      </button>
      <button
        class="greenButton"
        :class="{ greenButtonSelected: stockLimit === 'lower' ? true : false }"
        v-on:click="handleStock('lower')"
      >
        Show Lower Stock
      </button>
      <button
        class="greenButton"
        :class="{ greenButtonSelected: stockLimit === 'all' ? true : false }"
        v-on:click="handleStock('all')"
      >
        Show All
      </button>
    </div>
    <table>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Icon</th>
        <th>Stock</th>
        <th>Actions</th>
      </tr>

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
    </table>
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

  <div class="addModal" v-if="showModal">
    <h3>Add New Fruit</h3>
    <div class="addInputsContainer">
      <input type="text" placeholder="Name" v-model="newFruit.name" />
      <input type="text" placeholder="Price" v-model="newFruit.price" />
      <input
        type="number"
        placeholder="Stock"
        min="0"
        max="10"
        v-model="newFruit.stock"
      />
      <div class="flex-row">
        <input
          type="text"
          placeholder="Icon"
          :disabled="true"
          v-model="newFruit.icon"
        />
        <button class="blueButton" @click="handlePicker">🥑</button>
      </div>
    </div>
    <div class="emojiPicker" v-if="showPicker">
      <EmojiPicker
        :native="true"
        @select="onSelectEmoji"
        :disabled-groups="disabledEmojisGroups"
        :disable-skin-tones="true"
        :disable-sticky-group-names="true"
        theme="dark"
      />
    </div>
    <div class="flex-row">
      <button class="grayButton" @click="handleCancel">Cancel</button>
      <button class="greenButton" @click="handleSubmit">Save</button>
    </div>
  </div>

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

.addModal {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;

  padding: 20px 40px;
  border-radius: 10px;
  top: 50%;

  background-color: rgb(42, 42, 42);
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

input {
  width: 100%;

  border-radius: 10px;
  padding: 10px 20px;
}

.addInputsContainer {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.emojiPicker {
  position: absolute;
  right: 40px;
  top: 175px;
  z-index: 5;
}

.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}
</style>
