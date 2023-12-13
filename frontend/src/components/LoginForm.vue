<script setup lang="ts">
import { ref, type Ref } from "vue"
import apiUser from "@/api/user"
import type { Login, User } from "@/utils/types";
import { vMaska, type MaskaDetail } from "maska"

const email: Ref<string> = ref('')
const number: Ref<string> = ref('')

const vMaskaObject: Ref<MaskaDetail> = ref({
  masked: '',
  unmasked: '',
  completed: false
})

const data: Ref<User[]> = ref([])
const error: Ref<any> = ref(undefined)

const login = async () => {
  const loginData: Login = {
    email: email.value,
    number: number.value ? vMaskaObject.value.unmasked : undefined
  }
  try {
    data.value = (await apiUser.getUsers(loginData)).data
  } catch (error) {
    console.log("ERROR:", error);
  }
};
</script>

<template>
  <form @submit.prevent="login">
    <label for="email">Email:</label>
    <input type="email" v-model="email" required />

    <label for="phone">Number:</label>
    <input type="tel" v-maska="vMaskaObject" data-maska="##-##-##" v-model="number" />

    <button type="submit">Submit</button>
  </form>
  <div class="container">
    <div v-if="data.length > 0">
      <h2>Users Information:</h2>
      <div v-for="(user, index) in data" :key="index" class="item">
        <p>Email: {{ user.email }} / Number: {{ user.number }}</p>
      </div>
    </div>
    <div v-else>
      <h2>No data</h2>
    </div>
    <div v-if="error">
      <h3>Error:</h3>
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 300px;
  margin: 0 auto;
  text-align: center;
}

.item {
  border: 1px solid #ccc;
  border-radius: 8px;
}

form {
  max-width: 300px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 10%;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}
</style>