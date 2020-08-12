import request from '@/utils/request'

// 查询appointment列表
export function listAppointment(query) {
  return request({
    url: '/system/appointment/list',
    method: 'get',
    params: query
  })
}

// 查询appointment详细
export function getAppointment(id) {
  return request({
    url: '/system/appointment/' + id,
    method: 'get'
  })
}

// 新增appointment
export function addAppointment(data) {
  return request({
    url: '/system/appointment',
    method: 'post',
    data: data
  })
}

// 修改appointment
export function updateAppointment(data) {
  return request({
    url: '/system/appointment',
    method: 'put',
    data: data
  })
}

// 删除appointment
export function delAppointment(id) {
  return request({
    url: '/system/appointment/' + id,
    method: 'delete'
  })
}

// 导出appointment
export function exportAppointment(query) {
  return request({
    url: '/system/appointment/export',
    method: 'get',
    params: query
  })
}