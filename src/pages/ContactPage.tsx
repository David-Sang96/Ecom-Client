import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";

const frequentlyData = [
  {
    title: "What are your shipping options?",
    description:
      "We offer free standard shipping on orders over $50. Express shipping is available for $9.99, and overnight shipping for $19.99.",
  },
  {
    title: "What is your return policy?",
    description:
      "We accept returns within 30 days of purchase. Items must be in original condition with tags attached.",
  },
  {
    title: "Do you ship internationally?",
    description:
      "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location.",
  },
  {
    title: "How can I track my order?",
    description:
      "Once your order ships, you'll receive a tracking number via email. You can also check your order status in your account.",
  },
];

const ContactPage = () => {
  return (
    <section>
      <div className="mx-auto mb-4 max-w-2xl space-y-2 pb-4 text-center">
        <h2 className="text-3xl font-medium">Contact Us</h2>
        <p className="text-muted-foreground leading-6 md:text-lg">
          We'd love to hear from you. Send us a message and we'll respond as
          soon as possible.
        </p>
      </div>

      <div className="mb-10 gap-10 lg:flex">
        <div className="space-y-5 lg:w-2/6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin />
                <span className="text-2xl font-medium">Visit Our Store</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground ps-3">
                123 Main Street
                <br />
                New York, NY 10001
                <br />
                United States
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone />
                <span className="text-2xl font-medium">Call Us</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground ps-3">
                Phone: (123) 456-7890
                <br />
                Toll Free: 1-800-ECOM-1
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail />
                <span className="text-2xl font-medium">Email Us</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground ps-3">
                General: Info@ecomElite.com
                <br />
                Support: support@ecomElite.com
                <br />
                Sales: sales@ecomElite.com
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock />
                <span className="text-2xl font-medium">Business Hours</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground ps-3">
                Monday - Friday 9:00 AM - 6:00 PM
                <br />
                Saturday: 10:00 AM - 4:00 PM
                <br />
                Sunday: Closed
                <br />
                <div className="text-sm">
                  *Customer support available 24/7 online
                </div>
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="gap-4 lg:flex">
                  <div className="w-full space-y-3">
                    <Label htmlFor="first-name" className="text-base">
                      First Name *
                    </Label>
                    <Input required id="first-name" />
                  </div>
                  <div className="w-full space-y-3">
                    <Label htmlFor="last-name" className="text-base">
                      Last Name *
                    </Label>
                    <Input required id="last-name" />
                  </div>
                </div>
                <div className="w-full space-y-3">
                  <Label htmlFor="email" className="text-base">
                    Email Address *
                  </Label>
                  <Input type="email" id="email" required />
                </div>
                <div className="w-full space-y-3">
                  <Label htmlFor="phone-number" className="text-base">
                    Phone Number
                  </Label>
                  <Input type="tel" id="phone-number" />
                </div>

                <div className="w-full space-y-3">
                  <Label htmlFor="subject" className="text-base">
                    Subject *
                  </Label>
                  <Select required>
                    <SelectTrigger className="w-full cursor-pointer">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">
                          Customer Support
                        </SelectItem>
                        <SelectItem value="order">Order Question</SelectItem>
                        <SelectItem value="return">Return/Exchange</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full space-y-3">
                  <Label htmlFor="message" className="text-base">
                    Message *
                  </Label>
                  <Textarea
                    placeholder="Please describe how we can help you..."
                    id="message"
                    className="min-h-[120px]"
                    required
                  />
                </div>
                <Button className="w-full cursor-pointer py-5" type="submit">
                  Send Message <Send />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="py-4">
        <h2 className="pb-8 text-center text-3xl font-medium">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {frequentlyData.map((item, idx) => (
            <div className="" key={idx}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-medium">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>{item.description}</CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
