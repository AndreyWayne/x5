<template>

  <v-data-table :headers="headers" :items="tables" :search="search" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Список таблиц</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Поиск" single-line hide-details></v-text-field>

        <v-dialog v-model="dialogEdit" max-width="500px" >
          <v-card>
            <v-card-title>
              <span class="headline">Редактировать таблицу</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Наименование таблицы"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="close">
                Отмена
              </v-btn>
              <v-btn color="success" text @click="save">
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title>
              Действительно хотите удалить таблицу?
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="info" text @click="closeDelete">Нет</v-btn>
              <v-btn color="error" text @click="deleteItemConfirm">Удалить</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Обновить
      </v-btn>
    </template>
  </v-data-table>

</template>

<script>
export default {
  data: () => ({
    search: '',
    dialogEdit: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Наименование таблицы',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {
        text: '',
        align: 'right',
        value: 'actions',
        sortable: false
      },
    ],
    tables: [],
    editedIndex: -1,
    editedItem: {
      name: '',
    },
    defaultItem: {
      name: '',
    },
  }),

  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.tables = [
        {
          name: 'Таблица 1',
        },
        {
          name: 'Таблица тестовая 2',
        },
        {
          name: 'Таблица 65',
        },
        {
          name: 'Таблица созданная 1',
        },
        {
          name: 'Таблица Gingerbread',
        },
        {
          name: 'Таблица 113424',
        },
        {
          name: 'Таблица 1цу',
        },
        {
          name: 'Таблица тестовая 24243',
        },
        {
          name: 'Таблица цацуацуа',
        },
        {
          name: 'Таблица созданная 23424',
        },
        {
          name: 'Таблица Gingerbread 32к23к',
        },
        {
          name: 'Таблица цацуа',
        },
      ]
    },

    editItem (item) {
      this.editedIndex = this.tables.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogEdit = true
    },

    deleteItem (item) {
      this.editedIndex = this.tables.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.tables.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialogEdit = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.tables[this.editedIndex], this.editedItem)
      } else {
        this.tables.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

