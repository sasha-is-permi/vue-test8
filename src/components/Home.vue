<template> 
<div>

   
    <section class="section-program">
        <div class="container cont-program">
            <div class="row">
                <div class=" col content-program">
                    <div class="cont-program-text" id="program-text">
                        <h1 id="h1">Блок телепрограмм Пермского телевидения</h1>
                    </div>

                </div>
            </div>
            <div class="row">
    
                    <div class="cont-form-search">
                        <form class="form-search ">
                            <div class="input-group mt-3">
                                <span class="input-group-text" id=search>
                                    <img src="../assets/icon-search.svg"/>
                                </span>
                                <input v-model="channel" id="search" type="text" name="search" placeholder="Поиск в описании канала" class="form-control">
                                <!-- Показываем крестик только если что-то введено кроме пробелов
                                  При клике на крестик поле ввода очищается -->
                                <span v-show="channel.trim() !== ''"   @click="channel=''" class="input-group-text" id="close">
                                    <img src="../assets/icon-close.svg"/>
                                </span>
                            </div>
                        </form>
                    </div>
               
            </div>


  
            <div class="row">
                      <div class="accordion">
                        <div class="accordion-item" v-for="(channel,index) in channels1" :key="index">
                            <input class="accordion-item-input" type="checkbox" :id="'accordion-'+channel.index"/>
                            <label class="accordion-item-triger" :for="'accordion-'+channel.index">
                                <div class="accordion-block">
                                     <div class="accordion-block-text">
                                     
                                      <div class="row">                           
                                        <div class="accordion-icon-arrow col-md-1" @click="showProgram(channel)">
                                            <img src="../assets/icon-down-arrow.svg"/>
                                        </div>
                                         <div class="accordion-text-h col-md-1 " @click="showProgram(channel)" >
                                            <h3>{{channel.button}}</h3>
                                        </div>                                       
                                        <div class="accordion-text-h col-md-3">
                                            <h3 @click="showProgram(channel)" >{{channel.alias}}</h3>
                                            <a :href="channel.url" class="a">    {{channel.url}} </a>
                                        </div>
                                    
                                        <div class="accordion-text-p col-md-7" @click="showProgram(channel)">
                                            <p>{{channel.description}}</p>
                                        </div>       

                                     </div>

                                     </div>

                                </div>

                            </label>
     
                        </div>
     

                    </div>

            </div>





        </div>
    </section>


<div v-if="programVisible">

  <div class="modalDialog">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Телепрограмма канала  {{programName}} </h5>
        <button type="button" class="btn-close"  aria-label="Закрыть" @click="closeProgram()" ></button>
      </div>
      <div class="modal-body">
          <div>
             {{xvid}} 
          </div>    
          <div v-for= "(program,index) in programs1" :key="index">
              <p>   {{program.start}}  &nbsp; {{program.title}} </p> 
              <p>   {{program.desc}} </p>
          </div>      
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary"  @click="closeProgram()">Закрыть</button>
      </div>
    </div>
  </div>
</div>

</div>


</div>
</template>


<script>
   export default{
     data(){
         return{
             channel:"",
             programVisible:false,
             programName:"",
             xvid:""
            
         }
     },
                
              computed: {        
                  // Фильтр поиск в описании канала - по введенному значению в строке поиска   
              channels1() {
                  let channels2 = this.channels;
                
                  channels2 = channels2.filter(item => {
                  return item.description.toUpperCase().indexOf(this.channel.toUpperCase())!==-1;
                    })

                 
                    return channels2;
            },
            // получаем весь массив объектов channels из store/channels
            channels() {
                    return this.$store.getters.channels
            },
             programs1(){
             
               let p1=this.$store.getters.programs
               console.log("p1:",p1)
               if (p1.length===0) {this.programText=""}
                else {               
               let keys = Object.keys(p1);

               let val=[]

               for (let i = 0; i < keys.length; i++) {
                val = p1[keys[i]];    
               }


               return val

                } }

            },
            methods: {
              showProgram(channel){
               this.$store.dispatch('programs',channel.xvid)
               
                this.programName=channel.alias;   
             
               this.programVisible=true;

              },
              closeProgram(){
                 this.programVisible=false;
            },


               setData() {
          // Загружаем из базы данных в channels все каналы
                this.$store.dispatch('channels')
     
       
            }
                        },
        created() {
             this.setData();
        },            
                
   }
</script>


   

<style scoped>

.cont-program-text{
    width:100vw;
}

.cont-form-search{
    margin-bottom:20px;
}

#h1{
    font-size:20px;
    text-align:center;
}

.a{
   text-decoration: underline;
}

.modalDialog{
  margin: auto;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
}


.content-program {
    
    display: flex;
    margin-top: 2rem;
    justify-content: space-between;
}
.cont-program-text h2 {
    font-size: 22px;
    margin-bottom: 0;
    
}
.cont-management {
    display: flex;
}
.cont-bookmark {
    border: 1px solid #BFC9E0;
    border-radius: 50px;
}

.cont-bookmark img {
    padding: 8px 10px;
    
}
.cont-bookmark:hover {
    cursor: pointer;
    box-shadow: 0px 3px 3px rgb(0, 0, 0, 20%);
    transition-duration: 0.3s;
}
.cont-new-type {
    display: flex;
    border: 1px solid #BFC9E0;
    border-radius: 20px;
}
.cont-new-program {
    display: flex;
    border: 1px solid #BFC9E0;
    border-radius: 20px;
}

.cont-new-type:hover {
    cursor: pointer;
    box-shadow: 0px 3px 3px rgb(0, 0, 0, 20%);
    transition-duration: 0.3s;
}
.cont-new-program:hover {
    cursor: pointer;
    box-shadow: 0px 3px 3px rgb(0, 0, 0, 20%);
    transition-duration: 0.3s;
}
.new-type-text p, .new-program-text p {
    margin-bottom: 0;
    padding-right: 20px;
}
.paragraph-indent {
    margin-left: 30px;
}


.plus {
    padding: 0 10px 0 10px;
}



#search {
    border: none;
}

.input-group-text {
    background-color: #fff;
    border: none;
    
}
.input-group-text:first-child {
    padding-left: 0;
}
.input-group {
    border-bottom: 1px solid #BFC9E0;
}

.accordion-button::after {
    
    background-image: url(../assets/icon-down-arrow.svg);
    
    
    
}
.accordion-item h2 {
    order: 2;
}
.accordion-button:not(.collapsed)::after {
    background-image: url(../assets/icon-up-arrow.svg);
    
}









.accordion {
    width: 80vw;
    margin: 0 auto;
}
.accordion-item {
    position: relative;
    margin-bottom: 20px;
}
.accordion-item-input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}
.accordion-item-triger {
    display: block;
    padding: 20px;
    border: 1px solid #BFC9E0;
   
}
.accordion-item-content {
    padding: 20px;
    border: 1px solid #BFC9E0;
    border-top: none;
    display: none;

}

.accordion-item-input:checked ~ .accordion-item-content{
    display: block;
}



.accordion-block {
    display: flex;
    justify-content: space-between;
    vertical-align: middle;
}
.accordion-block-text {
    display: flex;
}
.accordion-block-icon {
    display: flex;
}
.accordion-text-h h3{
    font-size: 15px;
    font-weight: 500;
    text-align: left;

}




.accordion-text-p {
   font-size: 15px;
    font-weight: 400;
    text-align: left;
}
.accordion-icon-arrow img {
    margin-bottom: 8px;
    margin-right: 10px;
}
.accordion-icon-circle img {
    margin-bottom: 8px;
    margin-left: 10px;
    margin-right: 10px;
}
.accordion-icon-manager img {
    margin-bottom: 8px;
    margin-left: 20px;
}

.accordion-icon-manager img:hover {
    cursor: pointer;
}
.accordion-item-block {
    display: flex;
    justify-content: space-between;
}
.accordion-item-block-text {
    display: flex;
}
.accordion-icon-elipse img {
    margin-left: 20px;
   
    margin-bottom: 10px;
}
.accordion-item-h h4 {
    font-size: 13px;
    font-weight: 400;
}
.accordion-text-pink p {
    font-size: 12px;
    font-weight: 400;
    color: #FF238D;
    margin-left: 20px;
    margin-right: 20px;
}

</style>

