// Список каналов:
// http://epg.domru.ru/channel/list?domain=ekat

// Список телепередач за промежуток времени             
//    url: "http://epg.domru.ru/program/list?domain=ekat&date_from=2021-09-10+00%3A00%3A00&date_to=2021-10-10+00%3A00%3A00&xvid[0]="+xvid,
    


import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex,axios)

export default new Vuex.Store({
  state: {
    channels:[],
    programs:[]

  },
  mutations: {
           // записываем в state полученную информацию
           channels(state,data){                 
            state.channels = data
           },
          // записываем в state полученную информацию
          programs(state,data){
                state.programs = data
          }
  },
  actions: {
               
              // Получение всех каналов с сервера
              channels({commit}){
            
                
                axios({
                     method: 'get',
                     url: "http://epg.domru.ru/channel/list?domain=ekat",
                     })
                               
                     .then(function (response) {        
                     if (response.status === 200) {  
                    console.log("channels",response)         
                     commit('channels',response.data) }})
                     .catch(function (error) {
                      if (error.response.status === 403){
                        console.log("error",error)      
                      }  
          
                 });    
                       },

              // Получение телепрограмм
              programs({commit},xvid){
            
                let date1= new Date()
                console.log("date1",date1)
                // день месяца
                let day1= date1.getDate()            
                // месяц начинается с 0
                let month1= date1.getMonth()+1
                let year1= date1.getUTCFullYear()
                 
                let date1Str= year1+"-"+month1+"-"+day1
                console.log("date1",date1Str)

                // завтрашний день  
                let date2 = new Date();              
                date2.setDate(date2.getDate() + 1); 

                let day2= date2.getDate()            
                let month2= date2.getMonth()+1
                let year2= date2.getUTCFullYear()

                let date2Str= year2+"-"+month2+"-"+day2
                console.log("date2",date2Str)


                axios({
                     method: 'get',
                     url: "http://epg.domru.ru/program/list?domain=ekat&date_from="+date1Str+"&date_to="+date2Str+"&xvid[0]="+xvid,
                     })
                               
                     .then(function (response) {        
                     if (response.status === 200) {  
                    console.log("programs",response.data)  
                    console.log("xvid",xvid)       
                     commit('programs',response.data) 
                          }})
                     .catch(function (error) {
                      if (error.response.status === 403){
                        console.log("error",error)      
                      }  
          
                 });    
                       }  


    
  },
  getters:{ 
    channels(state) {
      // Возвращаем все каналы 
      // Сортируем их по значению кнопки (button) (+ -преобразуем строковое значение к цифровому )
      return state.channels.sort((prev, next) => +prev.button - +next.button);
  },
  programs(state) {
    // Возвращаем программы 
    return state.programs
}
  }
})





