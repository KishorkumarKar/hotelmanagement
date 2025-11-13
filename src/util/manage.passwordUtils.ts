import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
import { IAdminUser } from "../interface/adminUserInterface";

export const hashThePassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(config.saltRound);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};

export const getWebToken = async (
  adminUser: IAdminUser,
  type:String
): Promise<string> => {
  const data = {
    name: adminUser.user,
    email: adminUser.email,
    type:type
  };
  return jwt.sign(data, config.jwtSecret, { expiresIn: config.jwtExpiryTime });
};

export const verifyToken = async (token: string) => {
  return jwt.verify(token, config.jwtSecret);
};
