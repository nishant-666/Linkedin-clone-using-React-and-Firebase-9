import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../../../api/AuthAPI";
import { getCurrentUser } from "../../../api/FirestoreAPI";
import "./index.scss";

export default function ProfilePopup() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div className="popup-card">
      <ul className="popup-options">
        <li
          className="popup-option"
          onClick={() =>
            navigate("/profile", {
              state: {
                id: currentUser?.userID,
              },
            })
          }
        >
          Profile
        </li>
        <li className="popup-option" onClick={onLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
}
