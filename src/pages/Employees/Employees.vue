
<template>
  <!-- eslint-disable -->
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Quản lý nhân viên</h1>
      <v-row>
        <v-col cols="12">
          <v-card class="employee-list mb-1">
            <v-card-title class="pa-6 pb-3">
            </v-card-title>

            <v-data-table
              :headers="headers"
              :items="employees"
              sort-by="code"
              class="elevation-1"
              :loading="loading_table"
            >
              <template v-slot:item.address="{ item }">
                <span v-if="item.address.length > 20"> {{ item.address.slice(0,20) }}... </span>
                <span v-else> {{ item.address }} </span>
              </template>
              <template v-slot:item.status="{ item }">
                <span v-if="item.status === 'ACTIVE'">
                  <v-icon size="25" color="green">
                    mdi-check
                  </v-icon>
                </span>
                <span v-else>
                  <v-icon size="25" color="red">
                    mdi-close
                  </v-icon>
                </span>
              </template>
              <template v-slot:top>
                <v-toolbar
                  flat
                >
                  <v-toolbar-title>Danh sách nhân viên</v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  ></v-divider>

                  <v-spacer></v-spacer>

                  <v-dialog
                    v-model="dialog"
                    max-width="500px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        Tạo nhân viên
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                      </v-card-title>
          
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col
                              :cols="codeCols"
                                v-show="showCode"
                            >
                              <v-text-field
                                v-model="editedItem.code"
                                label="Code"
                                disabled
                              ></v-text-field>
                            </v-col>
                            <v-col
                              :cols="nameCols"
                            >
                              <v-text-field
                                v-model="editedItem.name"
                                label="Name"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="6"
                            >
                              <v-text-field
                                v-model="editedItem.email"
                                label="Email"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="6"
                            >
                              <v-text-field
                                v-model="editedItem.phone"
                                label="Phone"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                            >
                              <v-text-field
                                v-model="editedItem.address"
                                label="Address"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
          
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="close"
                        >
                          Hủy
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="save"
                        >
                          Lưu
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <v-dialog v-model="dialogDelete" max-width="300px">
                    <v-card>
                      <v-card-title class="text-h5 justify-center">Xóa nhân viên này?</v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Hủy</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Xóa</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>
              </template>
              
              <template v-slot:no-data>
                <v-btn
                  color="primary"
                  @click="initialize"
                >
                  Reset
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'
import authHeader from '../../utils/authHeader'

export default {
  name: 'Employees',
  data() {
    return {
      loading_table: true,
      headers: [
        { text: 'Code', align: 'start', value: 'code' },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Address', value: 'address' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      dialog: false,
      dialogDelete: false,
      employees: [],
      editedIndex: -1,
      editedItem: {
        _id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
      },
      defaultItem: {
        _id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
      },
      authorizationHeader: {},
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nhân viên mới' : 'Sửa nhân viên'
    },
    showCode () {
      return !(this.editedIndex === -1)
    },
    codeCols() {
      return this.editedIndex === -1 ? 0 : 4
    },
    nameCols() {
      return this.editedIndex === -1 ? 12 : 8
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.loading_table = true
      this.authorizationHeader = authHeader()
      axios
        .get('https://not-fap-be.herokuapp.com/api/admin', { headers: this.authorizationHeader })
        .then(res => {
          this.loading_table = false
          this.employees = res.data.data
        })
        .catch(err => {
          window.alert(err.response.data.error)
          this.$router.push('/login')      
        })
    },

    editItem (item) {
      this.editedIndex = this.employees.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.employees.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      axios
        .delete(
          `https://not-fap-be.herokuapp.com/api/admin/${this.editedItem._id}`,
          { headers: this.authorizationHeader }
        )
        .then(() => {
          this.close()
          this.employees = []
          this.initialize()
        })
        .catch(err => {
          window.alert(err.response.data.error)
          if (err.response.status === 401)
            this.$router.push('/login')      
        })
      this.closeDelete()
    },

    close () {
      this.dialog = false
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
        Object.assign(this.employees[this.editedIndex], this.editedItem)
        axios
          .put(
            `https://not-fap-be.herokuapp.com/api/admin/${this.editedItem._id}`,
            {
              name: this.editedItem.name,
              email: this.editedItem.email,
              phone: this.editedItem.phone,
              address: this.editedItem.address,
            },
            { headers: this.authorizationHeader }
          )
          .then(() => {
            this.close()
            this.employees = []
            this.initialize()
          })
          .catch(err => {
            window.alert(err.response.data.error)
            if (err.response.status === 401)
              this.$router.push('/login')      
          })
        this.close()
      } else {
        axios
          .post(
            'https://not-fap-be.herokuapp.com/api/admin',
            {  //  TODO: remove code - need fix backend first
              code: `XYZ123${Math.round(Math.random(0,999) * 1000)}`,
              name: this.editedItem.name,
              email: this.editedItem.email,
              phone: this.editedItem.phone,
              address: this.editedItem.address,
            },
            { headers: this.authorizationHeader }
          )
          .then(() => {
            this.close()
            this.employees = []
            this.initialize()
          })
          .catch(err => {
            window.alert(err.response.data.error)
            if (err.response.status === 401)
              this.$router.push('/login')      
          })
      }
    },
  },
}

</script>

<style src="./Employees.scss" lang="scss"></style>
