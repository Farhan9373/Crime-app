export default function Footer() {
    return (
      <footer className="footer bg-neutral text-neutral-content p-10 text-white ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
          {/* Services Section */}
          <div>
            <h6 className="text-xl font-semibold mb-4">Services</h6>
            <a href="#" className="block mb-2 hover:text-sky-500">Branding</a>
            <a href="#" className="block mb-2 hover:text-sky-500">Design</a>
            <a href="#" className="block mb-2 hover:text-sky-500">Marketing</a>
            <a href="#" className="block mb-2 hover:text-sky-500">Advertisement</a>
          </div>
  
          {/* Company Section */}
          <div>
            <h6 className="text-xl font-semibold mb-4">Company</h6>
            <a href="#" className="block mb-2 hover:text-sky-500">About us</a>
            <a href="#" className="block mb-2 hover:text-sky-500">Contact</a>
            <a href="#" className="block mb-2 hover:text-sky-500">Jobs</a>
            <a href="#" className="block mb-2 hover:text-sky-500">Press kit</a>
          </div>
  
          {/* Legal Section */}
          <div>
            <h6 className="text-xl font-semibold mb-4">Legal</h6>
            <a href="#" className="block mb-2 hover:text-sky-500">Terms of use</a>
            <a href="#" className="block mb-2 hover:text-sky-500">Privacy policy</a>
            <a href="#" className="block mb-2 hover:text-sky-500">Cookie policy</a>
          </div>
        </div>
  
        <div className="text-center mt-10">
          <p className="text-sm text-neutral-400">© {new Date().getFullYear()} Farhan Ahmad. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  