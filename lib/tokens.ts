import { prismadb } from "./db";
import { v4 as uuid } from "uuid";
import { lib } from "crypto-js";
// import crypto from "crypto";
import { getUserbyEmail } from "./user";

export const generateToken = async (
  email: string,
  tokenType: "verification" | "reset" | "twofactor"
) => {
  // check if there is user for this email
  const user = await getUserbyEmail({ email });
  if (!user) {
    return null;
  }

  // check the token type
  let token;
  if (tokenType == "verification" || tokenType == "reset") {
    token = uuid();
  } else {
    const randomValue = lib.WordArray.random(4);
    const sixDigitCode = randomValue.words[0] % 1000000;
    token = sixDigitCode.toString().padStart(6, "0");
    // token = crypto.randomInt(100_000, 1_000_000).toString();
  }
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 3600 * 1000 ms

  // check if there is an existing token with same id to edlete it
  const exitingToken = await getTokenByuserEmail(email, tokenType);
  if (exitingToken) {
    await prismadb.authToken.delete({
      where: {
        id: exitingToken.id,
      },
    });
  }

  // create new token

  let relationField:
    | "twoFactorToken"
    | "passwordResetToken"
    | "verificationToken" = "twoFactorToken";

  if (tokenType === "reset") {
    relationField = "passwordResetToken";
  } else if (tokenType === "verification") {
    relationField = "verificationToken";
  }

  const newToken = await prismadb.authToken.create({
    data: {
      expires,
      token,
      userId: user.id,
    },
  });

  await prismadb.user.update({
    where: { id: user.id },
    data: {
      [relationField]: {
        connect: {
          id: newToken.id,
        },
      },
    },
  });

  return newToken;
};

export const getTokenByuserEmail = async (
  email: string,
  tokenType: "verification" | "reset" | "twofactor"
) => {
  const user = await getUserbyEmail({ email });

  if (!user) {
    return null;
  }
  const token = await prismadb.authToken.findUnique({
    where: {
      userId: user.id,
      twofactorUser: user,
    },
    include: {
      twofactorUser: tokenType == "twofactor",
      verifyuser: tokenType == "verification",
      passwordResetuser: tokenType == "reset",
    },
  });
  return token;
};

export const getTokenById = async (
  id: any,
  tokenType: "verification" | "reset" | "twofactor"
) => {
  const token = await prismadb.authToken.findUnique({
    where: {
      id,
    },
    include: {
      twofactorUser: tokenType == "twofactor",
      verifyuser: tokenType == "verification",
      passwordResetuser: tokenType == "reset",
    },
  });
  return token;
};
