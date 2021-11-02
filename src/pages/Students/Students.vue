
<template>
  <!-- eslint-disable -->
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Quản lý sinh viên</h1>
      <v-row>
        <v-col cols="12">
          <v-card class="student-list mb-1">
            <v-card-title class="pa-6 pb-3">
            </v-card-title>

            <v-data-table
              :headers="headers"
              :items="students"
              sort-by="roleNum"
              :sort-desc="true"
              class="elevation-1 px-5"
              :loading="loading_table"
            >
              <template v-slot:item.status="{ item }">
                <span v-if="item.status === 'STUDYING'">
                  <v-icon size="25" color="green">
                    mdi-check
                  </v-icon>
                </span>
                <span v-else-if="item.status === 'PRESERVED'">
                  <v-icon size="25" color="yellow">
                    mdi-backup-restore
                  </v-icon>
                </span>
                <span v-else-if="item.status === 'DROPPED'">
                  <v-icon size="25" color="red">
                    mdi-close
                  </v-icon>
                </span>
                <span v-else-if="item.status === 'GRADUATED'">
                  <v-icon size="25" color="blue">
                    mdi-check-all
                  </v-icon>
                </span>
              </template>
              <template v-slot:top>
                <v-toolbar
                  flat
                >
                  <v-toolbar-title>Danh sách sinh viên</v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  ></v-divider>

                  <v-spacer></v-spacer>

                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    href="/students/add"
                  >
                    <v-icon size="25" color="white">
                      mdi-plus
                    </v-icon>
                  </v-btn>
                </v-toolbar>
              </template>

              <template v-slot:item.actions="{ item }" class="d-flex justify-center">
                <v-btn icon :href="'/students/edit?m=' + item._id">
                  <v-icon
                    small
                    class="mr-2 justify-center"
                  >
                    mdi-pencil
                  </v-icon>
                </v-btn>
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
import { authHeader } from '../../utils/authHeader'

export default {
  name: 'students',

  data() {
    return {
      loading_table: true,
      headers: [
        { text: 'Role Number', align: 'start', value: 'roleNum' },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Address', value: 'address' },
        { text: 'Passed', value: 'coursesPassed' },
        { text: 'Failed', value: 'coursesFailed' },
        { text: 'Status', value: 'status' },
        { text: 'Sửa', value: 'actions', sortable: false },
      ],
      students: [],
      authorizationHeader: {},
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.loading_table = true
      this.authorizationHeader = authHeader()
      axios
        .get('https://not-fap-be.herokuapp.com/api/student', { headers: this.authorizationHeader })
        .then(res => {
          this.loading_table = false
          this.students = res.data.data
          this.students.map(s => {
            s.major = s.major.code
            s.coursesPassed = s.coursesPassed.length
            s.coursesFailed = s.coursesFailed.length
          })
        })
        .catch(err => {
          window.alert(err.response.data.error)
          this.$router.push('/login')      
        })
    },
  },
}

</script>

<style src="./Students.scss" lang="scss"></style>
