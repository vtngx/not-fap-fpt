
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
                    name="Major"
                    rules="required"
                  >
                    <v-text-field
                      v-model="major"
                      :error-messages="errors"
                      label="Major"
                      required
                      disabled
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Role Number"
                    rules="required"
                  >
                    <v-text-field
                      v-model="roleNum"
                      :error-messages="errors"
                      label="Role Number"
                      required
                      disabled
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Email"
                    rules="required"
                  >
                    <v-text-field
                      v-model="email"
                      :error-messages="errors"
                      label="Email"
                      required
                      disabled
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
                    name="Phone"
                    :rules="{
                      required: true,
                      digits: 10,
                      regex: /^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
                    }"
                  >
                    <v-text-field
                      v-model="phone"
                      :error-messages="errors"
                      label="Phone"
                      required
                      pattern="^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$"
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Address"
                    rules="required|max:200"
                  >
                    <v-text-field
                      v-model="address"
                      :error-messages="errors"
                      label="Address"
                      required
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Status"
                    rules="required"
                  >
                    <v-select
                      v-model="status"
                      :error-messages="errors"
                      label="Status"
                      data-vv-name="status"
                      :items="statusItems"
                      :value="status"
                      required
                    ></v-select>
                  </validation-provider>

                  <div class="mt-10">
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
                  </div>
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
import { authHeader } from '../../utils/authHeader'
import { required, max, min, integer, digits, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('digits', {
  ...digits,
  message: '{_field_} needs to be {length} digits.',
})

extend('regex', {
  ...regex,
  message: '{_field_} must be Vietnamese phone format',
})

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
      code: '',
      roleNum: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      major: '',
      status: '',
      studentId: '',
      statusItems: [
        'STUDYING',
        'GRADUATED',
        'PRESERVED',
        'DROPPED'
      ],
      loading_table: true,
      authorizationHeader: {},
      position: 'bottom-right',
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    submit () {
      this.$refs.observer.validate()
      axios
        .put(
          `https://not-fap-be.herokuapp.com/api/student/${this.studentId}`,
          {
            name: this.name,
            phone: this.phone,
            address: this.address,
            status: this.status,
          },
          { headers: this.authorizationHeader }
        )
        .then(() => {
          this.addSuccessNotification()
          this.initialize()
        })
        .catch(err => {
          this.addErrorNotification(err.response.data.error)
          if (err.response.status === 401)
            this.$router.push('/login')      
        })
    },
    cancel () {
      this.$refs.observer.reset()
      this.$router.push(`/students`)
    },
    initialize () {
      this.studentId = this.$route.query.m
      this.loading_table = true
      this.authorizationHeader = authHeader()
      axios
        .get(`https://not-fap-be.herokuapp.com/api/student/${this.studentId}`, { headers: this.authorizationHeader })
        .then(res => {
          this.loading_table = false
          const student = res.data.data
          this.code = student.code
          this.roleNum = student.roleNum
          this.name = student.name
          this.email = student.email
          this.phone = student.phone
          this.address = student.address
          this.status = student.status
          this.major = `${student.major.code} (${student.major.name})`
        })
        .catch(err => {
          window.alert(err.response.data.error)
          this.$router.push('/login')      
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
      this.$toast.success("Update Student Successfully", {
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
  },
}

</script>

<style src="./Students.scss" lang="scss"></style>
