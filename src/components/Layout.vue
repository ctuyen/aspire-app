<script setup lang="ts"></script>

<template>
  <div class="bg-c3 h-full">
    <div class="flex items-center justify-end px-6 py-4">
      <img src="../assets/Logo.svg" />
    </div>
    <div>
      <slot />
    </div>
    <div class="fixed bg-cWhite bottom-0 inset-x-0 h-14 shadow-homeMenu px-6 py-2">
      <div class="flex items-center justify-between">
        <router-link to="/home">
          <div class="flex flex-col items-center">
            <img src="../assets/Logo-1.svg" />
            <div class="text-2xs text-cGray font-extralight">Home</div>
          </div>
        </router-link>
        <router-link to="/cards">
          <div class="flex flex-col items-center">
            <img src="../assets/pay.svg" />
            <div class="text-2xs text-c1 font-bold mt-1">Cards</div>
          </div>
        </router-link>
        <router-link to="/payment">
          <div class="flex flex-col items-center">
            <img src="../assets/Payments.svg" />
            <div class="text-2xs text-cGray font-extralight">Payments</div>
          </div>
        </router-link>
        <router-link to="/credit">
          <div class="flex flex-col items-center">
            <img src="../assets/Credit.svg" />
            <div class="text-2xs text-cGray font-extralight">Credit</div>
          </div>
        </router-link>
        <router-link to="/profile">
          <div class="flex flex-col items-center">
            <img src="../assets/Account.svg" />
            <div class="text-2xs text-cGray font-extralight">Profile</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
