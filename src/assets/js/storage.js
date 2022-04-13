class Storage {

    // Método responsável por pegar os dados no localStorage e transforma-lo em um objeto JSON
    static getData(key){
        let storage = localStorage.getItem(key);
        let obj = JSON.parse(storage);
        
        if(!obj)
            return []
        
        return obj;
    }

    // Método responsavel por transformar um objeto JSON em String e salva-lo no localStorage
    static setData(key, obj){
        let newObj = JSON.stringify(obj);
        localStorage.setItem(key, newObj);
    }
    // Método responsavel por procurar todos ou um lead especifico 
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
    // Método responsavel por atualizar a posição de um lead
    static updateLeadPosition (_id, newPosition) {
        if(!_id)
            throw("Nenhum id foi informado.");
        
        let leads = this.getData('leads');
        // Procurando a posição do obj no array de leads que contém o _id informado
        const objIndex = leads.findIndex((obj => obj._id == _id));

        leads[objIndex].pos = newPosition;

        this.setData('leads', leads);
    }
    // Método responsavel por adicionar obj JSON no localStorage
    static addData (key, obj) {
        let items = this.getData(key);
        obj._id = items.length;
        items.push(obj);
        this.setData(key, items);
    }
    // Método responsavel por adicionar um usuário
    static addUser (obj) {
        const key = 'users';
        this.addData(key, obj);
    }
    // Método responsavel por adicionar um Lead sempre começando na primeira coluna
    static addLead (obj) {
        obj.pos = '0';
        const key = 'leads';
        this.addData(key, obj);
    }
}
module.exports = Storage;