import { dbConnect } from '@/dbconfig/dbconfig';
import User from '@/models/User';
import { v4 as uuidv4 } from 'uuid';
import { sendAuthEmail } from '@/lib/auth-email';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email } = await request.json();
    
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "If this email exists, we've sent a reset link" }),
        { status: 200 } // Don't reveal if user exists
      );
    }

    const resetCode = uuidv4();
    user.forgotPass = true;
    user.forgotPassCode = resetCode;
    user.forgotPassCodeExp = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    // Send password reset email using existing system
    await sendAuthEmail({
      email,
      type: 'password-reset',
      code: resetCode
    });

    return new Response(
      JSON.stringify({ message: "If this email exists, we've sent a reset link" }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}