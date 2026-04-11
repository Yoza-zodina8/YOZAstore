import { useState } from "react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus("Please fill in all fields.");
      return;
    }
    // For now, show success message (EmailJS can be integrated later)
    setStatus("Message sent successfully!");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-card">
      <Navbar />

      {/* Hero */}
      <section className="text-center bg-muted py-10 px-5">
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">Contact Us</h1>
        <p className="text-muted-foreground max-w-[600px] mx-auto text-base">
          We'd love to hear from you! Reach out to us for any questions, feedback, or support.
        </p>
      </section>

      {/* Contact Section */}
      <section className="flex flex-wrap px-5 md:px-20 py-12 gap-10 justify-between">
        {/* Info boxes */}
        <div className="flex-1 min-w-[300px] grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-yoza-navbar p-5 rounded-xl text-center shadow-sm">
            <div className="text-3xl mb-2">📞</div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Phone</h3>
            <p className="text-sm text-muted-foreground">+91 8798040370</p>
          </div>
          <div className="bg-yoza-navbar p-5 rounded-xl text-center shadow-sm">
            <div className="text-3xl mb-2">💬</div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Whatsapp</h3>
            <p className="text-sm text-muted-foreground">+91 8798040370</p>
          </div>
          <div className="bg-yoza-navbar p-5 rounded-xl text-center shadow-sm">
            <div className="text-3xl mb-2">✉️</div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Email</h3>
            <p className="text-sm text-muted-foreground">zodinajongte490@gmail.com</p>
          </div>
          <div className="bg-yoza-navbar p-5 rounded-xl text-center shadow-sm">
            <div className="text-3xl mb-2">🏪</div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Our Shop</h3>
            <p className="text-sm text-muted-foreground">Khatla, Highschool veng, Near TBL middle school</p>
          </div>
          <div className="sm:col-span-2 rounded-xl overflow-hidden mt-5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.123456789!2d92.123456!3d23.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDA3JzI0LjQiTiA5MsKwMDcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Location Map"
            />
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 min-w-[320px]">
          <h2 className="text-2xl font-bold text-foreground mb-3">Get In Touch</h2>
          <p className="text-sm text-muted-foreground mb-5">
            Send us a message and we'll get back to you as soon as possible.
          </p>
          {status && (
            <div className={`p-3 rounded-lg mb-4 text-sm ${status.includes("success") ? "bg-green-100 text-green-700" : "bg-destructive/10 text-destructive"}`}>
              {status}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="p-3 border border-border rounded-xl text-sm outline-none bg-card text-foreground"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="p-3 border border-border rounded-xl text-sm outline-none bg-card text-foreground"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="p-3 border border-border rounded-xl text-sm outline-none bg-card text-foreground"
              required
            />
            <textarea
              placeholder="Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="p-3 border border-border rounded-xl text-sm outline-none resize-none bg-card text-foreground"
              required
            />
            <button
              type="submit"
              className="bg-yoza-contact-btn text-primary-foreground border-none py-3 text-base rounded-xl cursor-pointer font-medium transition-colors hover:bg-yoza-contact-btn-hover"
            >
              Send Now
            </button>
          </form>
        </div>
      </section>

      <ContactFooter />
    </div>
  );
};

export default Contact;
