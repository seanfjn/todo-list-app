import Category from "../models/category-model";
import { Request, Response } from "express";
import { ICategory } from "../types";
import { AuthRequest } from "../middleware";

export const getAllCategories = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { user } = request;
    const categories = await Category.find({
      user: user,
    });
    return response.send(categories);
  } catch (error) {
    console.log("error in getAllCategories", error);
    response.send({ error: "Something went wrong" });
    throw error;
  }
};

export const createCatgeory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { color, icon, isEditable, name }: ICategory = request.body;
    const { user } = request;

    const category = await Category.create({
      color,
      icon,
      isEditable,
      name,
      user,
    });
    response.send(category);
  } catch (error) {
    console.log("error in createCategory", error);
    response.send({ error: "Something went wrong" });
    throw error;
  }
};

export const deleteCategory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { id } = request.params;
    const category = await Category.deleteOne({
      _id: id,
    });
    response.send({ message: "Category has been deleted" });
  } catch (error) {
    console.log("There was an error in deleting category", error);
    response.send({ error: "Something went wrong" });
    throw error;
  }
};

export const updateCategory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { _id, color, icon, isEditable, name }: ICategory = request.body;
    await Category.updateOne(
      {
        _id,
      },
      {
        $set: {
          name,
          color,
          icon,
          isEditable,
        },
      }
    );
    response.send({ message: "Category updated successfully" });
  } catch (error) {
    console.log("There was an error in updating the category", error);
    response.send({ error: "Something went wrong" });
    throw error;
  }
};
