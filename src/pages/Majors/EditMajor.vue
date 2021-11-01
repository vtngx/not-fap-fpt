
<template>
  <!-- eslint-disable -->
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Chỉnh sửa thông tin ngành học</h1>
      <v-row>
        <v-col cols="12">
          <v-card class="major-list mb-1 px-15 py-10">
            <div class="mb-15">
              <validation-observer
                ref="observer"
                v-slot="{ invalid }"
              >
                <form @submit.prevent="submit">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Code"
                    rules="required|min:2"
                  >
                    <v-text-field
                      v-model="code"
                      :error-messages="errors"
                      label="Code"
                      required
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Name"
                    rules="required|min:2"
                  >
                    <v-text-field
                      v-model="name"
                      :error-messages="errors"
                      label="Name"
                      required
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Description"
                    rules="min:2|max:200"
                  >
                    <v-text-field
                      v-model="description"
                      :error-messages="errors"
                      label="Description"
                      required
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="credits"
                    :rules="{
                      required: true,
                      integer: 7,
                    }"
                  >
                    <v-text-field
                      v-model="credits"
                      :error-messages="errors"
                      label="Total Credits"
                      required
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="select"
                    rules="required"
                  >
                    <v-select
                      v-model="status"
                      :items="items"
                      :error-messages="errors"
                      label="Status"
                      data-vv-name="select"
                      value="ACTIVE"
                      required
                    ></v-select>
                  </validation-provider>

                  <v-data-table
                    :headers="headers"
                    :items="courses"
                    sort-by="code"
                    class="elevation-1 px-5 my-10"
                    :loading="loading_table"
                  >
                    <template v-slot:top>
                      <v-toolbar flat>
                        <v-toolbar-title>Các môn học</v-toolbar-title>
                        
                        <v-spacer></v-spacer>

                        <v-dialog v-model="dialog" max-width="500px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              color="primary"
                              dark
                              class="mb-2"
                              v-bind="attrs"
                              v-on="on"
                            >
                              Thêm môn học
                            </v-btn>
                          </template>

                          <v-card>
                            <v-card-title>
                              <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>
                
                            <v-card-text>
                              <v-container>
                                  <v-data-table
                                    :headers="allCoursesHeaders"
                                    :items="allCourses"
                                    sort-by="code"
                                    class="elevation-1 px-5"
                                    :loading="loading_table"
                                  >
                                    <template v-slot:item.actions="{ item }" class="d-flex justify-center">
                                      <v-icon
                                        class="mr-2 justify-center"
                                        @click="addItem(item)"
                                        color="green"
                                      >
                                        mdi-plus
                                      </v-icon>
                                    </template>
                                  </v-data-table>
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
                            </v-card-actions>
                          </v-card>
                        </v-dialog>

                        <v-dialog v-model="dialogDelete" max-width="300px">
                          <v-card>
                            <v-card-title class="text-h5 justify-center">Xóa môn học này?</v-card-title>
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

                    <template v-slot:item.actions="{ item }" class="d-flex justify-center">
                      <v-icon
                        class="mr-2 justify-center"
                        @click="deleteItem(item)"
                        color="red"
                      >
                        mdi-close
                      </v-icon>
                    </template>
                  </v-data-table>

                  <v-btn 
                    class="mr-4"
                    @click="cancel"
                  >
                    hủy
                  </v-btn>
                  <v-btn
                    type="submit"
                    :disabled="invalid"
                  >
                    lưu
                  </v-btn>
                </form>
              </validation-observer>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'
import authHeader from '../../utils/authHeader'
import { required, max, min, integer } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('integer', {
  ...integer,
  message: '{_field_} needs to be integer.',
})

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
})

extend('min', {
  ...min,
  message: '{_field_} may not be less than {length} characters',
})

export default {
  name: 'Courses',

  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      majorId: '',
      code: '',
      name: '',
      credits: '',
      description: '',
      items: [
        'ACTIVE',
        'INACTIVE',
      ],
      status: '',
      checkbox: null,

      statusCols: 6,
      loading_table: true,
      headers: [
        { text: 'Code', align: 'start', value: 'code' },
        { text: 'Name', value: 'name' },
        { text: 'Credits', value: 'credits' },
        { text: 'Min Mark', value: 'minMarkToPass' },
        { text: 'Slots Total', value: 'slotsTotal' },
        { text: 'Slots/Week', value: 'slotsPerWeek' },
        { text: 'Price', value: 'price' },
        { text: 'Details', value: 'actions', sortable: false },
      ],
      allCoursesHeaders: [
        { text: 'Code', align: 'start', value: 'code' },
        { text: 'Name', value: 'name' },
        { text: 'Add', value: 'actions', sortable: false },
      ],
      dialog: false,
      dialogDelete: false,
      courses: [],
      allCourses: [],
      editedIndex: -1,
      editedItem: {
        _id: '',
        code: '',
        name: '',
        description: '',
        credits: 0,
        minMarkToPass: 5,
        price: 0,
        slotsPerWeek: 0,
        slotsTotal: 0,
        status: '',
        courses: []
      },
      defaultItem: {
        _id: '',
        code: '',
        name: '',
        description: '',
        credits: 0,
        minMarkToPass: 5,
        price: 0,
        slotsPerWeek: 0,
        slotsTotal: 0,
        status: 'ACTIVE',
        courses: []
      },
      authorizationHeader: {},
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Môn học mới' : 'Sửa môn học'
    },
    setStatusCols() {
      return this.editedIndex === -1 ? false : true
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
    submit () {
      this.$refs.observer.validate()
      axios
        .put(
          `https://not-fap-be.herokuapp.com/api/major/${this.majorId}`,
          {
            code: this.code,
            name: this.name,
            description: this.description,
            credits: this.credits,
            status: this.status,
            courses: this.courses
          },
          { headers: this.authorizationHeader }
        )
        .then(() => {
          this.courses = []
          this.initialize()
        })
        .catch(err => {
          window.alert(err.response.data.error)
          if (err.response.status === 401)
            this.$router.push('/login')      
        })
    },

    cancel () {
      this.$refs.observer.reset()
      this.$router.push(`/majors`)
    },

    initialize () {
      this.majorId = this.$route.query.m
      this.loading_table = true
      this.authorizationHeader = authHeader()
      axios
        .get(`https://not-fap-be.herokuapp.com/api/major/${this.majorId}`, { headers: this.authorizationHeader })
        .then(res => {
          this.loading_table = false
          const major = res.data.data
          this.courses = major.courses
          this.code = major.code
          this.name = major.name
          this.description = major.description
          this.credits = major.credits
          this.status = major.status
          axios
            .get(`https://not-fap-be.herokuapp.com/api/course`, { headers: this.authorizationHeader })
            .then(res => {
              this.loading_table = false
              this.allCourses = res.data.data
            })
        })
        .catch(err => {
          window.alert(err.response.data.error)
          this.$router.push('/login')      
        })
    },

    editItem (item) {
      this.editedIndex = this.courses.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.courses.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    addItem (item) {
      const newCourse = Object.assign({}, item)
      if (!this.courses.map(ele => ele._id).includes(item._id)) {
        this.courses.push(newCourse)
        this.dialog = false
      } else {
        window.alert(`${item.code} đã có trong danh sách môn học`)
      }
    },

    deleteItemConfirm () {
      this.courses = this.courses.filter(ele => String(ele._id) != String(this.editedItem._id))
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
  },
}

</script>

<style src="./Majors.scss" lang="scss"></style>
