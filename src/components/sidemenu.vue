<template>
  <div class="q-pa-md">
    <q-list bordered padding class="rounded-borders text-primary">
      <q-item
        :to="{name: 'IndexPage'}"
        exact
        clickable
        v-ripple
        :active="link === 'main'"
        @click="link = 'main'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="inbox"/>
        </q-item-section>

        <q-item-section>Main</q-item-section>
      </q-item>

      <q-item
        :to="{name: 'IMOEXPage'}"
        exact
        clickable
        v-ripple
        :active="link === 'IMOEX'"
        @click="link = 'IMOEX'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="send"/>
        </q-item-section>

        <q-item-section>IMOEX</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const link = ref('');
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>
