import { Icons } from "@/components/icons";


interface Location {
  latitude: number;
  longitude: number;
}

export interface Field {
  _id: string;
  name: string;
  location: Location;
  cropType: string[]; 
  areaSize: number;
  soilHealth: string;
  cropHealth: string;
  yieldTrends: [];
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number; 
}

export interface NavItem {
    title: string;
    url: string;
    disabled?: boolean;
    external?: boolean;
    shortcut?: [string, string];
    icon?: keyof typeof Icons;
    label?: string;
    description?: string;
    isActive?: boolean;
    items?: NavItem[];
  }

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] 
  },
  {
    title: 'Fields',
    url: '/dashboard/fields',
    icon: 'fields',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: false,

    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen',
        shortcut: ['m', 'm']
      },
    ]
  },
];

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "farmer";
  isApproved: boolean;
  clientReferenceId: string | null;
  createdAt: Date;

  // Subscription-related fields
  stripeCustomerId: string | null;
  subscriptionStatus: "active" | "inactive" | "past_due" | "canceled" | "trialing";
  subscriptionPlanId: string | null;
  subscriptionStart: Date | null;
  subscriptionEnd: Date | null;
  trialEnd: Date | null;
  cancelAtPeriodEnd: boolean;
}