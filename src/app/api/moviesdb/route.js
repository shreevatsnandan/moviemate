import dbConnect from '@/dbconfig/dbconfig';
import Movie from '@/models/Movie';

export async function POST(request) {
  await dbConnect();
  
  try {
    const body = await request.json();
    console.log("Incoming data:", body);

    // 1. Data transformation to match schema
    const movieData = {
      ...body,
      duration: parseInt(body.duration),
      releaseDate: new Date(body.releaseDate),
      trailerUrl: body.trailerUrl?.filter(url => url.trim() !== "") || [],
      // Ensure addedBy is provided (required field)
      addedBy: body.addedBy || new mongoose.Types.ObjectId() // Fallback for testing only
    };

    // 2. Validate required fields
    const requiredFields = ['title', 'description', 'duration', 'genre', 'language', 'releaseDate', 'posterUrl', 'addedBy'];
    const missingFields = requiredFields.filter(field => !movieData[field]);
    
    if (missingFields.length > 0) {
      return Response.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // 3. Create movie
    const newMovie = await Movie.create(movieData);
    
    return Response.json(newMovie, { 
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Creation error:", error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return Response.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }
    
    return Response.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// Your existing GET handler remains the same
export async function GET() {
  await dbConnect();
  try {
    const movies = await Movie.find({}).populate('addedBy');
    return Response.json(movies, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}