export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white text-center py-4 mt-12">
      &copy; {new Date().getFullYear()} Ceylon Escape. All rights reserved.
      <div className="mt-2 flex justify-center gap-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </footer>
  );
}