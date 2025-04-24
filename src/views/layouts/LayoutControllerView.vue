<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { supportedLocales, type MessageSchema, setLocale, type SupportedLocale } from '@/i18n'

const { t, locale } = useI18n<[MessageSchema], SupportedLocale>()
</script>
version

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <VersionInfo />

      <select placeholder="选择语言" v-model="locale" @change="setLocale(locale)">
        <option v-for="locale in supportedLocales" :value="locale.code" :key="locale.code">
          {{ locale.name }}
        </option>
      </select>
      <HelloWorld msg="You did it!" />

      <nav>
        <AppRouterLink to="/">{{ t('navigation.home') }}</AppRouterLink>
        <AppRouterLink to="/about">{{ t('navigation.about') }}</AppRouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
select {
  margin-bottom: 40px;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  /* header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  } */

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
