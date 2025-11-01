export default function EnLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // English layout should override the parent RTL direction
  return (
    <div dir="ltr" lang="en" className="font-inter">
      {children}
    </div>
  );
}
