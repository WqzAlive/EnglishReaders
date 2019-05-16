const {
  $Toast
} = require('../../components/iview/base/index');
import url from '../../utils/url.js';
import fetch from '../../utils/fetch';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: '',
    disableType:false,
    title: '可爱的表情救你的命',
    date: '2019年3月5号',
    guide: '导读：表情还能在危机时刻救命？BBC这个报道也许让你对表情有不一样的看法。',
    visible1: false,
    cancel: false,
    toast1:'搜索并关注公众号：英语早读，通过点击 [ 点阅英语早读 ] 完成订阅明日起，将收到公众号提醒',
    actions1: [{
      name: '订阅英语早读',
      color: '#19be6b'
    }],
    current: 'homepage',
    content: [],
    translation: [],
    number:'0',


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'http://trans.xcwmv.com/api/test.php?',
      data: {
        id: '1556938596'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        that.setData({
          date: res.data.data.publish_time,
          title: res.data.data.title_cn,
          guide: res.data.data.intro,
          content: res.data.data.content,
          translation: res.data.data.translation,

        })
        var con = [];
        for (var i = 0; i < res.data.data.content.length; i++) {

          con[i] = false;

        }
        that.setData({
          status: con
        })
        console.log(con)
        console.log("--------success--------", res);
      },
      fail: function(res) {
        console.log("--------fail--------");
      }
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // this.setData({
    //   content1:res.data.content1
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  browseClick: function(e) {
    let that = this;

    console.log("翻译" + '----' + e.target.dataset.id);
    var id = e.target.dataset.id;
    var sta = "status[" + id + "]";

    that.setData({
      [sta]: !that.data.status[id]
    })


    console.log(that.data.status[id]);

  },
  addclick: function() {
    this.setData({
      visible1: true
    });
    
  },
  handleClose1:function(){
    var that= this;
    console.log("点击订阅")
    this.setData({
      visible1: false
    });
   wx.setClipboardData({
     data: that.data.toast1,
     success: function(res) {
       wx.hideToast();
       wx.showToast({
         title: '已复制',
         icon: 'none',
         duration: 2000
       })
     },
     fail: function(res) {},
    
   })
  },
  btnclick:function(){
    console.log("打印信息=====》》》》")
      var that =this;
      if(that.data.disableType==false){
        that.setData({
          disableType:true,
          
        })
        $Toast({
          content: '今日已完成打卡',
          type: 'success'
        });
      }
  },
  shareClick:function (){
    $Toast({
      content: '分享码正在生成'
    });
  },
  handleChange({ detail }) {
  console.log("打印信息=====》》》》",detail)
  if(detail.key=="mine"){
    wx.navigateTo({
      url: '../mine/mine',
    })
  }
    
    
  }

})