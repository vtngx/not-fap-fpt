<template>
  <v-app>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="7" class="main-part d-none d-md-none d-lg-flex">
          <div class="d-flex">
            <v-img src="@/assets/logo.svg" contain></v-img>
            <p>NotFPT Academic Portal</p>
          </div>
        </v-col>
        
        <v-col cols="12" lg="5" class="login-part d-flex align-center justify-center">
          <v-row no-gutters class="align-start">
            <v-col cols="12" class="login-part d-flex align-center justify-center flex-column">
              <div class="login-wrapper pt-md-4 pt-0">
                <v-tabs grow>
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab :href="`#tab-login-student`">
                    STUDENT
                  </v-tab>
                  <v-tab :href="`#tab-login-admin`">
                    ADMIN
                  </v-tab>

                  <v-tab-item :value="'tab-login-student'" >
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">
                          <!-- <v-col> -->
                            <!-- <p class="login-slogan display-2 text-center font-weight-medium my-10">Good Morning, User</p> -->

                            <!-- <v-btn height="45" block color="white" elevation="0" class="google text-capitalize my-10">
                              <v-img src="@/assets/google.svg" max-width="30" class="mr-4"></v-img>
                              Sign in with Google</v-btn>
                          </v-col>

                          <v-col cols="12" class="d-flex align-center my-1">
                            <v-divider></v-divider>
                            <span class="px-5"> or </span>
                            <v-divider></v-divider>
                          </v-col> -->

                          <v-form class="align-center my-5">
                            <v-col>
                              <v-text-field
                                  v-model="email"
                                  :rules="emailRules"
                                  label="Email Address"
                                  required
                              ></v-text-field>
                              <v-text-field
                                  v-model="password"
                                  :rules="passRules"
                                  type="password"
                                  label="Password"
                                  required
                              ></v-text-field>

                            </v-col>
                            <v-col class="d-flex justify-space-between">
                              <v-btn
                                  class="text-capitalize"
                                  block
                                  :disabled="password.length === 0 || email.length === 0"
                                  color="primary"
                                  @click="login"
                              >
                                Login</v-btn>
                            </v-col>
                          </v-form>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>

                  <v-tab-item :value="'tab-login-admin'" >

                    <v-form>
                      <v-container>
                        <v-row class="flex-column">

                          <!-- <v-col>
                            <p class="login-slogan display-2 text-center font-weight-medium mt-10">Welcome!</p>
                            <p class="login-slogan display-1 text-center font-weight-medium mb-10">Create your account</p>
                          </v-col> -->

                          <!-- <v-btn height="45" block color="white" elevation="0" class="google text-capitalize my-10">
                            <v-img src="@/assets/google.svg" max-width="30" class="mr-4"></v-img>
                            Sign in with Google
                          </v-btn>

                          <v-col cols="12" class="d-flex align-center my-1">
                            <v-divider></v-divider>
                            <span class="px-5"> or </span>
                            <v-divider></v-divider>
                          </v-col> -->

                          <v-form class="align-center my-5">
                            <v-col>
                              <v-text-field
                                  v-model="emailAdmin"
                                  :rules="emailRules"
                                  label="Email Address"
                                  required
                              ></v-text-field>
                              <v-text-field
                                  v-model="passwordAdmin"
                                  :rules="passRules"
                                  type="password"
                                  label="Password"
                                  hint="At least 6 characters"
                                  required
                              ></v-text-field>
                            </v-col>
                            <v-col class="d-flex justify-space-between">
                              <v-btn
                                  class="text-capitalize"
                                  block
                                  :disabled="passwordAdmin.length === 0 || emailAdmin.length === 0"
                                  color="primary"
                                  @click="loginAdmin"
                              >
                                Login</v-btn>
                            </v-col>
                          </v-form>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>

                </v-tabs>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Login',
    data() {
      return {
        position: 'top-center',
        email: '',
        emailRules: [
          v => !!v || 'Email is required',
          v => /.+@.+/.test(v) || 'Email must be valid',
        ],
        emailAdmin: '',
        passwordAdmin: '',
        password: '',
        passRules: [
          v => !!v || 'Password is required',
          v => v.length >= 3 || 'Min 3 characters'
        ]
      }
    },
    methods: {
      resetField(field) {
        field = ''
        return field
      },
      login() {
        window.alert(`${this.email} : ${this.password}`)
        // window.localStorage.setItem('authenticated', true);
        // this.$router.push('/dashboard');
      },
      loginAdmin() {
        axios.post('https://not-fap-be.herokuapp.com/api/auth/login-ad', {
          email: this.emailAdmin,
          password: this.passwordAdmin
        })
        .then(function(res) {
            window.localStorage.setItem('token', res.data.token);
            this.addSuccessNotification()
            this.$router.push('/dashboard');
          }.bind(this)
        )
        .catch(e => {
          const { error } = e.response.data
          this.addErrorNotification(error)
          this.emailAdmin = ''
          this.passwordAdmin = ''
        })
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
          icon: true
        });
      },
      addSuccessNotification() {
        this.$toast.success("Login Successfully", {
          position: this.position,
          timeout: 6000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true
        });
      },
    },
    created() {
      if (window.localStorage.getItem('token')) {
        this.$router.push('/dashboard');
      }
    }
  }

</script>

<style src="./Login.scss" lang="scss"/>
