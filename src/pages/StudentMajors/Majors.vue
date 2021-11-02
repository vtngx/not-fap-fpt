
<template>
  <!-- eslint-disable -->
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Danh sách ngành học</h1>
      <v-row>
        <v-col cols="12">
          <v-card class="major-list mb-1">
            <v-card-title class="pa-6 pb-3">
            </v-card-title>

            <v-data-table
              :headers="headers"
              :items="majors"
              sort-by="code"
              class="elevation-1 px-5"
              :loading="loading_table"
            >
              <template v-slot:top>
                <v-dialog v-model="dialog" max-width="700px">
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Danh sách môn học</span>
                    </v-card-title>
        
                    <v-card-text>
                      <v-container>
                          <v-data-table
                            :headers="coursesHeaders"
                            :items="courses"
                            sort-by="code"
                            class="elevation-1 px-5"
                            :loading="loading_table"
                          >
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
              </template>

              <template v-slot:item.actions="{ item }" class="d-flex justify-center">
                <v-icon
                  class="mr-2 justify-center"
                  @click="openMajorCourses(item)"
                >
                  mdi-play
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
import { authHeaderStu } from '../../utils/authHeader'

export default {
  name: 'Majors',

  data() {
    return {
      loading_table: true,
      headers: [
        { text: 'Code', align: 'start', value: 'code' },
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: 'Credits', value: 'credits' },
        { text: 'View Courses', value: 'actions', sortable: false },
      ],
      majors: [],
      courses: [],
      coursesHeaders: [
        { text: 'Code', align: 'start', value: 'code' },
        { text: 'Name', value: 'name' },
        { text: 'Credits', value: 'credits' },
        { text: 'Price (VND)', value: 'price' },
        { text: 'Slots Total', value: 'slotsTotal' },
        { text: 'Slots/Week', value: 'slotsPerWeek' },
      ],
      dialog: false,
      authorizationHeader: {},
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.loading_table = true
      this.authorizationHeader = authHeaderStu()
      axios
        .get('https://not-fap-be.herokuapp.com/api/major', { headers: this.authorizationHeader })
        .then(res => {
          this.loading_table = false
          this.majors = res.data.data
        })
        .catch(err => {
          window.alert(err.response.data.error)
          this.$router.push('/login')      
        })
    },
    openMajorCourses (item) {
      axios
        .get(`https://not-fap-be.herokuapp.com/api/major/${item._id}`, { headers: this.authorizationHeader })
        .then(res => {
          this.dialog = true
          this.courses = res.data.data.courses.filter(c => {
            return c.status === "ACTIVE" && c.deletedAt === null
          })
          this.loading_table = false
        })
        .catch(err => {
          window.alert(err.response.data.error)
          this.$router.push('/login')      
        })
    },
    close () {
      this.dialog = false
      this.courses = []
    },
  },
}

</script>

<style src="./Majors.scss" lang="scss"></style>
