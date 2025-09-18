import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  ExternalLink, 
  MapPin, 
  DollarSign, 
  Building, 
  Star,
  Filter,
  Search,
  Loader2,
  Target
} from 'lucide-react';
import { StudentProfile, Internship } from './InternshipNavigator';
import { internshipDatabase } from '../data/internshipDatabase';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface InternshipResultsProps {
  profile: StudentProfile;
  onNewSearch: () => void;
}

export const InternshipResults: React.FC<InternshipResultsProps> = ({ profile, onNewSearch }) => {
  const [results, setResults] = useState<Internship[]>([]);
  const [filteredResults, setFilteredResults] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [payFilter, setPayFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    const findMatches = async () => {
      setIsLoading(true);
      
      try {
        // Simulate AI processing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Smart matching algorithm with AI scoring
        const matchedInternships = await evaluateInternships(profile, internshipDatabase);
        
        setResults(matchedInternships);
        setFilteredResults(matchedInternships);
        
        toast({
          title: "🎯 Matches Found!",
          description: `Found ${matchedInternships.length} relevant internship opportunities for you.`,
        });
      } catch (error) {
        console.error('Error finding matches:', error);
        toast({
          title: "Search Error",
          description: "Unable to find matches. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    findMatches();
  }, [profile, toast]);

  useEffect(() => {
    let filtered = results;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(internship =>
        internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(internship =>
        internship.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Apply pay filter
    if (payFilter !== 'all') {
      filtered = filtered.filter(internship =>
        payFilter === 'paid' ? internship.isPaid : !internship.isPaid
      );
    }

    setFilteredResults(filtered);
  }, [results, searchTerm, locationFilter, payFilter]);

  const evaluateInternships = async (profile: StudentProfile, internships: Internship[]): Promise<Internship[]> => {
    // Use Gemini API for enhanced matching insights
    try {
      const response = await supabase.functions.invoke('gemini-search', {
        body: {
          query: `Analyze and provide internship matching insights for a ${profile.fieldOfStudy} student with skills: ${profile.skills.join(', ')}. Location preference: ${profile.locationPreference || 'Any'}`,
          context: {
            profile: profile,
            availableInternships: internships.length,
            internshipTypes: internships.map(i => i.title).slice(0, 10)
          }
        }
      });

      console.log('Gemini API response for matching insights:', response);
      if (response.data?.response) {
        toast({
          title: "AI Insights",
          description: "Enhanced matching powered by AI",
        });
      }
    } catch (error) {
      console.error('Error calling Gemini API for insights:', error);
    }

    const evaluatedInternships = internships.map(internship => {
      let score = 0;
      const matchedSkills: string[] = [];

      // Skill matching (40% of score)
      profile.skills.forEach(skill => {
        if (internship.skillsRequired.some(reqSkill => 
          reqSkill.toLowerCase().includes(skill.toLowerCase()) || 
          skill.toLowerCase().includes(reqSkill.toLowerCase())
        )) {
          score += 40 / profile.skills.length;
          matchedSkills.push(skill);
        }
      });

      // Field relevance (30% of score)
      if (internship.title.toLowerCase().includes(profile.fieldOfStudy.toLowerCase()) ||
          internship.description.toLowerCase().includes(profile.fieldOfStudy.toLowerCase())) {
        score += 30;
      }

      // Location preference (20% of score)
      if (profile.locationPreference && 
          internship.location.toLowerCase().includes(profile.locationPreference.toLowerCase())) {
        score += 20;
      }

      // Pay preference (10% of score)
      if (profile.paidPreference === 'both' ||
          (profile.paidPreference === 'paid' && internship.isPaid) ||
          (profile.paidPreference === 'unpaid' && !internship.isPaid)) {
        score += 10;
      }

      return {
        ...internship,
        matchScore: Math.min(Math.round(score), 100),
        matchedSkills
      };
    });

    // Filter internships based on preferences
    let filtered = evaluatedInternships;
    
    if (profile.paidPreference !== 'both') {
      filtered = filtered.filter(internship =>
        profile.paidPreference === 'paid' ? internship.isPaid : !internship.isPaid
      );
    }

    // Sort by match score (highest first)
    return filtered
      .filter(internship => internship.matchScore! > 20) // Only show decent matches
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
      .slice(0, 20); // Limit to top 20 results
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'outline';
  };

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <Card className="bg-white/95 backdrop-blur-sm shadow-elevated border-0 p-8 max-w-md mx-auto">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <h3 className="text-xl font-semibold">Finding Your Perfect Matches</h3>
            <p className="text-muted-foreground text-center">
              Our AI is analyzing {internshipDatabase.length} internship opportunities to find the best matches for your profile...
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with profile summary */}
      <Card className="bg-white/95 backdrop-blur-sm shadow-elevated border-0 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Welcome back, {profile.name}! 
            </h2>
            <p className="text-muted-foreground">
              {profile.fieldOfStudy} • {profile.yearOfStudy} • {profile.skills.slice(0, 3).join(', ')}
              {profile.skills.length > 3 && ` +${profile.skills.length - 3} more`}
            </p>
          </div>
          <Button variant="outline" onClick={onNewSearch}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            New Search
          </Button>
        </div>
      </Card>

      {/* Filters */}
      <Card className="bg-white/95 backdrop-blur-sm shadow-card border-0 p-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          
          <div className="flex-1 max-w-xs">
            <Input
              placeholder="Search internships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9"
            />
          </div>

          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-40 h-9">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="san francisco">San Francisco</SelectItem>
              <SelectItem value="new york">New York</SelectItem>
              <SelectItem value="london">London</SelectItem>
              <SelectItem value="seattle">Seattle</SelectItem>
            </SelectContent>
          </Select>

          <Select value={payFilter} onValueChange={setPayFilter}>
            <SelectTrigger className="w-32 h-9">
              <SelectValue placeholder="Pay" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="paid">Paid Only</SelectItem>
              <SelectItem value="unpaid">Unpaid Only</SelectItem>
            </SelectContent>
          </Select>

          <div className="text-sm text-muted-foreground">
            {filteredResults.length} of {results.length} results
          </div>
        </div>
      </Card>

      {/* Results */}
      <div className="grid gap-6">
        {filteredResults.length === 0 ? (
          <Card className="bg-white/95 backdrop-blur-sm shadow-card border-0 p-8 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No matches found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </Card>
        ) : (
          filteredResults.map((internship, index) => (
            <Card key={internship.id} className="bg-white/95 backdrop-blur-sm shadow-card border-0 hover:shadow-elevated transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl text-foreground">{internship.title}</CardTitle>
                      <Badge variant={getScoreBadgeVariant(internship.matchScore || 0)} className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        {internship.matchScore}% match
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {internship.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {internship.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {internship.isPaid ? (internship.salary || 'Paid') : 'Unpaid'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-muted-foreground">#{index + 1}</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {internship.description}
                </p>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {internship.skillsRequired.map((skill, idx) => (
                      <Badge 
                        key={idx} 
                        variant={internship.matchedSkills?.includes(skill) ? 'default' : 'outline'}
                        className={internship.matchedSkills?.includes(skill) ? 'bg-success text-success-foreground' : ''}
                      >
                        {skill}
                        {internship.matchedSkills?.includes(skill) && (
                          <Star className="ml-1 h-3 w-3 fill-current" />
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>

                {internship.matchedSkills && internship.matchedSkills.length > 0 && (
                  <div>
                    <h4 className="font-medium text-success mb-2">Your Matching Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {internship.matchedSkills.map((skill, idx) => (
                        <Badge key={idx} variant="default" className="bg-success text-success-foreground">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className={`text-lg font-semibold ${getScoreColor(internship.matchScore || 0)}`}>
                    {internship.matchScore! >= 80 ? '🎯 Excellent Match' : 
                     internship.matchScore! >= 60 ? '✨ Good Match' : 
                     '👍 Potential Match'}
                  </div>
                  <Button asChild className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                    <a href={internship.applicationLink} target="_blank" rel="noopener noreferrer">
                      Apply Now
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};