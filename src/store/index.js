// Список каналов:
// http://epg.domru.ru/channel/list?domain=ekat

// Список телепередач за промежуток времени
// http://epg.domru.ru/program/list?domain=ekat&date_from=2015-06-08+00%3A00%3A00&date_to=2015-06-09+00%3A00%3A00&xvid[0]=1&xvid[1]=2&xvid[2]=479



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
          },     
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
              programs({commit}){
            
                
                axios({
                     method: 'get',
                     url: "http://epg.domru.ru/program/list?domain=ekat&date_from=2015-06-08+00%3A00%3A00&date_to=2015-06-09+00%3A00%3A00&xvid[0]=1601",
                     })
                               
                     .then(function (response) {        
                     if (response.status === 200) {  
                    console.log("programs",response)         
                     commit('programs',response.data) }})
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





