import request from '@/utils/request'

// 查询homeinfo列表
export function listHomeinfo(query) {
  return request({
    url: '/system/homeinfo/list',
    method: 'get',
    params: query
  })
}

// 查询homeinfo详细
export function getHomeinfo(id) {
  return request({
    url: '/system/homeinfo/' + id,
    method: 'get'
  })
}

// 新增homeinfo
export function addHomeinfo(data) {
  return request({
    url: '/system/homeinfo',
    method: 'post',
    data: data
  })
}

// 修改homeinfo
export function updateHomeinfo(data) {
  return request({
    url: '/system/homeinfo',
    method: 'put',
    data: data
  })
}

// 删除homeinfo
export function delHomeinfo(id) {
  return request({
    url: '/system/homeinfo/' + id,
    method: 'delete'
  })
}

// 导出homeinfo
export function exportHomeinfo(query) {
  return request({
    url: '/system/homeinfo/export',
    method: 'get',
    params: query
  })
}