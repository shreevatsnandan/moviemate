import dbConnect from '@/dbconfig/dbconfig';
import Movie from '@/models/Movie';

export async function GET() {
  await dbConnect();

  try {
    const movies = await Movie.find({}).populate('addedBy');
    return Response.json(movies, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const movie = await Movie.create(body);
    return Response.json(movie, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}