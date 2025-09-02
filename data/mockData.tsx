import { Clock, ThumbsUp, Globe, User, Users, Trophy } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "/";

export const aboutData = {
  heading: "Digital Innovation & Technology Solutions",
  content:
    "We are a leading technology company specializing in web development, mobile applications, and digital marketing solutions. Our team of experts is dedicated to helping businesses grow through innovative technology solutions and creative strategies.",
};

export const servicesFeatures = [
  {
    icon: Clock,
    title: "QUICK RESPONSE",
    desc: "We understand our clients precious time & we respond quickly to support you.",
  },
  {
    icon: ThumbsUp,
    title: "100% SATISFACTION",
    desc: "Your satisfaction is our satisfaction. Our products & services will satisfy you 100%.",
  },
  {
    icon: Globe,
    title: "CREATIVE SERVICE",
    desc: "We have our creative team which works continuously to give better service to you.",
  },
];

interface Counter {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  target: number;
  label: string;
}

export const counters: Counter[] = [
  { icon: User, target: 258, label: "Clients" },
  { icon: User, target: 420471, label: "Transactions" },
  { icon: Users, target: 10500, label: "Users" },
  { icon: Trophy, target: 18, label: "Appreciations" },
];

// Development services images
const app1 = `${BASE_URL}development/app1.webp`;
const app2 = `${BASE_URL}development/app2.webp`;
const app3 = `${BASE_URL}development/app3.webp`;
const app4 = `${BASE_URL}development/app4.webp`;
const app5 = `${BASE_URL}development/app1.webp`;

interface Service {
  id: number;
  heading: string;
  image: string;
}

export const developmentServices: Service[] = [
  { id: 1, heading: "Web Development", image: app1 },
  { id: 2, heading: "Mobile App Development", image: app2 },
  { id: 3, heading: "E-commerce Solutions", image: app3 },
  { id: 4, heading: "Custom Software", image: app4 },
  { id: 5, heading: "API Development", image: app5 },
];

// Digital marketing services images
const marketing1 = `${BASE_URL}development/digital1.webp`;
const marketing2 = `${BASE_URL}development/digital2.webp`;
const marketing3 = `${BASE_URL}development/digital3.webp`;
const marketing4 = `${BASE_URL}development/digital4.webp`;
const marketing5 = `${BASE_URL}development/digital5.webp`;

export const digitalMarketingServices: Service[] = [
  { id: 1, heading: "SEO Optimization", image: marketing1 },
  { id: 2, heading: "Social Media Marketing", image: marketing2 },
  { id: 3, heading: "Content Marketing", image: marketing3 },
  { id: 4, heading: "PPC Advertising", image: marketing4 },
  { id: 5, heading: "Email Marketing", image: marketing5 },
];

interface Pricing {
  title: string;
  price: string;
  subtitle: string;
  features: string[];
  buttonText: string;
  buttonUrl: string;
}

export const pricings: Pricing[] = [
  {
    title: "Basic Plan",
    price: "9,999",
    subtitle: "Perfect for startups",
    features: ["5 Pages Website", "Responsive Design", "Basic SEO", "1 Month Support"],
    buttonText: "Get Started",
    buttonUrl: "#contact",
  },
  {
    title: "Professional Plan",
    price: "19,999",
    subtitle: "Best for growing businesses",
    features: [
      "10 Pages Website",
      "Advanced Features",
      "SEO Optimization",
      "3 Months Support",
      "Analytics Setup",
    ],
    buttonText: "Get Started",
    buttonUrl: "#contact",
  },
  {
    title: "Enterprise Plan",
    price: "39,999",
    subtitle: "For large organizations",
    features: [
      "Unlimited Pages",
      "Custom Development",
      "Advanced SEO",
      "6 Months Support",
      "Priority Support",
    ],
    buttonText: "Get Started",
    buttonUrl: "#contact",
  },
];

// Testimonials images
const testimonial4 = `${BASE_URL}development/testimonial-4.webp`;
const testimonial5 = `${BASE_URL}development/testimonial-5.webp`;
const testimonial2 = `${BASE_URL}development/testimonial-2.webp`;

interface Testimonial {
  name: string;
  designation: string;
  comment: string;
  photo: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Subhi",
    designation: "YouTuber",
    comment:
      "For us, our Youtube promotion is fantastic and has been extremely well organised / promoted. Thank you Dench Infotech for all your help!",
    photo: testimonial4,
  },
  {
    name: "Anil Sawhney",
    designation: "Director, Godson Organic",
    comment:
      "Dench Infotech is an excellent complement to the mobile app that they had already developed for us. We got lots of good remarks from friends & relatives.",
    photo: testimonial5,
  },
  {
    name: "Rajat Kishore",
    designation: "CEO, Lokaso Media",
    comment:
      "The System developed by Dench Infotech is very easy to navigate and we like the compatibility between driver & customer app. Thanks again for simple for us..",
    photo: testimonial2,
  },
];

interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "What services do you offer?",
    answer:
      "We offer web development, mobile app development, digital marketing, SEO optimization, and custom software solutions.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on complexity. A basic website takes 2-4 weeks, while complex applications can take 2-6 months.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes, we provide ongoing support and maintenance for all our projects. Support duration depends on the chosen package.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "Our pricing is project-based and depends on requirements. We offer flexible packages starting from ₹9,999.",
  },
];
