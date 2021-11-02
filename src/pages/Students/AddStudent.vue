
<template>
  <!-- eslint-disable -->
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Tạo sinh viên mới</h1>
      <v-row>
        <v-col cols="12">
          <v-card class="student-list mb-1 px-15 py-10">
            <div class="mb-10">
              <validation-observer
                ref="observer"
                v-slot="{ invalid }"
              >
                <form @submit.prevent="submit">
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
                    name="Major"
                    rules="required"
                  >
                    <v-select
                      v-model="major"
                      :items="allMajorItems"
                      :error-messages="errors"
                      label="Major"
                      data-vv-name="major"
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
import {authHeader} from '../../utils/authHeader'
import { required, max, min, digits, regex } from 'vee-validate/dist/rules'
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
      name: '',
      phone: '',
      address: '',
      allMajors: [],
      allMajorItems: [],
      major: '',
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
      authorizationHeader: {},
    }
  },

  created () {
    this.initialize()
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Môn học mới' : 'Sửa môn học'
    },
  },

  methods: {
    submit () {
      this.$refs.observer.validate()
      const majorId = this.allMajors.find(m => m.slug === this.major)._id
      axios
        .post(
          `https://not-fap-be.herokuapp.com/api/student`,
          {
            name: this.name,
            phone: this.phone,
            address: this.address,
            major: majorId
          },
          { headers: this.authorizationHeader }
        )
        .then(() => {
          this.$router.push('/students')
        })
        .catch(err => {
          window.alert(err.response.data.error)
          if (err.response.status === 401)
            this.$router.push('/login')      
        })
    },

    cancel () {
      this.$refs.observer.reset()
      this.$router.push(`/students`)
    },

    initialize () {
      this.authorizationHeader = authHeader()
      axios
        .get(`https://not-fap-be.herokuapp.com/api/major`, { headers: this.authorizationHeader })
        .then(res => {
          this.allMajors = res.data.data.map(m => {
            return {
              ...m,
              slug: `${m.code} (${m.name})`
            }
          })
          this.allMajorItems = res.data.data.map(m => `${m.code} (${m.name})`)
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
