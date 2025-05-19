
import React from "react";
import Layout from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const Help = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Support request submitted",
      description: "We'll get back to you within 24 hours.",
    });
  };

  const faqs = [
    {
      question: "How do I enroll in a class?",
      answer: "To enroll in a class, navigate to the Explore Classes page and select the class you're interested in. Click the Enroll button and follow the payment instructions to complete your enrollment."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept credit/debit cards, UPI, and netbanking. You can manage your payment methods in your Profile page under the Payment Method section."
    },
    {
      question: "How do I join an online class?",
      answer: "You can join an online class from your Dashboard or My Classes page. Click on the 'Start Session' button when it becomes available (usually 1 minute before the scheduled time)."
    },
    {
      question: "What's the difference between inbound and outbound offline classes?",
      answer: "Inbound classes take place at the tutor's location, and you'll need to travel there. Outbound classes take place at your location, and the tutor will travel to you."
    },
    {
      question: "Can I get a refund if I'm not satisfied with a class?",
      answer: "Yes, we offer a 7-day satisfaction guarantee. If you're not satisfied with a class, you can request a refund within 7 days of enrollment."
    },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Help Center</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="Enter the subject" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Describe your issue or question"
                  required
                ></textarea>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[#8A5BB7] hover:bg-[#8A5BB7]/90"
              >
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Video Tutorials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-lg border p-3">
                <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-2">
                  <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-medium">How to {item === 1 ? 'Join Classes' : item === 2 ? 'Track Progress' : 'Contact Tutors'}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Learn how to {item === 1 ? 'join and participate in your enrolled classes' : item === 2 ? 'track your learning progress effectively' : 'get in touch with your class tutors'}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Help;
