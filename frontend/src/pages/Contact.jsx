export default function Contact() {
  return (
    <div className="max-w-xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form className="space-y-4">
        <input className="w-full border rounded px-3 py-2" type="text" placeholder="Your Name" />
        <input className="w-full border rounded px-3 py-2" type="email" placeholder="Your Email" />
        <textarea className="w-full border rounded px-3 py-2" rows="5" placeholder="Message"></textarea>
        <button className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}