<template>
  <v-app app v-cloack>

    <v-app-bar app clipped-left flat color="deep-purple darken-3">
      <v-app-bar-nav-icon @click="drawer = true" color="#fff"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer app clipped v-model="drawer" mobile-breakpoint="650" dark permanent color="deep-purple accent-4">
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>l.mail@mail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group
          v-model="selectedItem"
          color="deep-purple lighten-5"
        >
          <v-list-item
            v-for="(item, i) in navigations"
            :key="i"
            :href="item.url" nuxt
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block>
            <v-icon left>
              mdi-exit-to-app
            </v-icon>
            Выйти
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main style="height: 100%">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    selectedItem: 1,
    navigations: [
      { title: 'Создать таблицу', icon: 'mdi-table-large-plus', 'url': '/spreadsheets' },
      { title: 'Таблицы', icon: 'mdi-file-table-box-multiple', 'url': '/' },
    ],
  }),
  methods: {
    exit() {}
  }
}
</script>
