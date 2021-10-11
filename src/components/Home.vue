<template> 
<div>

   
    <section class="section-program">
        <div class="container cont-program">
            <div class="row">
                <div class=" col content-program">
                    <div class="cont-program-text" id="program-text">
                        <h2>Блок телепрограмм</h2>
                    </div>

                </div>
            </div>
            <div class="row">
                <div class="col-5">
                    <div class="cont-form-search">
                        <form class="form-search ">
                            <div class="input-group mt-3">
                                <span class="input-group-text" id=search>
                                    <img src="../assets/icon-search.svg"/>
                                </span>
                                <input v-model="program" id="search" type="text" name="search" placeholder="Поиск телепрограмм" class="form-control">
                                <!-- Показываем крестик только если что-то введено кроме пробелов
                                  При клике на крестик поле ввода очищается -->
                                <span v-show="program.trim() !== ''"   @click="program=''" class="input-group-text" id="close">
                                    <img src="../assets/icon-close.svg"/>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


  
            <div class="row">
                <div class="col-5">
                    <div class="accordion">
                        <div class="accordion-item" v-for="(channel,index) in channels" :key="index">
                            <input class="accordion-item-input" type="checkbox" :id="'accordion-'+channel.index"/>
                            <label class="accordion-item-triger" :for="'accordion-'+channel.index">
                                <div class="accordion-block">
                                    <div class="accordion-block-text">
                                        <div class="accordion-icon-arrow">
                                            <img src="../assets/icon-down-arrow.svg"/>
                                        </div>
                                        <div class="accordion-text-h">
                                            <h3>{{channel.alias}}</h3>
                                        </div>
                                        <div class="accordion-text-p">
                                            <p>{{channel.description}}</p>
                                        </div>                                  
                                     </div>

                                </div>

                            </label>
                            <!--
                            <div class="accordion-item-content" v-for="program in programs1"  v-show="program.channelId==channel.id" :key="program.id">
                                <div class="accordion-item-block"  v-if="program.channelId==channel.id">
                                    <div class="accordion-item-block-text">
                                        <div class="accordion-item-h">
                                            <h4>{{program.name}}</h4>
                                        </div>
                                    </div>
                                </div>       
                            </div>
                            -->
                        </div>
     

                    </div>
                </div>
            </div>





        </div>
    </section>











</div>
</template>


<script>
   export default{
     data(){
         return{
             program:""
            
         }
     },
                
              computed: {           
              programs1() {
                  let programs2 = this.programs;
                
                  programs2 = programs2.filter(item => {
                  return item.name.toUpperCase().indexOf(this.program.toUpperCase())!==-1;
                    })

                 
                    return programs2;
            },
            // получаем весь массив объектов channels из store/channels
            channels() {
                    return this.$store.getters.channels
            }

            },
            methods: {
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
    width: 1000px;
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
    font-size: 11px;
    font-weight: 400;
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

