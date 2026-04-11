import Navbar from "@/components/Navbar";

const teamMembers = [
  { name: "Zodintluanga", role: "Founder & Chief Executive Officer" },
  { name: "Stephen", role: "Co-founder & Director of Operations" },
  { name: "Zothanmawii", role: "Lead Creative Designer" },
  { name: "James Hrahsel", role: "Lead Web Developer" },
  { name: "Kumar Khiangte", role: "Marketing & Branding Head" },
  { name: "Paplo Zote", role: "Customer Support Manager" },
  { name: "Robert Chhakchhuak", role: "Logistics & Fulfillment Head" },
];

const timeline = [
  { year: "2023", desc: "YOZA was founded with just 5 products and a passion for quality." },
  { year: "2024", desc: "Milestone reached: 1,000+ customers and a robust cart/order system." },
  { year: "2025", desc: "Expanded features: mobile responsiveness, full product search, and a growing team." },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <div className="max-w-[1000px] bg-yoza-navbar/30 border border-yoza-navbar mx-auto mt-20 mb-10 p-6 md:p-10 rounded-2xl backdrop-blur-sm shadow-lg">
      <h1 className="text-2xl md:text-4xl font-bold mb-5 text-center border-b-2 border-accent pb-3 text-foreground">
        About YOZA
      </h1>
      <p className="text-base md:text-lg leading-relaxed text-justify text-foreground mb-4">
        YOZA was established with a vision to provide a seamless, stylish, and customer-centric online shopping experience.
        We are committed to offering high-quality products backed by reliable service, affordability, and innovation.
      </p>
      <p className="text-base md:text-lg leading-relaxed text-justify text-foreground">
        From a modest beginning to becoming a trusted name in e-commerce, our journey is driven by a passion for excellence,
        teamwork, and our loyal customers. Every product is carefully selected and every feedback helps shape our future.
      </p>

      {/* Team */}
      <div className="mt-12">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Leadership & Team</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-card/40 p-5 rounded-xl text-center shadow-sm">
              <div className="w-[100px] h-[100px] rounded-full bg-yoza-navbar mx-auto mb-3 flex items-center justify-center text-3xl border-2 border-accent">
                👤
              </div>
              <h3 className="font-semibold text-foreground text-sm">{member.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-14">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Our Journey</h2>
        {timeline.map((item) => (
          <div key={item.year} className="border-l-[3px] border-accent ml-5 pl-5 mb-8">
            <h3 className="text-lg font-semibold text-foreground">{item.year}</h3>
            <p className="text-base text-yoza-brown-muted mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    <footer className="text-center py-5 bg-yoza-navbar/50 text-foreground backdrop-blur-sm text-sm">
      ©2025 YOZA's Store. All rights reserved.
    </footer>
  </div>
);

export default About;
