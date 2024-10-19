import mongoose from "mongoose";
import Role from "../models/role.model.js";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: './.env' });

const seedRoles = async () => {
    mongoose.connect(process.env.MONGO_DB).then(async () => {
        console.log('App Status: MongoDB Connected')

        const roles = [
            {
                name: 'STUDENT',
                permissions: ['READ_NOTES', 'WRITE_NOTES', 'BUY_NOTES'],
            },
            {
                name: 'SELLER',
                permissions: ['READ_NOTES', 'WRITE_NOTES', 'BUY_NOTES', 'SELL_NOTES', 'VIEW_ANALYTICS'],
            },
            {
                name: 'ADMIN',
                permissions: ['MANAGE_USERS', 'READ_ALL_NOTES', 'VIEW_ANALYTICS', 'MANAGE_ROLES'],
            }
        ];

        for (let role of roles) {
            const existingRole = await Role.findOne({ name: role.name });
            if (!existingRole) {
                await Role.create(role);
                console.log(`Role ${role.name} created.`);
            } else {
                console.log(`Role ${role.name} exists.`);
            }
        }

        console.log('Roles seeding completed.');
        process.exit();

    }).catch((error) => {
        console.log(error);
    })
}

seedRoles().catch((err) => {
    console.error(err);
    process.exit(1);
});