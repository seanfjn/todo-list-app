import { Request, Response } from "express" 
import User from "../models/user-model"
import bcrypt from 'bcrypt'
import moduleName from 'module'
import { Types } from "mongoose"
import jwt from 'jsonwebtoken'
import { IUser } from "../types"


const getUserToken=(_id:string|Types.ObjectId) => {
    const authenticatedUserToken = jwt.sign({_id}, "express", {expiresIn: "7d"})
    return authenticatedUserToken
} 


export const createUser = async (request: Request, response: Response) => {
    try{
        const {name, email, password} = request.body
        
        //This will check if the user already exists and if they do then we will get a message saying User already exists if not it will continue with creating a new user
        const existingUser = await User.findOne({email})

        if(existingUser){   
            return response.status(409).send("User already exists")
        }

        const hashedPassword = await bcrypt.hash(password,12)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        return response.status(201).send({message: "User created successfully"})

    } catch(error) {
        console.log('error in createUser', error)
        throw (error)
    }
}

export const loginUser = async (request:Request, response:Response) => {
    try{
        const {email,password}:IUser = request.body
        const existingUser = await User.findOne({email})
        if(!existingUser){
            return response.status(409).send({message:"User doesnt exist"})
        }
        const isPasswordIdentical = await bcrypt.compare(password, existingUser.password)
        if(isPasswordIdentical){
            const token = getUserToken(existingUser._id)
            return response.send({
                token, user: {email: existingUser.email, name: existingUser.name},
            })
        } else {
            return response.status(400).send({message: "Wrong credentials"})
        }
    }  catch(error){
        console.log('error in login', error)
        throw (error)
    }
}