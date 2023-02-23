import React, { useState } from "react";
import { editProfile } from "../../../api/FirestoreAPI";
import "./index.scss";

export default function ProfileEdit({ onEdit, currentUser }) {
  const [editInputs, setEditInputs] = useState({});
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
  };

  const updateProfileData = async () => {
    await editProfile(currentUser?.id, editInputs);
    await onEdit();
  };
  return (
    <div className="profile-card">
      <div className="edit-btn">
        <button onClick={onEdit}>GO back</button>
      </div>

      <div className="profile-edit-inputs">
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Name"
          name="name"
        />

        <input
          onChange={getInput}
          className="common-input"
          placeholder="Headline"
          name="headline"
        />
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Location"
          name="location"
        />

        <input
          onChange={getInput}
          className="common-input"
          placeholder="Company"
          name="company"
        />

        <input
          onChange={getInput}
          className="common-input"
          placeholder="College"
          name="college"
        />
      </div>
      <div className="save-container">
        <button className="save-btn" onClick={updateProfileData}>
          Save
        </button>
      </div>
    </div>
  );
}
