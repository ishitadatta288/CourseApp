import { json } from "express";
import { Course } from "../models/course.model.js";
import { v2 as cloudinary } from 'cloudinary';
import { Purchase } from "../models/purchase.model.js";

export const createCourse = async (req, res) => {
    const adminId = req.adminId
    try {
        const { title, description, price } = req.body;

        // Validate form data
        if (!title || !description || !price || !req.files || !req.files.image) {
            return res.status(400).json({ error: "All fields including an image file are required" });
        }

        const image = req.files.image;

        // Upload to Cloudinary
        const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);

        if (!cloud_response || cloud_response.error) {
            return res.status(400).json({ error: "Error uploading file to Cloudinary" });
        }

        // Save course to DB
        const courseData = {
            title,
            description,
            price,
            image: {
                public_id: cloud_response.public_id,
                url: cloud_response.secure_url
            },
            creatorId: adminId
        };

        const course = await Course.create(courseData);

        res.json({
            message: "Course created successfully",
            course
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating course" });
    }
};

export const updateCourse = async (req, res) => {
    const adminId = req.adminId
    const { courseId } = req.params;
    const { title, description, price, image } = req.body
    try {

        const courseSearch = await Course.findById(courseId)
        if (!courseSearch) {
            return res.status(404).json({ error: "Course not found" })
        }

        const course = await Course.findByIdAndUpdate({
            _id: courseId,
            creatorId: adminId
        },
            {
                title, description, price, image: {
                    public_id: image?.public_id,
                    url: image?.url,
                }
            })
        if (!course) {
            return res.status(404).json({ error: "Can't update, created by other admin" })
        }
        res.status(201).json({ message: "Course updated successfully", course })
    } catch (error) {
        res.status(500).json({ error: "Error in course updating" })
        console.log("Error in course updating", error);

    }
};

export const deleteCourse = async (req, res) => {
    const adminId = req.adminId
    const { courseId } = req.params;
    try {
        const course = await Course.findOneAndDelete({
            _id: courseId,
            creatorId: adminId
        })
        if (!course) {
            return res.status(404).json({ error: "Course can not be deleted, created by other admin" })
        }
        res.status(200).json({ message: "Course deleted successfully" })
    } catch (error) {
        res.status(500).json({ error: "Error in course deleting" })
        console.log("Error in course deleting", error);

    }
}

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(201).json({ courses });
    } catch (error) {
        res.status(500).json({ error: "Error in getting courses" })
        console.log("Error to get courses", error);

    }
}

export const courseDetails = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ error: "Course not found" })
        }
        res.status(200).json({ course })
    } catch (error) {
        res.status(500).json({ error: "Error in getting courses" })
        console.log("Error to get courses", error);
    }
}


import Stripe from "stripe"
import config from "../config.js";
const stripe = new Stripe(config.STRIPE_SECRET_KEY)
console.log(config.STRIPE_SECRET_KEY);


export const buyCourses = async (req, res) => {
    const { userId } = req;
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        const existingPurchase = await Purchase.findOne({ userId, courseId })
        if (existingPurchase) {
            return res.status(400).json({ error: "User has already purchased this course" })
        }

        //stripe payment
        const amount = course.price
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            payment_method_types: ["card"]
        });


        res.status(201).json({
            message: "Course purchased successfully",
            course,
            clientSecret: paymentIntent.client_secret
        })

    }
    catch (error) {
        res.status(500).json({ error: "Error in course buying" })
        console.log("Error in course buying", error);

    }
}