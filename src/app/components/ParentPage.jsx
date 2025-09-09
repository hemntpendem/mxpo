import { usePathname } from "next/navigation";

export default function ParentPage() {
  const pathname = usePathname(); // current URL
  const [user, setUser] = useState(null); 
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setShowPopup(false);
    }
  }, []);

  const handleProfileSubmit = (userData) => {
    setUser(userData);
    setShowPopup(false); 
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <>
      {/* Only show popup on homepage */}
      {pathname === "/" && showPopup && (
        <ProfileSetupPopup onSubmit={handleProfileSubmit} />
      )}

      {user && <MyProfile user={user} />}
    </>
  );
}
