// Список каналов:
// http://epg.domru.ru/channel/list?domain=ekat



import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex,axios)

export default new Vuex.Store({
  state: {
    channels:[]
  },
  mutations: {
           // записываем в state полученную информацию
           channels(state,data){                 
            state.channels = data
           },
  },
  actions: {
               
              // Получение всех элементов из базы данных
              channels({commit}){
            
                
                axios({
                     method: 'get',
                     url: "http://epg.domru.ru/channel/list?domain=perm",
                     })
                               
                     .then(function (response) {        
                     if (response.status === 200) {  
                    console.log("all response",response)         
                     commit('channels',response.data) }})
                     .catch(function (error) {
                      if (error.response.status === 403){
                        console.log("error",error)      
                      }  
          
                 });    
                       }           
    
  },
  getters:{
    channels(state) {
      // Возвращаем все комманды по запросу из файла vue
      return state.channels
  }   
  }
})





