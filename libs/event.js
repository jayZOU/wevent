class Event{
	constructor(){
		this.__event = {};
	}
	on(name, cb){
		if(!name || typeof cb != 'function'){
			console.error('订阅事件失败');
			return ;
		}
		(this.__event[name] = this.__event[name] || []).push(cb);
	}
	emit(name, ...params){
		let cache = this.__event[name];
		if(!cache || cache.length == 0){
			console.error(`${name}事件未订阅`);
			return;
		}
		cache.forEach((item) => {
			item.call(null, ...params);
		})
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