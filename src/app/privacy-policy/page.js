import PrivacyPolicy from '@/components/sections/PrivacyPolicy/PrivacyPolicy';

export const metadata = {
  title: 'Privacy Policy',
  description:
    'Read how Luxury Leather & Furniture Care collects, uses and protects your personal information.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}