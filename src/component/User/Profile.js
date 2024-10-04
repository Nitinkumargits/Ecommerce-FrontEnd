import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import { toast } from "react-toastify";
import profileImg from "../../images/Profile.png";

const Profile = () => {
  const {
    user = {},
    loading,
    isAuthenticated,
    error,
  } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    if (error) {
      toast.error("Please log in to view your profile.");
      navigate("/login");
    }
  }, [navigate, isAuthenticated, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name ? user.name : "User"}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img
                src={user.avatar ? user.avatar?.url : profileImg}
                alt={user.name || "User"}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null; // prevents infinite loop if fallback image fails
                  e.target.src = profileImg; // set fallback image (profile.png) on error
                }}
              />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name || "N/A"}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email || "N/A"}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>
                  {user.createdAt
                    ? new Intl.DateTimeFormat("en-GB", {
                        dateStyle: "long",
                      }).format(new Date(user.createdAt))
                    : "N/A"}
                </p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
