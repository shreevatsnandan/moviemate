import dbConnect from '@/dbconfig/dbconfig';
import Booking from '@/models/Booking';

export async function GET(request, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const booking = await Booking.findById(id).populate('user show');
    if (!booking) {
      return Response.json({ message: 'Booking not found' }, { status: 404 });
    }
    return Response.json(booking, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const body = await request.json();
    const booking = await Booking.findByIdAndUpdate(id, body, { new: true });
    if (!booking) {
      return Response.json({ message: 'Booking not found' }, { status: 404 });
    }
    return Response.json(booking, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return Response.json({ message: 'Booking not found' }, { status: 404 });
    }
    return Response.json({ message: 'Booking deleted successfully' }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}