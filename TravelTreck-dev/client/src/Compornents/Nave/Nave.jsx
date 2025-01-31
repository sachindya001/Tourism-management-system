import { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../Auth/LoginModal"; // Import LoginModal
import SignupModal from "../Auth/SignupModal"; // Import SignupModal
import ProfileModal from "../Auth/ProfileModal";
import CreatePlanModal from "../Plan/CreatPlanModal";
import MyPlans from "../Plan/MyPlans";

const Navbar = () => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [createPlanModalVisible, setCreatePlanModalVisible] = useState(false);
  const [myPlanModalVisible, setMyVisible] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-blue-500">TravelTreck</h1>
          <p className="text-sm text-gray-500">
            Unveil the Wonders of Sri Lanka
          </p>
        </div>
        <div className="hidden md:flex space-x-8 text-gray-700">
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-500">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-500">
            Contact us
          </Link>
        </div>
        <div className="space-x-4">
          {!localStorage.getItem("user") ? (
            <>
              {" "}
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => setIsLoginModalVisible(true)}
              >
                Sign in
              </button>
              <button
                className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={() => setIsSignupModalVisible(true)}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setCreatePlanModalVisible(true)}>
                Create Plan
              </button>

              <button onClick={() => setMyVisible(true)}>My Plans</button>
              <button onClick={() => setProfileModalVisible(true)}>
                Profile
              </button>
            </>
          )}
        </div>
      </div>
      <LoginModal
        visible={isLoginModalVisible}
        onClose={() => setIsLoginModalVisible(false)}
      />
      <SignupModal
        visible={isSignupModalVisible}
        onClose={() => setIsSignupModalVisible(false)}
      />{" "}
      <ProfileModal
        visible={profileModalVisible}
        onClose={() => setProfileModalVisible(false)}
      />
      <CreatePlanModal
        visible={createPlanModalVisible}
        onCancel={() => setCreatePlanModalVisible(false)}
      />
      <MyPlans
        visible={myPlanModalVisible}
        onClose={() => setMyVisible(false)}
      />
    </nav>
  );
};

export default Navbar;
