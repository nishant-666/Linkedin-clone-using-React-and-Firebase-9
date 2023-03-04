import React, { useState, useMemo } from "react";
import {
  getSingleStatus,
  getSingleUser,
  editProfile,
} from "../../../api/FirestoreAPI";
import PostsCard from "../PostsCard";
import { Button, Modal, Divider } from "antd";
import { AiOutlinePlus, AiOutlineCloseCircle } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import FileUploadModal from "../FileUploadModal";
import { uploadImage as uploadImageAPI } from "../../../api/ImageUpload";
import "./index.scss";

export default function ProfileCard({ onEdit, currentUser }) {
  let location = useLocation();
  const [allStatuses, setAllStatus] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };

  const addSkills = () => {
    setSkills([...skills, skill]);
    setSkill("");
  };
  const removeSkills = (item) => {
    setSkills(skills.filter((skill) => skill !== item));
  };
  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser.id,
      setModalOpen,
      setProgress,
      setCurrentImage
    );
  };

  const updateSkill = () => {
    editProfile(currentUser.id, { skills });
    setModal(false);
  };

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);

  return (
    <>
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />
      <div className="profile-card">
        <div className="edit-btn">
          <HiOutlinePencil className="edit-icon" onClick={onEdit} />
        </div>
        <div className="profile-info">
          <div>
            <img
              className="profile-image"
              onClick={() => setModalOpen(true)}
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink
              }
              alt="profile-image"
            />
            <h3 className="userName">
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
            </h3>
            <p className="heading">
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>
            {(currentUser.city || currentUser.country) &&
            (currentProfile?.city || currentProfile?.country) ? (
              <p className="location">
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.city}, ${currentUser.country} `
                  : `${currentProfile?.city}, ${currentUser.country}`}
              </p>
            ) : (
              <></>
            )}
            {currentUser.website || currentProfile?.website ? (
              <a
                className="website"
                target="_blank"
                href={
                  Object.values(currentProfile).length === 0
                    ? `${currentUser.website}`
                    : currentProfile?.website
                }
              >
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.website}`
                  : currentProfile?.website}
              </a>
            ) : (
              <></>
            )}
          </div>

          <div className="right-info">
            <p className="college">
              {Object.values(currentProfile).length === 0
                ? currentUser.college
                : currentProfile?.college}
            </p>
            <p className="company">
              {Object.values(currentProfile).length === 0
                ? currentUser.company
                : currentProfile?.company}
            </p>
          </div>
        </div>
        <p className="about-me">
          {Object.values(currentProfile).length === 0
            ? currentUser.aboutMe
            : currentProfile?.aboutMe}
        </p>
      </div>
      <div className="skills-card">
        <div className="add-skills">
          <h3>Skills</h3>

          {Object.values(currentProfile).length !== 0 ? (
            <></>
          ) : (
            <AiOutlinePlus
              size={30}
              className="add-icon"
              onClick={() => setModal(true)}
            />
          )}
        </div>
        <div className="show-skills">
          {Object.values(currentProfile).length === 0
            ? currentUser.skills?.map((skill) => {
                return (
                  <div>
                    <p>{skill}</p>
                    <Divider />
                  </div>
                );
              })
            : currentProfile?.skills?.map((skill) => {
                return (
                  <div>
                    <p>{skill}</p>
                    <Divider />
                  </div>
                );
              })}
        </div>
      </div>
      <div className="post-status-main">
        {allStatuses?.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} />
            </div>
          );
        })}
      </div>

      <div className="skills-modal">
        <Modal
          title="Skills"
          centered
          open={modal}
          onOk={() => setModal(false)}
          onCancel={() => setModal(false)}
          footer={[
            <Button key="submit" type="primary" onClick={addSkills}>
              Add
            </Button>,
            <Button key="submit" type="primary" onClick={updateSkill}>
              Update Skills
            </Button>,
          ]}
        >
          <div className="skill-container">
            {skills.map((skill, index) => {
              return (
                <div className="skills-inner">
                  {index + 1}. {skill}{" "}
                  <AiOutlineCloseCircle
                    className="close-icon"
                    color="#212121"
                    onClick={() => removeSkills(skill)}
                  />
                </div>
              );
            })}
          </div>
          <input
            onChange={(event) => setSkill(event.target.value)}
            className="skills-input"
            value={skill}
            placeholder="Add a Skill"
          />
        </Modal>
      </div>
    </>
  );
}
