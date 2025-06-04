import { meetOurTeamData, standData } from "@/assets/data";
import PageHeader from "@/components/PageHeader";
import { Home } from "lucide-react";
import aboutImg from "../assets/about_img.jpg";

const AboutPage = () => {
  return (
    <section className="space-y-14">
      <PageHeader
        title="About Ecom"
        description="We're passionate about bringing you high-quality products at
          affordable prices, with exceptional customer service that makes
          shopping a pleasure."
        links={[
          { title: "Home", href: "/", icon: Home },
          { title: "About Us", href: "#" },
        ]}
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h2 className="pb-5 text-3xl font-medium">Our Story</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-6 md:text-lg">
              Founded in 2020, Ecom started as a small family business with a
              simple mission: to make quality products accessible to everyone.
              What began as a local store has grown into a trusted online
              destination for thousands of customers worldwide.
            </p>
            <p className="text-muted-foreground leading-6 md:text-lg">
              We believe that shopping should be simple, enjoyable, and
              transparent. That's why we carefully curate our product selection,
              work directly with manufacturers, and maintain honest pricing
              without hidden fees.
            </p>
            <p className="text-muted-foreground leading-6 md:text-lg">
              Today, we're proud to serve customers across the globe, but we
              haven't forgotten our roots. Every order is still handled with the
              same personal care and attention to detail that we've always been
              known for.
            </p>
          </div>
        </div>
        <div className="">
          <img
            src={aboutImg}
            alt="about image"
            className="size-full rounded-md object-cover"
          />
        </div>
      </div>

      <div>
        <h2 className="mb-7 text-center text-2xl font-medium md:text-3xl">
          What We Stand For
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {standData.map((item, idx) => (
            <div
              className="flex flex-col items-center justify-center rounded-md border border-black p-5 dark:border-white"
              key={idx}
            >
              <div className="bg-primary/10 mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
                <item.icon className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-medium"> {item.title}</h3>
              <p className="text-muted-foreground text-center">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-muted p-4 text-center md:p-8 lg:p-12">
        <h2 className="mb-10 text-2xl font-medium md:mb-12 md:text-3xl">
          By the Numbers
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="">
            <div className="text-2xl font-medium md:text-3xl">50k+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
          <div>
            <div className="text-2xl font-medium md:text-3xl">1000+</div>
            <div className="text-muted-foreground">Products Sold</div>
          </div>

          <div>
            <div className="text-2xl font-medium md:text-3xl">99%</div>
            <div className="text-muted-foreground">Customer Satisfaction</div>
          </div>
          <div>
            <div className="text-2xl font-medium md:text-3xl">24/7</div>
            <div className="text-muted-foreground">Customer Support</div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-7 text-center text-2xl font-medium md:text-3xl">
          Meet Our Team
        </h2>
        <div className="grid gap-9 md:grid-cols-3">
          {meetOurTeamData.map((item, idx) => (
            <div
              className="flex flex-col items-center justify-center rounded-md border border-black p-5 dark:border-white"
              key={idx}
            >
              <div className="mb-3 size-19">
                <img
                  src={item.img}
                  alt={item.title}
                  className="size-full rounded-full object-cover"
                />
              </div>
              <h3 className="mb-1 text-xl font-medium"> {item.title}</h3>
              <p className="text-muted-foreground mb-2 text-sm">{item.role}</p>
              <p className="text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
