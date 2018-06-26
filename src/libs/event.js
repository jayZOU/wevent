class Event{
	constructor(){
		this.__event = {};
	}
	on(name, cb, data){
		if(!name || typeof cb != 'function') return ;

		(this.__event[name] = this.__event[name] || {list: []}).list.push(cb);
		this.__event[name].data = data || undefined;
	}
	emit(name, ...params){
		let cache = this.__event[name];
		if(!cache) return;

		cache.list.forEach((item) => {
			item.call(null, ...params);
		});
		return cache.data
	}
	get(name){
		if(!name) return this.__event;

		return this.__event[name];
	}
	off(name){
		if(!name){
			this.__event = {};
			return;
		}
		delete this.__event[name]
		return;
	}
}
export default Event;