import mongoose, { Schema } from "mongoose"

const notesSchema=new mongoose.Schema({
    name:{type:String,required:true},
    professor:{type:String,required:true},
    description:{type:String,required:true},
    seller:{type:String,required:true},
    branch:{type:String,required:true},
    semester:{type:String,required:true},
    subject:{type:String,required:true},
    coursecode:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    subCategory:{type:String,required:true},
    condition:{type:String,
        enum:[
            "New",
            "like new",
            "Good",
            "used"
        ],default:""},
    allowedquantity:{type:Boolean,required:true},
    quantity:{type:Number,required:true},
    pages:{type:Number,required:true},
    filesize:{type:Number,required:true},
    pdfavailable:{type:Boolean,required:true},
    isfree:{type:Boolean,default:true},
    price:{type:Number,default:0},
    downloads:{type:Number,default:0},
    pdfurl:{type:String,required:true},
    previewpdfurl:{type:String,required:true},
    rating:{type:Number,default:0},
    totalreviews:{type:Number,default:0},
    options:{type:[String],default:[]},
    Date:{type:Date,default:Date.now},
    views:{type:Number,default:0}
})

const notesModel=mongoose.models.notes || mongoose.model("notes",notesSchema);

export default notes;