import { dbConnect } from '@/dbconfig/dbconfig';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { sendAuthEmail } from '@/lib/auth-email';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    
    if (!body.email || !body.password || !body.name) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const verificationCode = uuidv4();

    const user = await User.create({
      ...body,
      password: hashedPassword,
      verifiedCode: verificationCode,
      verifiedCodeExp: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });

    await sendAuthEmail({
      email: body.email,
      type: 'verification',
      code: verificationCode
    });

    const { password, verifiedCode: vc, verifiedCodeExp: vce, ...userData } = user.toObject();
    return NextResponse.json(userData, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  await dbConnect();

  try {
    const { code, email, newPassword } = await request.json();

    if (code && !newPassword) {
      const user = await User.findOne({ email, verifiedCode: code });
      
      if (!user) {
        return NextResponse.json(
          { error: "Invalid verification code" },
          { status: 400 }
        );
      }

      if (user.verifiedCodeExp < new Date()) {
        return NextResponse.json(
          { error: "Verification code expired" },
          { status: 400 }
        );
      }

      user.verified = true;
      user.verifiedCode = undefined;
      user.verifiedCodeExp = undefined;
      await user.save();

      return NextResponse.json(
        { message: "Email verified successfully" },
        { status: 200 }
      );
    } else if (newPassword) {
      const user = await User.findOne({ 
        email, 
        forgotPassCode: code,
        forgotPass: true 
      });
      
      if (!user) {
        return NextResponse.json(
          { error: "Invalid password reset code" },
          { status: 400 }
        );
      }

      if (user.forgotPassCodeExp < new Date()) {
        return NextResponse.json(
          { error: "Password reset code expired" },
          { status: 400 }
        );
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      user.forgotPass = false;
      user.forgotPassCode = undefined;
      user.forgotPassCodeExp = undefined;
      await user.save();

      return NextResponse.json(
        { message: "Password reset successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}