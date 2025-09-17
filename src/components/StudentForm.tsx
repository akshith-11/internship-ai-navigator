import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus, Search, Loader2 } from 'lucide-react';
import { StudentProfile } from './InternshipNavigator';

interface StudentFormProps {
  onSubmit: (profile: StudentProfile) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, isLoading, setIsLoading }) => {
  const [formData, setFormData] = useState<StudentProfile>({
    name: '',
    education: '',
    fieldOfStudy: '',
    yearOfStudy: '',
    skills: [],
    locationPreference: '',
    paidPreference: 'both',
  });
  
  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.skills.length === 0) {
      alert('Please add at least one skill');
      return;
    }
    
    setIsLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      onSubmit(formData);
      setIsLoading(false);
    }, 1500);
  };

  const handleSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="p-6 bg-gradient-card border-border/50">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="mt-1"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <Label htmlFor="education" className="text-sm font-medium">University/Institution *</Label>
              <Input
                id="education"
                type="text"
                value={formData.education}
                onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                required
                className="mt-1"
                placeholder="e.g., Stanford University"
              />
            </div>
          </div>
        </Card>

        {/* Academic Information */}
        <Card className="p-6 bg-gradient-card border-border/50">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Academic Details</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fieldOfStudy" className="text-sm font-medium">Field of Study *</Label>
              <Input
                id="fieldOfStudy"
                type="text"
                value={formData.fieldOfStudy}
                onChange={(e) => setFormData(prev => ({ ...prev, fieldOfStudy: e.target.value }))}
                required
                className="mt-1"
                placeholder="e.g., Computer Science, Marketing"
              />
            </div>

            <div>
              <Label htmlFor="yearOfStudy" className="text-sm font-medium">Year of Study *</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, yearOfStudy: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freshman">Freshman (1st Year)</SelectItem>
                  <SelectItem value="sophomore">Sophomore (2nd Year)</SelectItem>
                  <SelectItem value="junior">Junior (3rd Year)</SelectItem>
                  <SelectItem value="senior">Senior (4th Year)</SelectItem>
                  <SelectItem value="graduate">Graduate Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>

      {/* Skills Section */}
      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Skills & Expertise</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={handleSkillKeyPress}
              placeholder="Add a skill (e.g., JavaScript, Marketing, Design)"
              className="flex-1"
            />
            <Button 
              type="button" 
              onClick={addSkill}
              variant="outline"
              size="icon"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {formData.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-destructive" 
                    onClick={() => removeSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Preferences */}
      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="location" className="text-sm font-medium">Preferred Location</Label>
            <Input
              id="location"
              type="text"
              value={formData.locationPreference}
              onChange={(e) => setFormData(prev => ({ ...prev, locationPreference: e.target.value }))}
              className="mt-1"
              placeholder="e.g., San Francisco, Remote, New York"
            />
          </div>

          <div>
            <Label htmlFor="paidPreference" className="text-sm font-medium">Compensation Preference</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, paidPreference: value as 'paid' | 'unpaid' | 'both' }))}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="both">Both Paid & Unpaid</SelectItem>
                <SelectItem value="paid">Paid Only</SelectItem>
                <SelectItem value="unpaid">Unpaid Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="flex justify-center">
        <Button 
          type="submit" 
          size="lg" 
          disabled={isLoading}
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300 px-8 py-3 text-lg font-semibold"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Finding Your Perfect Match...
            </>
          ) : (
            <>
              <Search className="mr-2 h-5 w-5" />
              Find My Internships
            </>
          )}
        </Button>
      </div>
    </form>
  );
};