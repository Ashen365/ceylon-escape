import React from "react";

const team = [
  {
    name: "Nimal Perera",
    role: "Founder & CEO",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sanduni Jayasinghe",
    role: "Lead Travel Designer",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Chathura Fernando",
    role: "Operations Manager",
    img: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    name: "Dilani Senanayake",
    role: "Marketing Specialist",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Ashan Silva",
    role: "Adventure Guide",
    img: "https://randomuser.me/api/portraits/men/85.jpg",
  },
  {
    name: "Nadeesha Weerasinghe",
    role: "Customer Relations",
    img: "https://randomuser.me/api/portraits/women/90.jpg",
  },
];

const timeline = [
  {
    year: "2019",
    event: "Ceylon Escape founded with a vision to make Sri Lanka accessible to global travelers.",
  },
  {
    year: "2020",
    event: "Launched our first signature wildlife and cultural tours.",
  },
  {
    year: "2021",
    event: "Reached 1,000+ happy travelers and launched exclusive eco-tours.",
  },
  {
    year: "2022",
    event: "Expanded to offer custom honeymoon and family packages.",
  },
  {
    year: "2023",
    event: "Awarded 'Best Local Tour Operator' by Sri Lanka Tourism Board.",
  },
  {
    year: "2024",
    event: "Partnered with local communities for sustainable tourism projects.",
  },
];

export default function About() {
  return (
    <div className="relative max-w-4xl mx-auto py-16 px-4 sm:px-8">
      {/* Stylish Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-700 text-center tracking-tight drop-shadow">
        About <span className="text-blue-500">Ceylon Escape</span>
      </h1>

      {/* Divider */}
      <div className="flex justify-center mb-8">
        <span className="inline-block w-32 h-1.5 rounded bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 shadow-md"></span>
      </div>

      {/* Highlighted Brand Description */}
      <p className="text-gray-700 mb-8 text-lg text-center leading-relaxed">
        <span className="font-semibold text-blue-600">Ceylon Escape</span> is your gateway to Sri Lanka’s wonders.
        Discover <span className="text-blue-500 font-semibold">curated experiences</span>, unique destinations,
        and the heart of island hospitality.
      </p>

      {/* Features Box with Gentle Background and Shadow */}
      <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-white rounded-2xl shadow-lg p-8 md:p-12 mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-6 text-center">
          Why Travel With Us?
        </h2>
        <ul className="list-none space-y-6">
          <li className="flex items-center justify-center text-lg">
            <span className="text-blue-600 text-2xl mr-4">🌍</span>
            <span className="text-gray-800 font-medium">Expert local guides</span>
          </li>
          <li className="flex items-center justify-center text-lg">
            <span className="text-blue-600 text-2xl mr-4">🗺️</span>
            <span className="text-gray-800 font-medium">Personalized itineraries</span>
          </li>
          <li className="flex items-center justify-center text-lg">
            <span className="text-blue-600 text-2xl mr-4">🌱</span>
            <span className="text-gray-800 font-medium">Sustainable and authentic travel</span>
          </li>
          <li className="flex items-center justify-center text-lg">
            <span className="text-blue-600 text-2xl mr-4">🤝</span>
            <span className="text-gray-800 font-medium">Community partnerships</span>
          </li>
        </ul>
      </div>

      {/* Team Section */}
      <div className="my-16">
        <h2 className="text-2xl font-bold text-blue-800 text-center mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-xl shadow p-6 flex flex-col items-center transition hover:shadow-xl"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 rounded-full border-4 border-blue-200 mb-4 object-cover shadow"
              />
              <h3 className="text-lg font-bold text-blue-700">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-blue-800 text-center mb-8">Our Journey</h2>
        <ol className="relative border-l-4 border-blue-300 ml-6">
          {timeline.map((item, idx) => (
            <li key={item.year} className="mb-10 ml-6">
              <span className="absolute -left-5 flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full ring-4 ring-blue-100 text-white font-bold text-lg shadow-lg">
                {item.year}
              </span>
              <div className="bg-blue-50 rounded-xl shadow px-5 py-3 ml-3">
                <p className="text-gray-700">{item.event}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Optional Decorative Background Element */}
      <div className="absolute left-0 right-0 -z-10 opacity-10 pointer-events-none">
        <svg className="mx-auto mt-20" width="280" height="80">
          <ellipse cx="140" cy="40" rx="130" ry="18" fill="#2563eb" />
        </svg>
      </div>
    </div>
  );
}