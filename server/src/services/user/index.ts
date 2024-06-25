import prisma from "../../utils/prisma";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { createRefreshToken } from "../../utils/jwt";

interface CreateUserParams {
  username: string;
  email: string;
  password: string;
}

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

const createUser = async ({
  username,
  email,
  password,
}: CreateUserParams): Promise<User> => {
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  return user;
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

const storeRefreshToken = async (userId: string, refreshToken: string) => {
  // Check if the user already has a refresh token
  const existingToken = await prisma.refreshToken.findUnique({
    where: {
      userId,
    },
  });

  if (existingToken) {
    // Update the existing refresh token
    await prisma.refreshToken.update({
      where: {
        userId,
      },
      data: {
        token: refreshToken,
        updated_at: new Date(),
      },
    });
  } else {
    // Create a new refresh token
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: userId,
      },
    });
  }
};

const removeRefreshToken = async (userId: string) => {
  await prisma.refreshToken.delete({
    where: {
      userId,
    },
  });
};

const getRefreshToken = async (userId: string, token: string) => {
  const refreshToken = await prisma.user.findUnique({
    where: {
      id: userId,
      refresh_token: {
        token,
      },
    },
    select: {
      id: true,
      username: true,
      email: true,
      created_at: true,
      updated_at: true,
    },
  });
  return refreshToken;
};

export {
  createUser,
  getUserByEmail,
  comparePassword,
  storeRefreshToken,
  removeRefreshToken,
  getRefreshToken,
};
