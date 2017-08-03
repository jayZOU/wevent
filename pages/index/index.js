//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        test: 1
    },
    onLoad: function() {
        app.event.on('upData', this.upData);
    },
    upData: function(num, num2) {
        this.setData({
            test: num + num2
        })
    },
    toLog: function() {
    	wx.navigateTo({
		  	url: '../logs/logs'
		})
    }
})