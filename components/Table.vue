<template>
  <div class="doc-template">
    <div class="doc-header deep-purple darken-3">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn to="/" v-bind="attrs" v-on="on" icon dark tile class="doc-header__icon">
            <v-icon>mdi-file-table-box-multiple</v-icon>
          </v-btn>
        </template>
        <span>Список таблиц</span>
      </v-tooltip>

      <div class="doc-header__info">
        <div class="doc-header__input">
          <v-text-field v-model="tableName" name="TABLE_NAME" hide-details="auto" dark dense></v-text-field>

          <div class="doc-header__messages">
            <v-icon dark>mdi-message-alert-outline</v-icon>
            Тут будут системные сообщения
          </div>
        </div>

        <div class="doc-header__actions">
          <v-speed-dial v-model="fab" direction="left">
            <template v-slot:activator>
              <v-btn v-model="fab" color="#fff" fab>
                <v-icon v-if="fab">mdi-close</v-icon>
                <v-icon v-else>mdi-cog</v-icon>
              </v-btn>
            </template>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="orange" fab x-small dark v-bind="attrs" v-on="on">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>Создать таблицу</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="success" fab x-small v-bind="attrs" v-on="on">
                  <v-icon>mdi-content-save-edit</v-icon>
                </v-btn>
              </template>
              <span>Сохранить изменения</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="error" fab x-small v-bind="attrs" v-on="on" @click="deleteItem(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Удалить таблицу</span>
            </v-tooltip>
          </v-speed-dial>
        </div>
      </div>

      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title>Действительно хотите удалить таблицу?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="info" text @click="closeDelete">Нет</v-btn>
            <v-btn color="error" text @click="deleteItemConfirm">Удалить</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div class="view">
      <div class="table">
        <div class="table__head">
          <div class="table__row">

            <div class="table__thead table__thead--empty"></div>

            <div class="table__col table__col--thead" v-for='(head, headIndex) in visibleTableHeaderData' :key='head.id'
                 :data-key='head.id'>
              {{ head.id }}
            </div>

          </div>
        </div>

        <div class="table__body">
          <div class="table__row" v-for="item in visibleTableData" :key="item.id" style="height: 25px">
            <div class="table__thead table__thead--aside">{{ item.id }}</div>

            <div class="table__col"
                 v-for='(col, colIndex) in item.data'
                 :key='`${ item.id } ${ col.id }`'
                 :data-key='`${ item.id } ${ col.id }`'>
              <input type="text" class="table__input">
            </div>
          </div>
        </div>
      </div>
      <div class="sizer" :style="{ height: `${ getTopHeight * 2 + 10000 }px`, width: `${ getLeft * 2 + 10000 }px` }"></div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    api: {
      type: Object
    }
  },

  data() {

    return {
      tableName: 'Таблица 1',
      dialogDelete: false,
      fab: false,

      tableData: [],

      tableDataConfig: {
        initialFilling: {
          rows: 150,
          cols: 26,
        },
        visible: {
          rows: 100,
          cols: 26,
        },
        fillingScroll: {
          addRow: 100,
          addCol: 10
        },
        styles: {
          height: 25,
          width: 150
        },
      },

      scrollData: {
        start: 0,
        startX: 0
      }
    }
  },
  computed: {
    getScrollStart() {
      return this.scrollData.start
    },

    startY() {
      return this.scrollData.start
    },

    startX() {
      return this.scrollData.startX
    },

    getTopHeight() {
      return this.tableDataConfig.styles.height * this.scrollData.start
    },

    getLeft() {
      return this.tableDataConfig.styles.width * this.scrollData.startX
    },

    getBottomHeight() {
      return (
          this.tableDataConfig.styles.height *
          (this.tableLength -
              (this.scrollData.start + this.tableDataConfig.visible.rows))
      );
    },

    tableLength() {
      return this.tableDataConfig.initialFilling.rows
      // return this.tableData.length
    },

    tableHeaderData() {
      return this.tableDataConfig.initialFilling.cols
      // return this.tableData[0] ? this.tableData[0].data : []
    },

    tableHeaderDataLength() {
      return this.tableHeaderData.length
    },

    visibleTableData() {
      return this.tableData;
      // return this.tableData.slice(
      //     this.scrollData.start,
      //     this.scrollData.start + this.tableDataConfig.visible.rows + 2
      // )
    },

    visibleTableHeaderData() {
      // return false
      return this.tableData[0] ? this.tableData[0].data : [];
      // return this.tableHeaderData.slice(this.scrollData.startX, this.scrollData.startX + this.tableDataConfig.visible.cols + 2)
    }
  },
  methods: {
    alphaIndex(num) {
      //нумерация abc..z,ab
      const base = 26

      let str = ""

      do {
        const mod = num % base
        num = (num / base) | 0;
        str =
            (mod
                ? String.fromCharCode("A".charCodeAt(0) + mod - 1)
                : (--num, "Z")) + str
      } while (num)

      return str
    },

    initialFillingTable() {
      let {cols, rows} = this.tableDataConfig.initialFilling

      for (let i = 1; i <= rows; i++) {
        let fill = {
          id: i,
          data: [],
        };

        for (let k = 1; k <= cols; k++) {
          fill.data.push({id: this.alphaIndex(k)})
        }

        this.tableData.push(fill)
      }
    },

    refreshTable() {
      let {cols, rows} = this.tableDataConfig.initialFilling
      let updateTable = [];

      let startRow = this.scrollData.start;
      let startCol = this.scrollData.startX;

      // console.log([startRow, startCol]);

      for (let i = 1; i <= rows; i++) {
        let fill = {
          id: i + startRow,
          data: [],
        };

        for (let k = 1; k <= cols; k++) {
          fill.data.push({id: this.alphaIndex(k + startCol)})
        }

        updateTable.push(fill);
      }

      // console.log(updateTable);

      this.tableData = updateTable
    },

    scroll(e) {
      let startY = Math.floor(
          e.target.scrollTop / this.tableDataConfig.styles.height
      )

      let startX = (e.target.scrollLeft > 50)
          ? Math.floor((e.target.scrollLeft - 50) / this.tableDataConfig.styles.width)
          : Math.floor((e.target.scrollLeft) / this.tableDataConfig.styles.width)

      this.scrollData.start = startY
      this.scrollData.startX = startX

      // if (
      //     this.scrollData.start >=
      //     this.tableLength - this.tableDataConfig.visible.rows
      // ) {
      //   this.scrollData.start =
      //       this.tableLength - this.tableDataConfig.visible.rows
      // }
    },

    deleteItem(item) {
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.closeDelete()
    },

    closeDelete() {
      this.dialogDelete = false
    },

    throttle(f, t) {
      return function (args) {
        let previousCall = this.lastCall;
        this.lastCall = Date.now();
        if (previousCall === undefined // function is being called for the first time
            || (this.lastCall - previousCall) > t) { // throttle time has elapsed
          f(args);
        }
      }
    }
  },

  mounted() {
    this.initialFillingTable()

    document
        .querySelector(".view")
        .addEventListener("scroll", (e) => {
          this.throttle(this.scroll(e), 200)
        }, { passive: true })
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    },
    startY() {
      // if (this.startY >= this.tableLength - this.tableDataConfig.visible.rows) {
        // let rowFill = []
        //
        // for (let i = 1; i <= this.tableDataConfig.fillingScroll.addRow; i++) {
        //   let fill = {
        //     id: this.tableLength + i,
        //     data: []
        //   }
        //
        //   for (let k = 1; k <= this.tableHeaderDataLength; k++) {
        //     fill.data.push({id: this.alphaIndex(k)})
        //   }
        //
        //   rowFill.push(fill)
        // }

        this.refreshTable();
        // this.tableData.push(...rowFill)
      // }
    },
    startX() {
      // if (this.startX >= this.tableHeaderDataLength - this.tableDataConfig.visible.cols) {
        // let fill = []
        //
        //
        // for (let i = 1; i <= this.tableDataConfig.fillingScroll.addCol; i++) {
        //   fill.push({
        //     id: this.alphaIndex(this.tableHeaderDataLength + i)
        //   })
        // }
        //
        // this.tableData.forEach(item => {
        //   item.data.push(...fill)
        // })

        this.refreshTable();
      // }
    }
  }
}
</script>

<style scoped lang='scss'>

.doc-template {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.doc-header {
  display: flex;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 130px;

  &__messages {
    margin-top: 20px;
    font: 13px 'Arial', sans-serif;
    color: #fff;

    .v-icon {
      margin-right: 10px;
    }
  }

  &__icon {
    flex-shrink: 0;
    width: 70px;
    height: 70px;

    img {
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
    }
  }

  &__info {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: calc(100% - 70px);
    padding: 15px 20px 15px 0;
  }

  &__input {
    width: 50%;
  }
}

.page {
  background-color: #fff;
  margin: 0;
}

.view {
  padding-top: 130px;
  height: 100%;
  overflow: auto;
  width: 100vw;
  position: relative;
}

.table {
  display: flex;
  flex-direction: column;
  position: fixed;
  top:130px;
  left:0;

  &__row {
    display: flex;
  }

  &__col,
  &__thead {
    min-width: 150px;
    max-width: 150px;
    height: 25px;
    border: 0.5px solid #C5C5C5;
    text-align: center;
    line-height: 25px;
    font-size: 14px;
  }

  &__col {
    background-color: white;

    &--thead {
      background-color: #e6e6e6;
    }
  }

  &__thead {
    min-width: 50px;
    background-color: #e6e6e6;

    &--aside {
      //position: sticky;
      left: 0;
    }
  }

  &__head {
    //position: sticky;
    top: 0;
    z-index: 2;
  }

  &__input {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    padding: 0 7.5px;
  }
}

.sizer {
  min-width: 200vw;
  min-height: 200vh;
  position: relative;
  z-index: 1;
}
</style>

<style lang="scss">
.doc-header {
  .theme--dark.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state) > .v-input__control > .v-input__slot fieldset {
    color: rgba(255,255,255, 0)
  }

  .theme--dark.v-text-field > .v-input__control > .v-input__slot:before {
    border-color: transparent;
  }

  &__input {
    .v-input {
      max-width: 500px;
    }
  }
}
</style>
