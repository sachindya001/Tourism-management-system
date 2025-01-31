import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import userService from "../../services/userService";

const UserNameEmail = ({ id }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    userService
      .getUserById(id)
      .then((result) => {
        setUser(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ fontWeight: "bold", fontSize: 18 }}>
        {user ? `${user.name}` : "N/A"}
      </div>
      <div>{user ? `${user.email}` : "N/A"}</div>
    </div>
  );
};

// Define prop types
UserNameEmail.propTypes = {
  id: PropTypes.string.isRequired, // Assuming id is a required string
};

export default UserNameEmail;
