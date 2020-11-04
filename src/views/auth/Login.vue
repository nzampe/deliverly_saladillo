<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
                <v-window>
                    <v-window-item :value="1">
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-card-text class="mt-4">
                                    <h1 class="text-center display-1">Login</h1>
                                    <v-form>
                                        <v-text-field
                                            v-model="form.username"
                                            label="Email"
                                            prepend-icon="email"
                                            type="text"
                                            color="#3ab6fe"
                                            autofocus
                                        >
                                        </v-text-field>
                                        <v-text-field
                                            v-model="form.password"
                                            label="Contraseña"
                                            prepend-icon="lock"
                                            type="password"
                                            color="#3ab6fe"
                                        >
                                        </v-text-field>
                                    </v-form>
                                </v-card-text>
                                <div class="text-center">
                                    <v-btn rounded color="#3ab6fe" dark @click="login()">Entrar</v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-window-item>
                </v-window>
            </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>

  export default {
      name: 'Login',

    data: () => ({
        form: {
            username: '',
            password: ''
        }
    }),

    methods: {
        login(){
            this.$store.dispatch('retriveToken',{
                username:this.form.username,
                password:this.form.password
            })
            .then((response)=>{
                console.log(response.data)
                this.$router.push('/')
            })
        }
    }
  }
</script>

<style scoped>
h1{
    color: #3ab6fe;
}
</style>