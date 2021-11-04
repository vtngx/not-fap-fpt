<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Home</h1>
      </v-row>

      <v-row>
        <v-col lg="6" sm="6" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3 mx-3">
              <v-icon size="23" color="success" class="mr-2"> mdi-chart-areaspline </v-icon>
              <p>My Progress</p>
              <v-spacer></v-spacer>
            </v-card-title>

            <div
              class="text-center my-15 pb-15"
              v-if="loading_progress === true"
            >
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>

            <v-card-text class="pa-6 pt-0" v-if="loading_progress === false">
              <v-row no-gutters>
                <v-col cols="6" class="my-10 text-right">
                  <span class="" style="font-size: 50px"
                    >{{ failed }}/{{ total }}</span
                  >
                </v-col>
                <v-col cols="6" class="my-10 text-center">
                  <span class="" style="font-size: 24px">{{ progress }}%</span>
                </v-col>
              </v-row>

              <v-row no-gutters class="justify-space-between mx-10">
                <div>
                  <div class="subtext">
                    {{ passed }}
                    <v-icon color="success"> mdi-check</v-icon>
                  </div>
                  <div class="subtext-index">Passed</div>
                </div>
                <div>
                  <div class="subtext">
                    {{ failed }}
                    <v-icon color="red"> mdi-close</v-icon>
                  </div>
                  <div class="subtext-index">Failed</div>
                </div>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col lg="6" sm="6" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3 mx-3">
              <v-icon size="25" color="success" class="mr-2">
                mdi-account-outline
              </v-icon>
              <p>Profile</p>
              <v-spacer></v-spacer>
            </v-card-title>

            <div
              class="text-center my-15 pb-15"
              v-if="loading_progress === true"
            >
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>

            <v-card-text v-if="loading_progress === false">
              <v-row no-gutters class="justify-space-between mx-6 my-2 pt-1">
                <v-col cols="8">
                  <div class="subtext-index">Name</div>
                  <div class="subtext">{{ name }}</div>
                </v-col>
                <v-col cols="4">
                  <div class="subtext-index">Role Num.</div>
                  <div class="subtext">{{ roleNum }}</div>
                </v-col>
              </v-row>
              <v-row no-gutters class="justify-space-between mx-6 my-2">
                <v-col cols="8">
                  <div class="subtext-index">Email</div>
                  <div class="subtext">{{ email }}</div>
                </v-col>
                <v-col cols="4">
                  <div class="subtext-index">Phone</div>
                  <div class="subtext">{{ phone }}</div>
                </v-col>
              </v-row>
              <v-row no-gutters class="justify-space-between mx-6 my-2">
                <v-col cols="8">
                  <div class="subtext-index">Major</div>
                  <div class="subtext">{{ major }}</div>
                </v-col>
                <v-col cols="4">
                  <div class="subtext-index">Status</div>
                  <div class="subtext">{{ status }}</div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- <v-col cols="12">
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-6 pb-0">
              <p>Studying Courses</p>
              <v-spacer></v-spacer>
            </v-card-title>

            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-2">
                    <tr>
                      <th class="text-left pa-6">MSSV</th>
                      <th class="text-left">TYPE</th>
                      <th class="text-left">CONTENT</th>
                      <th class="text-left">DATE</th>
                      <th class="text-left">STATUS</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="item in mock.table" :key="item.id">
                      <td class="pa-6">{{ item.code }}</td>
                      <td>{{ item.type }}</td>
                      <td>{{ item.content }}</td>
                      <td>{{ item.date }}</td>
                      <td v-if="item.status === 'APPROVED'">
                        <v-chip link color="success" class="ma-2 ml-0">
                          <v-icon size="25" color="white"> mdi-check </v-icon>
                        </v-chip>
                      </td>
                      <td v-else-if="item.status === 'PENDING'">
                        <v-chip link color="warning" class="ma-2 ml-0">
                          <v-icon size="25" color="white">
                            mdi-dots-horizontal
                          </v-icon>
                        </v-chip>
                        <v-menu>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on">
                              <v-icon color="textColor"
                                >mdi-dots-vertical</v-icon
                              >
                            </v-btn>
                          </template>
                          <v-list>
                            <v-list-item
                              v-for="(item, i) in menu"
                              :key="i"
                              @click="() => {}"
                            >
                              <v-list-item-title>{{ item }}</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </td>
                      <td v-else-if="item.status === 'REJECTED'">
                        <v-chip link color="secondary" class="ma-2 ml-0">
                          <v-icon size="25" color="white"> mdi-close </v-icon>
                        </v-chip>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col> -->
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import mock from "./mock";
import { authHeaderStu } from "../../utils/authHeader";

export default {
  name: "Dashboard",
  data() {
    return {
      loading_progress: true,
      position: "top-center",
      authorizationHeader: {},
      mock,
      menu: ["Duyệt", "Từ chối"],
      progress: 0,
      total: 0,
      passed: 0,
      failed: 0,

      roleNum: '',
      name: '',
      email: '',
      phone: '',
      major: '',
      status: '',
    };
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.authorizationHeader = authHeaderStu();
      axios
        .get("https://not-fap-be.herokuapp.com/api/student/me/progress", {
          headers: this.authorizationHeader,
        })
        .then(res => {
          const progress = res.data.data;
          this.progress = progress.progress;
          this.total = progress.total;
          this.passed = progress.passed;
          this.failed = progress.failed;

          axios
            .get("https://not-fap-be.herokuapp.com/api/student/me", {
              headers: this.authorizationHeader,
            })
            .then(res => {
              const me = res.data.data[0]
              this.roleNum = me.roleNum
              this.name = me.name
              this.email = me.email
              this.phone = me.phone
              this.major = `${me.major.code} (${me.major.name})`
              this.status = me.status
              this.loading_progress = false;
            })
        })
        .catch((err) => {
          this.addErrorNotification(err.response.data.error);
          this.$router.push("/login");
        });
    },
    getRandomDataForTrends() {
      const arr = [];
      for (let i = 0; i < 12; i += 1) {
        arr.push(Math.random().toFixed(1) * 10);
      }
      return arr;
    },
    generatePieSeries() {
      let series = [];

      for (let i = 0; i < 4; i++) {
        let y = Math.floor(Math.random() * (500 - 100 + 100)) + 100;
        series.push(y);
      }
      return series;
    },
    getRandomInt(min, max) {
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    },
    addErrorNotification(msg) {
      this.$toast.error(msg, {
        position: this.position,
        timeout: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
      });
    },
    addSuccessNotification() {
      this.$toast.success("Login Successfully", {
        position: this.position,
        timeout: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
      });
    },
  },
};
</script>

<style src="./StudentHome.scss" lang="scss" />
