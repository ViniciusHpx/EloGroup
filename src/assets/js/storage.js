class Storage {

    static getData(key){
        let storage = localStorage.getItem(key);
        let obj = JSON.parse(storage);
        
        if(!obj)
        return []
        
        return obj;
    }

    static setData(key, obj){
        let newObj = JSON.stringify(obj);
        localStorage.setItem(key, newObj);
    }

    static getLeads (_id) {
        let leads = this.getData('leads');

        if(_id){
            let lead = leads.find((item)=>{
                return item._id = _id
            });
            return lead;
        }
        return leads;
    }

    static updateLeadPosition (_id, newPosition) {
        if(!_id)
            throw("Nenhum id foi informado.");
        
        let leads = this.getData('leads');

        const objIndex = leads.findIndex((obj => obj._id == _id));

        leads[objIndex].pos = newPosition;

        this.setData('leads', leads);
    }

    static addData (key, obj) {
        let items = this.getData(key);
        obj._id = items.length;
        items.push(obj);
        this.setData(key, items);
    }

    static addUser (obj) {
        const key = 'users';
        this.addData(key, obj);
    }

    static addLead (obj) {
        obj.pos = '0';
        const key = 'leads';
        this.addData(key, obj);
    }
}

module.exports = Storage;