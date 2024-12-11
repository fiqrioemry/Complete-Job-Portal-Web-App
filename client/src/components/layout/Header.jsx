import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGlobal } from "../../context/GlobalProvider";
const Header = () => {
  const navigate = useNavigate();
  const { user } = useGlobal();
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/">
          <h3>Logo</h3>
        </Link>

        <nav>
          <Link to="product">product</Link>
        </nav>

        {/*  authenticate */}
        {user && (
          <div className="space-x-4">
            <Button onClick={() => navigate("/dashboard")}>username</Button>
          </div>
        )}

        {/* not authenticate */}
        {!user && (
          <div className="space-x-4">
            <Button variant="outline" onClick={() => navigate("/signin")}>
              Sign-In
            </Button>
            <Button onClick={() => navigate("/signup")}>Sign-Up</Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
