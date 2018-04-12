class Event{
    constructor(){
        this.__event = {};
    }
    on(name, cb, data){
        if(!name || typeof cb != 'function'){
            console.error('订阅事件失败');
            return ;
        }
        (this.__event[name] = this.__event[name] || {list: []}).list.push(cb);
        this.__event[name].data = data || undefined;
    }
    emit(name, ...params){
        let cache = this.__event[name];
        if(!cache || cache.length == 0){
            console.error(`${name}事件未订阅`);
            return;
        }
        cache.list.forEach((item) => {
            item.call(null, ...params);
        });
        return cache.data
    }
    off(name){
        if(!name){
            console.info('删除所有订阅事件！！！');
            this.__event = {};
            return;
        }
        delete this.__event[name]
        return;
    }
}
export default Event;