<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Home</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              href="/s/profile"
              color="secondary"
              class="text-capitalize button-shadow mr-1"
              >Profile</v-btn
            >
          </template>
        </v-menu>
      </v-row>

      <v-row>
        <v-col lg="6" sm="6" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <v-icon size="28" color="green">
                mdi-circle-small
              </v-icon>
              <p>Classes Today</p>
              <v-spacer></v-spacer>
            </v-card-title>
            
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters>
                <v-col cols="6" class="my-auto">
                  <span class="" style="font-size: 42px">199</span>
                </v-col>
                <v-col cols="6">
                  <ApexChart
                    height="100"
                    type="bar"
                    v-if="apexLoading"
                    :options="mock.apexBar1.options"
                    :series="mock.apexBar1.series"
                  ></ApexChart>
                </v-col>
              </v-row>

              <v-row no-gutters class="justify-space-between">
                <div>
                  <div class="subtext">
                    33 <v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Registrations</div>
                </div>
                <div>
                  <div class="subtext">
                    3.25%<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Bounce Rate</div>
                </div>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col lg="6" sm="6" cols="12">
          <v-card class="mx-1 mb-1">
            <!-- <v-card-title class="pa-6 pb-3">
              <v-icon size="28" color="green">
                mdi-circle-small
              </v-icon>
              <p>Sinh viên</p>
              <v-spacer></v-spacer>
            </v-card-title>

            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters>
                <v-col cols="7" class="my-auto">
                  <span class="" style="font-size: 42px">121</span>
                </v-col>
                <v-col cols="5">
                  <ApexChart
                    height="100"
                    type="bar"
                    v-if="apexLoading"
                    :options="mock.apexBar2.options"
                    :series="mock.apexBar2.series"
                  ></ApexChart>
                </v-col>
              </v-row>
              
              <v-row no-gutters class="justify-space-between">
                <div>
                  <div class="subtext">
                    15<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Registrations</div>
                </div>
                <div>
                  <div class="subtext">
                    3.01%<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Bounce Rate</div>
                </div>
                <div>
                  <div class="subtext">
                    302<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Views</div>
                </div>
              </v-row>
            </v-card-text> -->
          </v-card>
        </v-col>
        
        <v-col cols="12">
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
                          <v-icon size="25" color="white">
                            mdi-check
                          </v-icon>
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
                              <v-icon color="textColor">mdi-dots-vertical</v-icon>
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
                          <v-icon size="25" color="white">
                            mdi-close
                          </v-icon>
                        </v-chip>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import mock from "./mock";
// import Trend from "vuetrend";
import ApexChart from "vue-apexcharts";

export default {
  name: "Dashboard",
  components: {
    // Trend,
    ApexChart,
  },
  data() {
    return {
      mock,
      apexLoading: false,
      value: this.getRandomInt(10, 90),
      value2: this.getRandomInt(10, 90),
      mainApexAreaSelect: "Daily",
      menu: [
        "Duyệt", "Từ chối"
      ]
    };
  },
  methods: {
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
  },
  mounted() {
    setTimeout(() => {
      this.apexLoading = true;
    });
  },
};
</script>

<style src="./StudentHome.scss" lang="scss"/>
