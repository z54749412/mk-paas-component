/**
 * paas 请求封装
 */
import axios, { AxiosRequestConfig } from 'axios'

import { message } from 'antd'

import parseUrl from '@utils/parseUrl'

const TIMEOUT = 2 * 60000

const urlParams = parseUrl(window.location.href)
console.log(2222, BASEURL)
const DEFAULTCONFIG: AxiosRequestConfig = {
  baseURL: `${window.BASEURL}napi/`,
  timeout: TIMEOUT
}

const authInfo: any = JSON.parse(localStorage.getItem('authorization') || '{}')

authInfo && authInfo.entName && delete authInfo.entName

function getAxiosInstance() {
  const instance = axios.create(DEFAULTCONFIG)
  if (authInfo && JSON.stringify(authInfo) !== '{}' && !urlParams.ucode) {
    instance.interceptors.request.use(
      config => {
        config.headers = authInfo
        return config
      },
      error => Promise.reject(error)
    )
  }
  instance.interceptors.response.use(
    function (response: any) {
      const { status, data } = response
      if (status >= 200 && status < 300) {
        if (data.status === '9999') {
          const msg = data.data.detail.msg.content
          message.error(msg)
          const error: any = new Error(msg)
          error.response = response
          throw error
        }

        if (data.status === 500 && data.data.type === 'NORMAL') {
          const msg = data.data.detail.msg.content
          message.error(msg)
          const error: any = new Error(msg)
          error.response = response
          throw error
        }
        if (data.data.type === 'BIND') {
          response.data.data.status = data.status
        }
        return response.data
      }
    },
    function (error) {
      let msg = null
      const err = error.response
      if (err.status === 401) {
        message.error('系统登陆超时，请重新登陆')
        // window.location.replace(process.env.AUTHURL)
        return
        // msg = '系统登陆超时，请重新登陆'
        // const url = getLoginPage(process.env.NODE_ENV)
        // window.location.replace(url)
      } else if (err.status === 403) {
        message.error('拒绝接受相关的操作请求')
        window.location.replace(`${window.location.origin}/`)
        return
      } else {
        msg = `网络错误，请联系管理员${err.statusText}`
      }
      message.error(msg)
      return Promise.reject(error)
    }
  )

  return instance
}
export default getAxiosInstance()
