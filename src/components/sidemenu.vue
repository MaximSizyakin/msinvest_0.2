<template>
  <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
    <q-list padding class="rounded-borders text-primary">
      <q-item
        :to="{name: 'IndexPage'}"
        :active="route.name === 'IndexPage'"
        active-class="my-menu-link"
        exact
        clickable
        v-ripple>
        <q-item-section avatar>
          <q-icon name="inbox"/>
        </q-item-section>

        <q-item-section>Main</q-item-section>
      </q-item>

      <q-item
        :to="{name: 'IMOEXPage'}"
        exact
        :active="route.name === 'IMOEXPage'"
        active-class="my-menu-link"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-icon name="send"/>
        </q-item-section>

        <q-item-section>IMOEX</q-item-section>
      </q-item>

    </q-list>
  </q-scroll-area>


</template>

<script setup>
import {useRoute} from 'vue-router';

const route = useRoute();
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>
