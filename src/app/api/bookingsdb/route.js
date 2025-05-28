import dbConnect from '@/dbconfig/dbconfig';
import Booking from '@/models/Booking';

export async function GET() {
  await dbConnect();

  try {
    const bookings = await Booking.find({}).populate('user show');
    return Response.json(bookings, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const booking = await Booking.create(body);
    return Response.json(booking, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}