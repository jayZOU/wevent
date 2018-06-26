# wevent
微信小程序跨页面通信库，体积极小，源码三十多行。


## usage
```javascript
    //app.js
    import Event from './libs/event';
    App({
      event: new Event(),
      onLaunch: function() {
      },
    })
    
    //page A
    const app = getApp()
    Page({
        data: {
            test: 1
        },
        onLoad: function() {
            app.event.on('upData', this.upData, this.data.test);
        },
        upData: function(num, num2) {
            this.setData({
                test: num + num2
            })
        }
    })
    
    //page B
    const app = getApp()
    Page({
        toIndex: function() {
        	let random1 = Math.random();
        	let random2 = Math.random();
        	app.event.emit('upData', random1, random2);
            console.log(app.event.emit('upData')) // 1
        }
    })
```
![图片描述](https://sfault-image.b0.upaiyun.com/411/583/4115839975-5982944d4eed5_articlex)


## API
**on(name, cb, data)**  
事件订阅，传入事件名称，回调函数，数据
`app.event.on('upData', this.upData, dataA)`  


**emit(name, [params, ...])**  
事件发布，可传入多个参数供回调函数执行，并返回订阅事件传输的数据
`app.event.emit('upData', random1, random2);`    // return dataA


**off([name])**   
事件注销，不传入name为注销所有事件   
`app.event.off('upData');`   

**get([name])**
获取事件引用和数据
`app.event.get('upData');`

[1]: /img/bVR86h