import { useParams, Link } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { useTours } from "../hooks/useTours";

// Helper to create slugs from tour titles
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/'/g, "") // remove apostrophes
    .replace(/\s+/g, "-"); // spaces to dashes
}

export default function DestinationDetail() {
  const { slug } = useParams();
  const { tours, loading, error } = useTours();
if (error) {
  return <div className="text-red-600">Error loading tours: {error.message}</div>;
}

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-blue-700 text-xl">
        Loading...
      </div>
    );
  }

  if (!tours) {
    return <div className="text-red-600">Error loading tours.</div>;
  }

  // Find the tour by slug
  const tour = tours.find((t) => slugify(t.title) === slug);

  if (!tour) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Destination Not Found</h2>
        <Link to="/destinations" className="text-blue-600 hover:underline">
          &larr; Back to Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <img
        src={tour.image}
        alt={tour.title}
        className="w-full h-60 object-cover rounded-xl shadow mb-8"
      />
      <h1 className="text-3xl font-bold text-blue-700 mb-4">{tour.title}</h1>
      <p className="text-gray-700 mb-6">{tour.description}</p>
      {/* Add more fields if you want */}
      <BookingForm tourId={tour._id} tourName={tour.title} />
      <Link to="/destinations" className="inline-block mt-8 text-blue-600 hover:underline">
        &larr; Back to Destinations
      </Link>
    </div>
  );
}