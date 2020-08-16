import request from '@/utils/request'

// 查询lunbo列表
export function listLunbo(query) {
  return request({
    url: '/system/lunbo/list',
    method: 'get',
    params: query
  })
}

// 查询lunbo详细
export function getLunbo(id) {
  return request({
    url: '/system/lunbo/' + id,
    method: 'get'
  })
}

// 新增lunbo
export function addLunbo(data) {
  return request({
    url: '/system/lunbo',
    method: 'post',
    data: data
  })
}

// 修改lunbo
export function updateLunbo(data) {
  return request({
    url: '/system/lunbo',
    method: 'put',
    data: data
  })
}

// 删除lunbo
export function delLunbo(id) {
  return request({
    url: '/system/lunbo/' + id,
    method: 'delete'
  })
}

// 导出lunbo
export function exportLunbo(query) {
  return request({
    url: '/system/lunbo/export',
    method: 'get',
    params: query
  })
}