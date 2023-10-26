const { default: mongoose, model } = require("mongoose");

const ProductSchema = new mongoose.Schema({
    id : {type : Number},
    titel : {type : String},
    price : {type : String}
})


ProductSchema.pre("save", function(next){
    const self  =this;
    self.constructor.count(async function(err , data){
        if(err) return next(err);
        model.set({id: (data+ 1)})
        next();
    })
})

module.exports = {
    ProductModel : mongoose.model("product", ProductSchema)
}