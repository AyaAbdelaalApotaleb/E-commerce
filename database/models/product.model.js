import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'title is unique'],
        trim: true,
        required: true,
        minLength: [2, 'too short category name'],
        maxLength: [200, 'too long category name']

    },
    slug: {
        type: String,
        lowercase: true,
        // required: true
    },
    description:  {
        type: String,
        trim: true,
        // required: true,
        minLength: [10, 'too short description'],
        maxLength: [500, 'too long description']
 },
 imgCover:String,
 images:[],
 price:{type : Number, min:0,
    //  required :true
    },
 priceAfterDiscount:{type : Number, min:0},
 quantity:{type : Number, min:0, default :0},
 sold :Number,
 rateAvg:{
    type:Number,
    max:5,
    min:0
 },
 rateCount :{type :Number,
    min :0,
    default:0
},
 category:{type:mongoose.Types.ObjectId,ref:"category"},
 subcategory:{type:mongoose.Types.ObjectId,ref:"subcategory"},
 brand:{type:mongoose.Types.ObjectId,ref:"brand"},
 createdBy:{type:mongoose.Types.ObjectId,ref:"user"}

},
{ timestamps: true,toJSON:{ virtuals:true } ,toObject:{ virtuals:true }}
)

schema.post('init' ,function(doc){
    if (doc.imgCover || doc.images) {
        
    doc.imgCover= process.env.baseURL +'uploads/' + doc.imgCover;
    doc.images=doc.images?.map((img)=> process.env.baseURL +'uploads/' + img)
}

})
schema.virtual('myReviews', { 
    ref: 'review', 
    localField: '_id',
    foreignField: 'productId'

}); 

schema.pre('findOne', function (){
    this.populate('myReviews')
})


export const productModel = mongoose.model('product', schema)



