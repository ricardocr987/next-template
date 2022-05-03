import Footer from '../Footer'
import Navbar from '../Navbar';

const NavItems = [
  { label: 'Articles', ref: 'articles' },
  { label: 'Projects', ref: 'projects' },
  { label: 'Contact', ref: 'contact' },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function AppLayout ({ children }: LayoutProps) {
  return (
    <>
      <Navbar NavItems={NavItems}/>
      {children}
      <Footer/>
    </>
  );
};
