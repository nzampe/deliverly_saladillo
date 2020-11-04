<template>
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="currentPage"
              class="my-4"
              color="primary"
              :length="total"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
    model: {
        prop: 'currentPage',
        event: 'change'
    },

    props: {
        tipoListado:String,
        pageCount: {
            type: Number,
            default: 1
        },

        currentPage: {
            type: Number,
            default: 1
        },
        total:{
            type:Number,
            default: 0,
        },
    },
    data() {
        return {
            inicioBloque:0,
            finBloque:10,
            page: ''
        }
    },

    mounted() {
        console.log(this.currentPage)
        this.page = this.currentPage
    },

    methods: {
        change(page) {
            if (this.pageInRange(page)) {
                this.$emit('change', page);
            }
        },

        isFirstPage() {
            return this.currentPage == 1;
        },

        isLastPage() {
            return this.currentPage == this.pageCount;
        },


        pageInRange(page) {
            return (page > 0) && (page <= this.pageCount);
        },
        isInBloque(page){
            return (page > this.inicioBloque) && (page <= this.finBloque)
        },
        back(){
            if(!this.isFirstPage(this.inicioBloque) && (this.currentPage - 1) == this.inicioBloque){
                this.inicioBloque = this.inicioBloque -10;
                this.finBloque = this.finBloque -10;
            }
            this.change(this.currentPage - 1);

        },

        next(){
            if(!this.isLastPage(this.finBloque) && this.currentPage == this.finBloque){
                this.inicioBloque = this.inicioBloque +10;
                this.finBloque = this.finBloque +10;
            }
            this.change(this.currentPage + 1);

        },
        first(){
            this.inicioBloque = 0;
            this.finBloque = 10;
            this.change(1)   
        },
        last(){
            this.inicioBloque = this.pageCount - 10;
            this.finBloque = this.pageCount;
            this.change(this.pageCount)
        }
    },
}
</script>

<style scoped>
/* span {
  margin-right: 15px;
}
.pagination li {
  padding-bottom: 35px;
  border: 1px solid #00838f ;
} */
</style>

