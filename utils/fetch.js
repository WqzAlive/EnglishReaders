import { s_url } from './url'
// const fetchUrl = s_url + "/api"
// const fetchUrl = "https://wxapptest.ensurlink.com.cn/zzlp/api"

export default {
  /**
   * 封装后台接口请求
   */

  post(url, data, success, fail, method, ) {
    let ropages = ''
    if (getCurrentPages()) {
      ropages = getCurrentPages().reverse()
    } else {
      ropages = []
    }
    // console.log('当前路径', ropages[0].route.split('/')[1])
    let ars = []
    for (let i = 0; i < ropages.length; i++) {
      ars.push(ropages[i].route.split('/')[1])
    }
    console.log('数组路径', ars)
    wx.showLoading({
      "mask": true,
      "title": "处理中"
    });
    let params = ""
    if (url.indexOf("?") == -1) {
      params = "?"
    } else {
      params = params + "&"
    }
    if (wx.getStorageSync('openId')) {
      data.openId = wx.getStorageSync('openId')
      params = params + "openId=" + data.openId + "&"
    }
    if (wx.getStorageSync('loginInfo')) {
      data.userId = wx.getStorageSync('loginInfo').id
      params = params + "userId=" + data.userId + "&"
    }
    if (wx.getStorageSync('loginInfo')) {
      data.userId = wx.getStorageSync('loginInfo').id
      params = params + "hung=" + (ropages ? ropages.length ? ropages[0].route.split('/')[1] : '' : '') + "&"
    }
    if (wx.getStorageSync('userInfo')) {
      data.unionId = JSON.parse(wx.getStorageSync('userInfo')).unionId
      params = params + "unionId=" + data.unionId
    }
    url = url + params
    wx.request({
      url: s_url + url,
      method: method ? method : 'post',
      data: data,
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        console.log('这里是请求结果===>>', res)
      
        let app = getApp();
        if (res.data && res.data.rgbColor) {
          app.rgbcolor = res.data.rgbColor
          wx.setStorageSync('rgbColor', res.data.rgbColor);
        }
        wx.hideLoading()
        if (res.data.code == '888') {
          // wx.showToast({
          //   "title": res.data.msg,
          //   "icon": "none"
          // })
          wx.reLaunch({
            url: '/pages/hangup/hangup?msg=' + res.data.msg
          })
          return
        }
        if (res.data.code == "OK") {
          success(res)
        } else {
          wx.showToast({
            "title": res.data.message,
            "icon": "none"
          })
        }
      },
      fail: err => {
        wx.hideLoading()
        wx.showToast({
          title: '系统异常',
          icon: 'none'
        })
        console.log('这里是错误信息===>>', err)
      }
    });
  },
  /**
   * request请求GET方式
   */
  get(url, data, success, fail) {
    this.post(url, data, success, fail, "GET");
  },
  /**
   * 上传文件
   * @param url
   * @param filePath
   * @param name
   * @param formData
   * @param success
   */
  upload(url, filePath, name, formData, success, fail) {
    wx.uploadFile({
      url: s_url + url,
      filePath: filePath,
      name: name,
      formData: formData,
      success: res => {
        success(res)
      },
      fail: err => {
        if (fail) {
          fail(err)
        }
      }
    })
  },
  dowload(url, success) {
    console.log('zheshi +++++++++++++==', url)
    let params = ''
    if (wx.getStorageSync('loginInfo')) {
      let userId = wx.getStorageSync('loginInfo').id
      params = params + "&userId=" + userId
    }
    wx.downloadFile({
      // 示例 url，并非真实存在

      url: s_url + url + params,
      success: res => {
        success(res)
      }
    })
  }
}
