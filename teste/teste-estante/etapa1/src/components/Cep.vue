<template>
 <div class="row">
   <form action="#" class="col-md-12">
     <h1>{{ msg }}</h1>

      <b-form-group
      label="<strong>CEP</strong>"
      >
      <p class="erro" v-show="listaNaoEncontrada">
        Seu endereço não foi encontrado. <br />
        Cadastre manualmente.
      </p>
      <div class="boxCep">
        <input id="cep" type="text" v-mask="'#####-###'" v-model="cep" v-on:keyup="busca"  maxlength="9" placeholder="Digite seu CEP">
        <a href="http://www.buscacep.correios.com.br/sistemas/buscacep/">Não sei o CEP</a>
      </div>
      
      
      <input id="endereco" text=text v-model="endereco.logradouro">
      <input id="localidade" text=text v-model="endereco.localidade">
      <input id="bairro" text=text v-model="endereco.bairro">      
      <input id="complemento" type="text" v-model="endereco.complemento">
      <input id="uf" text=text v-model="endereco.uf">      

      <button type="button" @click="addLista">Cadastrar</button>
      
      </b-form-group>

      <ul v-if="lista.length" class="listaCadastro">
        <li v-for="todo in lista">          
          {{ todo.text }}
        </li>        
      </ul>
      <p v-else>Não existe lista cadastrada!</p>
      

   </form>
   


    
 </div>
</template>

<script>
export default {
  
  data() {    
    return {
      msg: "Etapa 1",      
      cep: '',      
      endereco: {},
      lista: [],
      listaNaoEncontrada: false

    };
  },

  
  methods: {
    
    busca: function(){
      const self = this;
      self.endereco = {};
      
      if(/^[0-9]{5}-[0-9]{3}$/.test(this.cep)){
        jQuery.getJSON("https://viacep.com.br/ws/" + this.cep + "/json/", function(endereco){
          self.endereco = endereco;
          $("input").css("display", "block");
          $("input").attr('disabled', true);
          $("#complemento").attr('disabled', false);
          $("#complemento").focus();          
          $("#cep").attr('disabled', false);
          self.listaNaoEncontrada = false;
          if(endereco.erro){
            $("input").attr('disabled', false);
            $("#cep").focus();            
            self.listaNaoEncontrada = true;
            return;
          };
          
        });
      }
    },
     addLista() {
      this.lista.push(
        { text: this.cep },
        { text: this.endereco.logradouro },
        { text: this.endereco.localidade },
        { text: this.endereco.bairro },
        { text: this.endereco.complemento },
        { text: this.endereco.uf }
      );
      
      
    },
  },
  mounted() {    
    if (localStorage.getItem('lista')) this.lista = JSON.parse(localStorage.getItem('lista'));
  },
  watch: {
    lista: {
      handler() {
        console.log('lista cadastrada', localStorage);
        localStorage.setItem('lista', JSON.stringify(this.lista));
      },
      deep: true,
    },
  },
};
</script>

<style>
#app {
  width: 30%;
  margin: 0 auto;
}
</style>


<style scoped>
h1 {
  font-size: 30px;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.listaCadastro li {
 border-bottom: 1px solid #dbdbdb;
 padding: 10px 0 10px;
}

input[type=text]{outline:none}
input {
  display: none;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  padding: 5px 10px 5px;
}
#cep {
  display: block;
}

button {
  margin-top: 20px;
  border: 1px solid #999999;
  background: none;
  color: black;
  border-radius: 20px;
  padding: 10px 50px 10px 50px;
}
button:hover {
  background: black;
  color: white;
}
.boxCep {
  display: flex;
  align-items: center;
}
.boxCep a {
  margin-left: 10px;
  text-decoration: none;
  color: #909090;
}
.boxCep a:hover {  
  text-decoration: underline;
  color: #222222;
}
.erro {
  font-size: 12px;
  color: red;
}
</style>
