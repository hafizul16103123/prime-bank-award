"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
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

          <div className="absolute bottom-6 left-6 right-6 bg-black/50 text-white p-6 rounded-xl">
            <p className="text-sm">Contact Us</p>
            <h2 className="text-2xl font-semibold mt-2">
              Get In Touch With Our Team
            </h2>

            <p className="text-sm mt-2 text-gray-200">
              We believe in building strong relationships with our customers.
              Reach us anytime through our support channels.
            </p>

            <div className="flex gap-6 mt-4 text-sm">
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
            Simpletree Anarkoli <br />
            Gulshan Avenue, Dhaka-1212 <br />
            Bangladesh
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
}