import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import InternshipNavigator from '@/components/InternshipNavigator';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div>
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-semibold">Welcome, {user.email}</h1>
        <Button onClick={signOut} variant="outline">
          Sign Out
        </Button>
      </div>
      <InternshipNavigator />
    </div>
  );
};

export default Index;
