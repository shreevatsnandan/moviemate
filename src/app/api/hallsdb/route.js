import dbConnect from '@/dbconfig/dbconfig';
import Hall from '@/models/Hall';

export async function GET() {
  await dbConnect();

  try {
    const halls = await Hall.find({}).populate('theater shows');
    return Response.json(halls, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const hall = await Hall.create(body);
    return Response.json(hall, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}