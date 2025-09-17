import { Internship } from '../components/InternshipNavigator';

export const internshipDatabase: Internship[] = [
  {
    id: '1',
    title: 'Software Engineering Intern',
    company: 'Google',
    description: 'Join our world-class engineering team to work on products used by billions of users. You\'ll collaborate with experienced engineers on real projects that impact users globally.',
    skillsRequired: ['JavaScript', 'Python', 'React', 'Computer Science', 'Git'],
    location: 'Mountain View, CA',
    isPaid: true,
    salary: '$8,000/month',
    applicationLink: 'https://careers.google.com/internships'
  },
  {
    id: '2',
    title: 'Data Science Intern',
    company: 'Netflix',
    description: 'Help us understand user behavior and improve recommendation algorithms. Work with massive datasets and cutting-edge ML techniques.',
    skillsRequired: ['Python', 'Machine Learning', 'SQL', 'Statistics', 'R'],
    location: 'Los Gatos, CA',
    isPaid: true,
    salary: '$7,500/month',
    applicationLink: 'https://jobs.netflix.com/internships'
  },
  {
    id: '3',
    title: 'Product Management Intern',
    company: 'Meta',
    description: 'Drive product strategy and execution for products used by billions. Learn from world-class product managers and ship features to millions of users.',
    skillsRequired: ['Product Management', 'Analytics', 'Business Strategy', 'Communication'],
    location: 'Menlo Park, CA',
    isPaid: true,
    salary: '$8,500/month',
    applicationLink: 'https://www.metacareers.com/internships'
  },
  {
    id: '4',
    title: 'UX Design Intern',
    company: 'Apple',
    description: 'Create intuitive and beautiful user experiences for Apple\'s ecosystem of products. Work alongside world-class designers and researchers.',
    skillsRequired: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research', 'Design Thinking'],
    location: 'Cupertino, CA',
    isPaid: true,
    salary: '$7,000/month',
    applicationLink: 'https://jobs.apple.com/internships'
  },
  {
    id: '5',
    title: 'Marketing Analytics Intern',
    company: 'Airbnb',
    description: 'Analyze marketing performance and user acquisition strategies. Help optimize campaigns across multiple channels and markets.',
    skillsRequired: ['Marketing', 'Analytics', 'SQL', 'Excel', 'Data Analysis'],
    location: 'San Francisco, CA',
    isPaid: true,
    salary: '$6,500/month',
    applicationLink: 'https://careers.airbnb.com/internships'
  },
  {
    id: '6',
    title: 'Frontend Developer Intern',
    company: 'Stripe',
    description: 'Build the future of online payments. Work on developer tools and merchant-facing products that power the internet economy.',
    skillsRequired: ['React', 'TypeScript', 'CSS', 'JavaScript', 'Web Development'],
    location: 'San Francisco, CA',
    isPaid: true,
    salary: '$8,000/month',
    applicationLink: 'https://stripe.com/jobs/internships'
  },
  {
    id: '7',
    title: 'Business Development Intern',
    company: 'Salesforce',
    description: 'Help expand Salesforce\'s partnerships and drive business growth. Work with enterprise clients and strategic partnerships.',
    skillsRequired: ['Business Development', 'Sales', 'Communication', 'CRM', 'Negotiation'],
    location: 'San Francisco, CA',
    isPaid: true,
    salary: '$5,500/month',
    applicationLink: 'https://salesforce.wd1.myworkdayjobs.com/internships'
  },
  {
    id: '8',
    title: 'Content Creator Intern',
    company: 'TikTok',
    description: 'Create engaging content and help shape TikTok\'s brand voice. Work with creators and develop content strategies.',
    skillsRequired: ['Content Creation', 'Social Media', 'Video Editing', 'Marketing', 'Creative Writing'],
    location: 'Los Angeles, CA',
    isPaid: true,
    salary: '$4,500/month',
    applicationLink: 'https://careers.tiktok.com/internships'
  },
  {
    id: '9',
    title: 'Machine Learning Research Intern',
    company: 'OpenAI',
    description: 'Advance the field of artificial intelligence through cutting-edge research. Work on foundation models and AI safety.',
    skillsRequired: ['Machine Learning', 'Python', 'Research', 'Deep Learning', 'Mathematics'],
    location: 'San Francisco, CA',
    isPaid: true,
    salary: '$9,000/month',
    applicationLink: 'https://openai.com/careers/internships'
  },
  {
    id: '10',
    title: 'Cybersecurity Intern',
    company: 'Microsoft',
    description: 'Protect Microsoft\'s infrastructure and customers from cyber threats. Learn about enterprise security and threat detection.',
    skillsRequired: ['Cybersecurity', 'Network Security', 'Ethical Hacking', 'Risk Assessment'],
    location: 'Redmond, WA',
    isPaid: true,
    salary: '$7,200/month',
    applicationLink: 'https://careers.microsoft.com/internships'
  },
  {
    id: '11',
    title: 'Financial Analyst Intern',
    company: 'Goldman Sachs',
    description: 'Gain exposure to investment banking, asset management, and financial markets. Work on real client transactions.',
    skillsRequired: ['Finance', 'Financial Modeling', 'Excel', 'Analytics', 'Economics'],
    location: 'New York, NY',
    isPaid: true,
    salary: '$5,000/month',
    applicationLink: 'https://www.goldmansachs.com/careers/internships'
  },
  {
    id: '12',
    title: 'Nonprofit Program Intern',
    company: 'Doctors Without Borders',
    description: 'Support humanitarian programs and help coordinate medical missions worldwide. Make a real impact on global health.',
    skillsRequired: ['Public Health', 'Program Management', 'Communication', 'Research'],
    location: 'New York, NY',
    isPaid: false,
    applicationLink: 'https://www.doctorswithoutborders.org/careers/internships'
  },
  {
    id: '13',
    title: 'Environmental Research Intern',
    company: 'Tesla',
    description: 'Research sustainable technologies and help accelerate the world\'s transition to sustainable energy.',
    skillsRequired: ['Environmental Science', 'Research', 'Sustainability', 'Data Analysis'],
    location: 'Palo Alto, CA',
    isPaid: true,
    salary: '$6,000/month',
    applicationLink: 'https://www.tesla.com/careers/internships'
  },
  {
    id: '14',
    title: 'Game Development Intern',
    company: 'Epic Games',
    description: 'Build the next generation of gaming experiences. Work on Unreal Engine and Fortnite with industry veterans.',
    skillsRequired: ['Game Development', 'C++', 'Unreal Engine', 'Programming', '3D Graphics'],
    location: 'Cary, NC',
    isPaid: true,
    salary: '$6,800/month',
    applicationLink: 'https://www.epicgames.com/careers/internships'
  },
  {
    id: '15',
    title: 'Journalism Intern',
    company: 'The New York Times',
    description: 'Report on breaking news and contribute to investigative journalism. Learn from award-winning journalists.',
    skillsRequired: ['Journalism', 'Writing', 'Research', 'Communication', 'Media'],
    location: 'New York, NY',
    isPaid: true,
    salary: '$3,500/month',
    applicationLink: 'https://nytimes.wd5.myworkdayjobs.com/internships'
  },
  {
    id: '16',
    title: 'Biotech Research Intern',
    company: 'Moderna',
    description: 'Contribute to groundbreaking mRNA research and vaccine development. Work in state-of-the-art laboratories.',
    skillsRequired: ['Biology', 'Biochemistry', 'Research', 'Laboratory Skills', 'Biotechnology'],
    location: 'Cambridge, MA',
    isPaid: true,
    salary: '$5,800/month',
    applicationLink: 'https://modernatx.wd1.myworkdayjobs.com/internships'
  },
  {
    id: '17',
    title: 'Space Technology Intern',
    company: 'SpaceX',
    description: 'Help make life multiplanetary. Work on rocket engines, spacecraft, and satellite technologies.',
    skillsRequired: ['Aerospace Engineering', 'Mechanical Engineering', 'Python', 'CAD', 'Physics'],
    location: 'Hawthorne, CA',
    isPaid: true,
    salary: '$7,500/month',
    applicationLink: 'https://www.spacex.com/careers/internships'
  },
  {
    id: '18',
    title: 'E-commerce Intern',
    company: 'Amazon',
    description: 'Optimize customer experiences and drive business growth across Amazon\'s marketplace and retail operations.',
    skillsRequired: ['E-commerce', 'Business Analysis', 'SQL', 'Excel', 'Operations'],
    location: 'Seattle, WA',
    isPaid: true,
    salary: '$6,200/month',
    applicationLink: 'https://www.amazon.jobs/internships'
  },
  {
    id: '19',
    title: 'Legal Intern',
    company: 'ACLU',
    description: 'Support civil liberties cases and legal research. Contribute to important constitutional law cases.',
    skillsRequired: ['Legal Research', 'Writing', 'Constitutional Law', 'Civil Rights'],
    location: 'New York, NY',
    isPaid: false,
    applicationLink: 'https://www.aclu.org/careers/internships'
  },
  {
    id: '20',
    title: 'AI Ethics Researcher',
    company: 'Partnership on AI',
    description: 'Research the societal implications of artificial intelligence and help develop ethical AI guidelines.',
    skillsRequired: ['AI Ethics', 'Research', 'Philosophy', 'Policy', 'Machine Learning'],
    location: 'Remote',
    isPaid: false,
    applicationLink: 'https://www.partnershiponai.org/internships'
  },
  {
    id: '21',
    title: 'Sports Analytics Intern',
    company: 'ESPN',
    description: 'Analyze sports performance data and create insights for broadcasts and digital content.',
    skillsRequired: ['Sports Analytics', 'Statistics', 'Python', 'R', 'Data Visualization'],
    location: 'Bristol, CT',
    isPaid: true,
    salary: '$4,200/month',
    applicationLink: 'https://espncareers.com/internships'
  },
  {
    id: '22',
    title: 'Fashion Design Intern',
    company: 'Gucci',
    description: 'Assist in designing luxury fashion collections and learn about high-end fashion production.',
    skillsRequired: ['Fashion Design', 'Adobe Creative Suite', 'Sketching', 'Textile Knowledge'],
    location: 'New York, NY',
    isPaid: true,
    salary: '$3,800/month',
    applicationLink: 'https://careers.gucci.com/internships'
  },
  {
    id: '23',
    title: 'Architecture Intern',
    company: 'Foster + Partners',
    description: 'Work on world-renowned architectural projects and sustainable building design.',
    skillsRequired: ['Architecture', 'AutoCAD', 'Revit', 'SketchUp', 'Design'],
    location: 'London, UK',
    isPaid: true,
    salary: '£2,000/month',
    applicationLink: 'https://www.fosterandpartners.com/careers/internships'
  },
  {
    id: '24',
    title: 'Music Production Intern',
    company: 'Spotify',
    description: 'Support artists and work on music recommendation algorithms. Help shape the future of music discovery.',
    skillsRequired: ['Music Production', 'Audio Engineering', 'Data Analysis', 'Music Theory'],
    location: 'Stockholm, Sweden',
    isPaid: true,
    salary: '€3,500/month',
    applicationLink: 'https://www.spotifyjobs.com/internships'
  },
  {
    id: '25',
    title: 'Renewable Energy Intern',
    company: 'SolarCity',
    description: 'Accelerate the adoption of clean energy through innovative solar solutions and energy storage.',
    skillsRequired: ['Renewable Energy', 'Engineering', 'Project Management', 'Sustainability'],
    location: 'Remote',
    isPaid: true,
    salary: '$5,200/month',
    applicationLink: 'https://www.tesla.com/solarcity/internships'
  }
];