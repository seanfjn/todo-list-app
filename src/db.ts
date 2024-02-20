import mongoose from "mongoose"

const connectToDatabase = async()=>{
    try{
        const connection = await mongoose.connect("mongodb+srv://TodoList:T6IWoDrAZM3QKdfK@Cluster0.8lzei0v.mongodb.net/todo-list-app?retryWrites=true&w=majority")
        if(connection){
            console.log("Connection Established")
        }

    } catch(error) {
    console.log("error in connecting", error)
        throw error
    }
}

export default connectToDatabase