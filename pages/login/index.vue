<template>
  <v-row no-gutters align="stretch" style="height: 100%">
    <v-col cols="5">
      <v-img
        src="https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ"
        min-height="100%"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"></v-img>
    </v-col>

    <v-col cols="7" class="d-flex align-center">

      <v-card tile flat class="auth-box">
        <v-card-title>
          <h1>Авторизация</h1>
        </v-card-title>
        <v-card-text>
          <p>
            Добро пожаловать, <br>
            Пожалуйста войдите в аккаунт.
          </p>

          <p>
            Не зарегистированы? <nuxt-link to="/registration">Зарегистрироваться</nuxt-link>
          </p>

          <v-divider></v-divider>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="email" :rules="[rules.required, rules.email]" label="Введите e-mail" name="EMAIL" required></v-text-field>

            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="showPassword ? 'text' : 'password'"
              name="PASSWORD"
              label="Введите пароль"
              hint="Не меньше 8 символов"
              counter
              @click:append="showPassword = !showPassword"
              required
            ></v-text-field>

            <v-btn :disabled="!valid" color="primary" @click="submit">Войти</v-btn>
          </v-form>
        </v-card-text>
      </v-card>

    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'empty',
  data: () => ({
    showPassword: false,
    valid: true,
    email: '',
    password: '',
    rules: {
      required: value => !!value || 'Заполните поле.',
      min: v => v.length >= 8 || 'Минимум 8 символов',
      email: v => /.+@.+/.test(v) || 'Введите e-mail'
    },
  }),
  methods: {
    submit() {
      this.$refs.form.validate()
    }
  }
}
</script>

