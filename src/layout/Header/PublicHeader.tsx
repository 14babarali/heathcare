import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function PublicHeader() {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="HealthCare" className="h-8" />
          <span className="font-bold text-xl text-blue-600">HealthCare</span>
        </div>

        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/book">Book Appointment</Link>
        </nav>

        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link to="/contact">Contact</Link>
        </Button>
      </div>
    </header>
  );
}
