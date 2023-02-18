class BaseRepos{
    public model: any
    constructor(model: any) {
        this.model = model
    }

    public getAll(){
        return this.model.find()
    }

    public getById(id: string){
        return this.model.findOne({_id: id})
    }

    public createOne(data: any){
        return this.model.create(data)
    }

    async updateById(id: string, data: any){
        await this.model.updateOne({_id: id}, data)
        return this.model.findById(id)
    }

    public deleteById(id: string){
        return this.model.deleteOne({_id: id})
    }
}

export default BaseRepos;
