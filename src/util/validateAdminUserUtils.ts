import inquirer from "inquirer";
import * as adminUserService from "../service/adminUserService"

export const ensureAdminUser = async () => {
    const userExist = await adminUserService.isAnyUserExist();

    if (!userExist) {
        console.log("⚠️  No admin user found. Let's create one.");
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "username",
                message: "Enter admin username:",
                default: "admin",
                validate: async (input) => {
                    if (/\s/.test(input)) return "Username should not contain spaces";
                    if (input.length < 4) return "Username must be at least 4 characters";
                    const userExist = await adminUserService.getByUser(input);
                    if (userExist) {
                        return "Username name exist try another name";
                    }
                    return true;
                },
            },
            {
                type: "input",
                name: "name",
                message: "Enter admin name",
                default: "admin",
            },
            {
                type: "input",
                name: "email",
                message: "Enter admin email",
                validate: (input) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input)) return "Please enter a valid email address";
                    return true;
                },
            },
            {
                type: "password",
                name: "password",
                message: "Enter admin password:",
                mask: "*",
                validate: (input) => input.length >= 4 || "Password must be at least 4 characters",
            },
        ]);



        await adminUserService.add({
            name: answers.username,
            user: answers.name,
            password: answers.password,
            email: answers.email,
        });

        console.log(`✅ Admin user '${answers.username}' created successfully.`);
    } else {
        console.log("🟢 Admin user exists:");
    }
}