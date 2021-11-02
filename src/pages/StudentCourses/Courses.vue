
<template>
  <!-- eslint-disable -->
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Danh sách môn học</h1>
      <v-row>
        <v-col cols="12">
          <v-card class="course-list mb-1">
            <v-card-title class="pa-6 pb-3">
            </v-card-title>

            <v-data-table
              :headers="headers"
              :items="courses"
              sort-by="code"
              class="elevation-1 px-5"
              :loading="loading_table"
            >
              <template slot="top" slot-scope="props" >
                <v-toolbar
                  flat
                >
                  <v-toolbar-title>Danh sách môn học</v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  ></v-divider>

                  <v-spacer></v-spacer>

                  <div>
                    <v-select
                      placeholder="Major"
                      filled
                      hide-details
                      small
                      clearable
                      :items="majors"
                      item-text="code"
                      item-value="_id"
                      return-object
                      v-model="filter"
                    ></v-select>
                  </div>
                </v-toolbar>
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
  name: 'Courses',
  data() {
    return {
      loading_table: true,
      headers: [
        { text: 'Code', align: 'start', value: 'code' },
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: 'Credits', value: 'credits' },
        { text: 'Price', value: 'price' },
        { text: 'Min Mark', value: 'minMarkToPass' },
        { text: 'Slots Total', value: 'slotsTotal' },
        { text: 'Slots/Week', value: 'slotsPerWeek' },
      ],
      courses: [],
      majors: [],
      allMajors: [],
      filter: '',
      authorizationHeader: {},
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.filter = ''
      this.loading_table = true
      this.authorizationHeader = authHeaderStu()
      axios
        .get('https://not-fap-be.herokuapp.com/api/course', { headers: this.authorizationHeader })
        .then(res => {
          this.loading_table = false
          this.courses = res.data.data
          axios
            .get('https://not-fap-be.herokuapp.com/api/major', { headers: this.authorizationHeader })
            .then(res => {
              this,this.allMajors = res.data.data
              this.majors = res.data.data.map(e => {
                return {
                  code: e.code,
                  _id: e._id
                }
              })
            })
            .catch(err => {
              window.alert(err.response.data.error)
              this.$router.push('/login')      
            })
        })
        .catch(err => {
          window.alert(err.response.data.error)
          this.$router.push('/login')      
        })
    },
  },

  watch: {
    filter (selected) {
      if (selected) {
        const majorCourses = this.allMajors
          .find(e => e._id === selected._id).courses
        this.courses = this.courses
          .filter(c => majorCourses.includes(c._id))
      }
    }
  }
}

</script>

<style src="./Courses.scss" lang="scss"></style>
