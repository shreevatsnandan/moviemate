import dbConnect from '@/dbconfig/dbconfig';
import Show from '@/models/Show';

export async function GET() {
  await dbConnect();

  try {
    const shows = await Show.find({}).populate('movie hall bookings');
    return Response.json(shows, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const show = await Show.create(body);
    return Response.json(show, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}