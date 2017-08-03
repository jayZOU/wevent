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
            app.event.on('upData', this.upData);
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
        }
    })
```  
![图片描述](https://sfault-image.b0.upaiyun.com/411/583/4115839975-5982944d4eed5_articlex)


## API
**on(name, cb)**  
事件订阅，传入事件名称和回调函数  
`app.event.on('upData', this.upData)`  


**emit(name, [params, ...])**  
事件发布，可传入多个参数供回调函数执行   
`app.event.emit('upData', random1, random2);`   


**off([name])**   
事件注销，不传入name为注销所有事件   
`app.event.off('upData');`   

  [1]: /img/bVR86h