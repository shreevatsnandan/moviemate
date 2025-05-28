import dbConnect from '@/dbconfig/dbconfig';
import Theater from '@/models/Theater';

export async function GET() {
  await dbConnect();

  try {
    const theaters = await Theater.find({}).populate('owner halls');
    return Response.json(theaters, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const theater = await Theater.create(body);
    return Response.json(theater, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}