export default function Testimonials() {
  const testimonials = [
    {
      name: "Samantha Perera",
      text: "Ceylon Escape made my Sri Lanka trip unforgettable! The guides were knowledgeable and friendly.",
      avatar: "https://randomuser.me/api/portraits/women/81.jpg"
    },
    {
      name: "John Smith",
      text: "Breathtaking destinations and seamless organization. Highly recommend!",
      avatar: "https://randomuser.me/api/portraits/men/82.jpg"
    },
    {
      name: "Ishara Fernando",
      text: "Amazing service and stunning locations. Will travel again with Ceylon Escape!",
      avatar: "https://randomuser.me/api/portraits/women/83.jpg"
    }
  ];
  return (
    <section className="bg-blue-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8 text-center text-blue-800">What Our Travelers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(t => (
            <div key={t.name} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition flex flex-col items-center text-center">
              <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full border-4 border-blue-200 mb-4"/>
              <p className="italic text-gray-700 mb-3">"{t.text}"</p>
              <div className="mt-auto font-semibold text-blue-700">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}