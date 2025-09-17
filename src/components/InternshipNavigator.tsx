import React, { useState } from 'react';
import { StudentForm } from './StudentForm';
import { InternshipResults } from './InternshipResults';
import { Card } from '@/components/ui/card';
import { GraduationCap, Target, Search } from 'lucide-react';

export interface StudentProfile {
  name: string;
  education: string;
  fieldOfStudy: string;
  yearOfStudy: string;
  skills: string[];
  locationPreference: string;
  paidPreference: 'paid' | 'unpaid' | 'both';
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  description: string;
  skillsRequired: string[];
  location: string;
  isPaid: boolean;
  salary?: string;
  applicationLink: string;
  matchScore?: number;
  matchedSkills?: string[];
}

const InternshipNavigator = () => {
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleProfileSubmit = (profile: StudentProfile) => {
    setStudentProfile(profile);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <GraduationCap className="h-16 w-16 text-white drop-shadow-glow" />
              <Target className="h-6 w-6 text-warning absolute -top-1 -right-1" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Internship Navigator
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            AI-powered internship matching that finds the perfect opportunities based on your skills, 
            education, and preferences
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {!studentProfile ? (
            <Card className="bg-white/95 backdrop-blur-sm shadow-elevated border-0 p-8">
              <div className="text-center mb-8">
                <Search className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Tell us about yourself
                </h2>
                <p className="text-muted-foreground">
                  Share your profile details to get personalized internship recommendations
                </p>
              </div>
              <StudentForm 
                onSubmit={handleProfileSubmit} 
                isLoading={isSearching}
                setIsLoading={setIsSearching}
              />
            </Card>
          ) : (
            <InternshipResults 
              profile={studentProfile} 
              onNewSearch={() => setStudentProfile(null)}
            />
          )}
        </div>

        {/* Features */}
        {!studentProfile && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Matching</h3>
              <p className="text-white/80">AI analyzes your profile to find the most relevant opportunities</p>
            </div>
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Personalized Results</h3>
              <p className="text-white/80">Tailored recommendations based on your skills and preferences</p>
            </div>
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Application</h3>
              <p className="text-white/80">Direct links to apply for internships that match your profile</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipNavigator;