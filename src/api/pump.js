import { request } from "./request";
export function addArticle(data) {
  return request({
    url: '/pump/article/add',
    method: 'POST',
    data
  })
}
export function getArticle(){
  return request({
    url:'/pump/article',
    method:'GET'
  })
}

export function getPump() {
  return request({
      url: '/pump',
      method: 'GET'
  });
}

export function searchPump(keywords){
  return request({
    url:'/pump/search',
    method:'GET',
    params:{
      keywords
    }
  })
}