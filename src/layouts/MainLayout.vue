<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawer = !drawer"
        />

        <q-toolbar-title>
          Invest App
        </q-toolbar-title>

        <div>M. Sizyakin</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseenter="miniState = false"
      @mouseleave="miniState = true"
      :width="200"
      :breakpoint="500"
      bordered
    >

      <side-menu></side-menu>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import SideMenu from 'components/SideMenu.vue';
import {ref} from 'vue';

const drawer = ref(true);
const miniState = ref(true);
</script>
