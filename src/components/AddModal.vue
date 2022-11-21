<script setup>
import EmojiPicker from "vue3-emoji-picker";
import { ref, watch, onMounted, onUnmounted } from "vue";

const props = defineProps(["showModal", "selectedFruit"]);
const emit = defineEmits(["handleCancel", "handleSubmit"]);

const showPicker = ref(false);
const newFruit = ref({ name: "", price: "", icon: "", stock: "" });

const handleSubmit = (fruit) => {
  emit("handleSubmit", fruit);
  newFruit.value = { name: "", price: "", icon: "", stock: "" };
};
const handleCancel = () => {
  emit("handleCancel");
  newFruit.value = { name: "", price: "", icon: "", stock: "" };
};

const disabledEmojisGroups = [
  "smileys_people",
  "animals_nature",
  "activities",
  "travel_places",
  "objects",
  "symbols",
  "flags",
];

const handlePicker = () => {
  showPicker.value = !showPicker.value;
};

const onSelectEmoji = (emoji) => {
  newFruit.value.icon = emoji.i;
  showPicker.value = !showPicker.value;
};

watch(props.selectedFruit, (fruit) => {
  if (fruit !== undefined) {
    newFruit.value = {
      name: fruit.name,
      price: fruit.price,
      icon: fruit.icon,
      stock: fruit.stock,
    };
  }
});

onMounted(() => {
  if (Object.entries(props.selectedFruit).length !== 0) {
    newFruit.value = { ...props.selectedFruit };
  }
});

onUnmounted(() => {
  newFruit.value = { name: "", price: "", icon: "", stock: "" };
});
</script>

<template>
  <div class="addModal">
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
      <button class="grayButton" @click="handleCancel(newFruit)">Cancel</button>
      <button class="greenButton" @click="handleSubmit(newFruit)">Save</button>
    </div>
  </div>
</template>

<style scoped>
input {
  width: 100%;

  border-radius: 10px;
  padding: 10px 20px;
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
</style>
