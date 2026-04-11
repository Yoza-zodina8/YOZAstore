import { Link } from "react-router-dom";

const ContactFooter = () => (
  <footer className="bg-yoza-footer-dark text-primary-foreground pt-12 pb-8 px-5 md:px-20">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-5">
      <div>
        <div className="text-xl font-bold mb-2 text-[#ffcc9c]">YOZA</div>
        <p className="text-sm text-[#ccc]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.</p>
      </div>
      <div>
        <h4 className="mb-2 text-base font-semibold">Our Store</h4>
        <ul className="list-none p-0">
          <li className="mb-2"><Link to="/" className="text-[#ddd] no-underline text-sm hover:underline">Home</Link></li>
          <li className="mb-2"><Link to="/about" className="text-[#ddd] no-underline text-sm hover:underline">About</Link></li>
          <li className="mb-2"><Link to="/contact" className="text-[#ddd] no-underline text-sm hover:underline">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="mb-2 text-base font-semibold">Further Links</h4>
        <ul className="list-none p-0">
          <li className="mb-2"><span className="text-[#ddd] text-sm">Term & Condition</span></li>
          <li className="mb-2"><span className="text-[#ddd] text-sm">News</span></li>
        </ul>
      </div>
      <div>
        <h4 className="mb-2 text-base font-semibold">Get In Touch</h4>
        <p className="text-sm text-[#ccc] mb-2">Khatla, Highschool veng</p>
        <p className="text-sm text-[#ccc] mb-2">+91 8798040370</p>
        <p className="text-sm text-[#ccc]">zodinajongte490@gmail.com</p>
      </div>
    </div>
    <p className="text-center text-xs text-[#aaa] border-t border-yoza-brown pt-5">
      ©2025 YOZA's Store. All rights reserved.
    </p>
  </footer>
);

export default ContactFooter;
