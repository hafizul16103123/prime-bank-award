"use client";
import { Button } from "@base-ui/react";
import { Badge } from "lucide-react";
import Image from "next/image";

export const ContactHeader = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="container mx-auto">
        <div className="relative rounded-2xl overflow-hidden">
          <Image
            src="/images/contact.png"
            alt="Contact"
            width={1500}
            height={1500}
            className="w-full h-[800px] object-cover"
          />

          <div className="absolute bg-white/20 h-500 backdrop-blur-md bottom-6 left-6 right-6  text-white p-6 rounded-xl">
            <p className="text-sm mb-3">Contact Us</p>

            <h2 className="text-4xl font-semibold mb-3">
              Get In Touch
              <br /> With Our Team
            </h2>
            <div className="space-y-4 text-sm font-light leading-relaxed text-primary-foreground sm:space-y-5 sm:text-base md:text-lg lg:text-xl lg:leading-snug">
              <p>
                At Prime Bank, we believe in building lasting relationships with
                our customers. Our multi-channel support approach ensures you
                can reach us through your preferred communication method,
                whether that's phone, email, in-person at our branches, or
                through our digital platforms.
              </p>
              <p>
                We're available 24/7 for emergencies and during business hours
                for general inquiries. Your satisfaction is our priority, and we
                won't rest until your issue is resolved.
              </p>
            </div>
            <div className="flex justify-end gap-6 mt-4 text-sm">
              {/* <Image
                src="/images/contact_image2.png"
                alt="Contact"
                width={50}
                height={50}
                className="w-[500px] h-[50px] object-cover"
              /> */}
              <div>
                <p className="font-medium">24/7 Helpline</p>
                <p className="text-lg">16218</p>
              </div>

              <div>
                <p className="font-medium">WhatsApp</p>
                <p className="text-lg">013 211 6218</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="container mx-auto grid md:grid-cols-2 gap-6 mt-8">
        <div className="rounded-2xl border border-tartiary bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Office Address</h3>
          <p className="text-sm text-gray-600">
            Simpletree Anarkali <br /> Holding No: 89, Plot No: 03, Block:
            CWS(A)
            <br />
            Gulshan Avenue, Gulshan-1
            <br />
            Dhaka-1212, Bangladesh
          </p>
        </div>

        <div className="rounded-2xl border border-tartiary bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Email Us</h3>
          <p className="text-sm text-gray-600">cardinfo@primebank.com.bd</p>

          <Button className="mt-4">Send Email</Button>
        </div>
      </div>
    </div>
  );
};
