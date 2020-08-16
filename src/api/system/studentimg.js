import request from '@/utils/request'

// 查询studentimg列表
export function listStudentimg(query) {
  return request({
    url: '/system/studentimg/list',
    method: 'get',
    params: query
  })
}

// 查询studentimg详细
export function getStudentimg(id) {
  return request({
    url: '/system/studentimg/' + id,
    method: 'get'
  })
}

// 新增studentimg
export function addStudentimg(data) {
  return request({
    url: '/system/studentimg',
    method: 'post',
    data: data
  })
}

// 修改studentimg
export function updateStudentimg(data) {
  return request({
    url: '/system/studentimg',
    method: 'put',
    data: data
  })
}

// 删除studentimg
export function delStudentimg(id) {
  return request({
    url: '/system/studentimg/' + id,
    method: 'delete'
  })
}

// 导出studentimg
export function exportStudentimg(query) {
  return request({
    url: '/system/studentimg/export',
    method: 'get',
    params: query
  })
}