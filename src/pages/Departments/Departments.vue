
<template>
  <!-- eslint-disable -->
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Quản lý department</h1>
      <v-row>
        <v-col cols="12">
          <v-card class="department-list mb-1">
            <v-card-title class="pa-6 pb-3">
            </v-card-title>

            <v-data-table
              :headers="headers"
              :items="departments"
              sort-by="code"
              class="elevation-1 px-5"
              :loading="loading_table"
            >
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
                  <v-toolbar-title>Danh sách department</v-toolbar-title>
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
                        Tạo department
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
                              cols="6"
                            >
                              <v-text-field
                                v-model="editedItem.code"
                                label="Code"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="6"
                            >
                              <v-text-field
                                v-model="editedItem.name"
                                label="Name"
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
                </v-toolbar>
              </template>

              <template v-slot:item.actions="{ item }" class="d-flex justify-center">
                <v-icon
                  small
                  class="mr-2 justify-center"
                  @click="editItem(item)"
                >
                  mdi-pencil
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
  name: 'Departments',
  data() {
    return {
      loading_table: true,
      headers: [
        { text: 'Code', align: 'start', value: 'code' },
        { text: 'Name', value: 'name' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      dialog: false,
      dialogDelete: false,
      departments: [],
      editedIndex: -1,
      editedItem: {
        _id: '',
        name: '',
      },
      defaultItem: {
        _id: '',
        name: '',
      },
      authorizationHeader: {},
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Department mới' : 'Sửa department'
    },
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
        .get('https://not-fap-be.herokuapp.com/api/department', { headers: this.authorizationHeader })
        .then(res => {
          this.loading_table = false
          this.departments = res.data.data
        })
        .catch(err => {
          window.alert(err.response.data.error)
          this.$router.push('/login')      
        })
    },

    editItem (item) {
      this.editedIndex = this.departments.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
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
        Object.assign(this.departments[this.editedIndex], this.editedItem)
        axios
          .put(
            `https://not-fap-be.herokuapp.com/api/department/${this.editedItem._id}`,
            { ...this.editedItem },
            { headers: this.authorizationHeader }
          )
          .then(() => {
            this.close()
            this.departments = []
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
            'https://not-fap-be.herokuapp.com/api/department',
            { ...this.editedItem },  //  TODO: remove code - need fix backend first
            { headers: this.authorizationHeader }
          )
          .then(() => {
            this.close()
            this.departments = []
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

<style src="./Departments.scss" lang="scss"></style>
