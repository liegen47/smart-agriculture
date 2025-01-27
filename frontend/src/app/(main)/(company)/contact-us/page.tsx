import { Logo } from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MailIcon, MapPinIcon, MessageCircle, PhoneIcon } from "lucide-react";
import Link from "next/link";

const ContactPage = () => (
  <div className="min-h-screen flex items-center justify-center py-16 bg-gradient-to-b from-green-50 to-white ">
    <div className="w-full max-w-screen-xl mx-auto px-6 xl:px-0">
      {/* Heading Section */}
      <div className="text-center">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <b className="text-green-600">Contact Us</b>
        <h2 className="mt-3 text-2xl md:text-4xl font-black tracking-tight text-gray-900">
          Get in Touch with Our Agriculture Experts 🌾
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-600">
          We&apos;re here to help you with your agricultural needs. Whether
          you&apos;re a farmer, admin, or just curious, feel free to reach out!
        </p>
      </div>

      {/* Contact Options and Form */}
      <div className="mt-24 grid lg:grid-cols-2 gap-16 md:gap-10">
        {/* Contact Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
          {/* Email */}
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 flex items-center justify-center bg-green-50 text-green-600 rounded-full">
              <MailIcon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-bold text-xl text-gray-900">Email</h3>
            <p className="my-2.5 text-gray-600">
              Reach out for general inquiries or support.
            </p>
            <Link
              className="font-bold text-green-600 tracking-tight hover:underline"
              href="mailto:support@smartagri.com"
            >
              support@NatureSense.com
            </Link>
          </div>

          {/* Live Chat */}
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 flex items-center justify-center bg-green-50 text-green-600 rounded-full">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-bold text-xl text-gray-900">Live Chat</h3>
            <p className="my-2.5 text-gray-600">
              Chat with our team in real-time for quick assistance.
            </p>
            <Link
              className="font-bold text-green-600 tracking-tight hover:underline"
              href="#"
            >
              Start New Chat
            </Link>
          </div>

          {/* Office */}
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 flex items-center justify-center bg-green-50 text-green-600 rounded-full">
              <MapPinIcon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-bold text-xl text-gray-900">Office</h3>
            <p className="my-2.5 text-gray-600">
              Visit us at our headquarters for a face-to-face discussion.
            </p>
            <Link
              className="font-bold text-green-600 tracking-tight hover:underline"
              href="https://map.google.com"
              target="_blank"
            >
              123 Agri Street, Farmland <br /> VIC 3000 AU
            </Link>
          </div>

          {/* Phone */}
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 flex items-center justify-center bg-green-50 text-green-600 rounded-full">
              <PhoneIcon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-bold text-xl text-gray-900">Phone</h3>
            <p className="my-2.5 text-gray-600">
              Call us during business hours for immediate assistance.
            </p>
            <Link
              className="font-bold text-green-600 tracking-tight hover:underline"
              href="tel:+1234567890"
            >
              +1 (234) 567-890
            </Link>
          </div>
        </div>

        {/* Contact Form */}
        <Card className="bg-green-50 shadow-none border border-green-100">
          <CardContent className="p-6 md:p-10">
            <form>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                {/* First Name */}
                <div className="col-span-2 sm:col-span-1">
                  <Label htmlFor="firstName" className="text-gray-700">
                    First Name
                  </Label>
                  <Input
                    placeholder="First name"
                    id="firstName"
                    className="mt-1 bg-white h-11"
                  />
                </div>

                {/* Last Name */}
                <div className="col-span-2 sm:col-span-1">
                  <Label htmlFor="lastName" className="text-gray-700">
                    Last Name
                  </Label>
                  <Input
                    placeholder="Last name"
                    id="lastName"
                    className="mt-1 bg-white h-11"
                  />
                </div>

                {/* Email */}
                <div className="col-span-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="mt-1 bg-white h-11"
                  />
                </div>

                {/* Message */}
                <div className="col-span-2">
                  <Label htmlFor="message" className="text-gray-700">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    className="mt-1 bg-white"
                    rows={6}
                  />
                </div>

                {/* Terms Agreement */}
                <div className="col-span-2 flex items-center gap-2">
                  <Checkbox id="acceptTerms" />
                  <Label htmlFor="acceptTerms" className="text-gray-700">
                    You agree to our{" "}
                    <Link href="#" className="underline text-green-600">
                      terms and conditions
                    </Link>
                    .
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                className="mt-6 w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export default ContactPage;
