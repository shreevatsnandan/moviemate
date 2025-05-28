import dbConnect from '@/dbconfig/dbconfig';
import User from '@/models/User';

export async function GET() {
  await dbConnect();

  try {
    const users = await User.find({}).populate('bookings theaters');
    return Response.json(users, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const user = await User.create(body);
    return Response.json(user, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}