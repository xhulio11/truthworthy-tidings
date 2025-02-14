
import { NewspaperIcon } from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="max-w-2xl mx-auto text-center">
        <NewspaperIcon className="w-16 h-16 mx-auto mb-6 text-slate-700" />
        <h1 className="text-4xl font-bold text-slate-900 mb-6">About Balanced News</h1>
        <p className="text-lg text-slate-600 mb-8">
          We are committed to delivering accurate, unbiased news coverage that helps our readers stay informed and make better decisions. Our team of dedicated journalists works tirelessly to bring you the most important stories from around the world.
        </p>
        <div className="space-y-6 text-left">
          <div className="p-6 bg-slate-50 rounded-lg">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Our Mission</h2>
            <p className="text-slate-600">
              To provide balanced, factual reporting that empowers readers with knowledge and understanding of the world around them.
            </p>
          </div>
          <div className="p-6 bg-slate-50 rounded-lg">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Our Values</h2>
            <p className="text-slate-600">
              Accuracy, integrity, and transparency are at the core of everything we do. We believe in presenting multiple perspectives to help our readers form their own informed opinions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
