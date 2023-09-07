import styles from "../styles/MyActivities.module.css";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Modal from "react-modal";

import { createActivity, setActivities } from "../reducers/activities";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faXmark } from "@fortawesome/free-solid-svg-icons";

import Activity from "../components/Activity";

function MyActivities() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // États pour les champs de la modal
  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [activityPrice, setActivityPrice] = useState("");
  const activities = useSelector((state) => state.activities.value);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetch(`https://naboo-back-nest-js.vercel.app/activities`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(setActivities(data.activities));
        }
      });
  }, []);

  // Fonction pour vérifier que tous les champs sont bien mis
  function validateForm() {
    const errors = {};
    if (!activityName) {
      errors.activityName = "Erreur : Le nom de l'activité est requis.";
    }
    if (!activityDescription) {
      errors.activityDescription =
        "Erreur : La description de l'activité est requise.";
    }
    if (!activityPrice) {
      errors.activityPrice = "Erreur : Le prix de l'activité est requis.";
    } else if (!/^\d+(\.\d{1,2})?$/.test(activityPrice)) {
      errors.activityPrice = "Erreur : Le prix doit être un nombre valide.";
    }
    return errors;
  }

  // Fonction pour créer une nouvelle activité
  const handleCreate = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Les champs sont valides, continuez avec la création
      fetch("https://naboo-back-nest-js.vercel.app/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: activityName,
          description: activityDescription,
          price: activityPrice,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(createActivity(data.activity));
            setIsModalOpen(false);
          }
        });
    } else {
      setFormErrors(errors);
    }
  };

  const activitiesToShow = activities.map((data, i) => {
    return <Activity key={i} {...data} />;
  });

  return (
    <main className={styles.main}>
      <div className={styles.firstSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.titlesContainer}>
            <h1>Mes Activités</h1>
          </div>
          <div
            className={`${
              activitiesToShow.length < 1
                ? styles.emptyState
                : styles.doNotDisplay
            }`}
          >
            <Image
              src="https://res.cloudinary.com/djfrwyodt/image/upload/v1694080933/Sports_handball_zo7znu.svg"
              alt="No activity logo"
              width={228}
              height={228}
            />
            <p>Vous n'avez pas encore créé d'activité</p>
            <button className={styles.createButton} onClick={openModal}>
              <FontAwesomeIcon className={styles.icon} icon={faCirclePlus} />
              Créer une activité
            </button>
          </div>

          <div
            className={`${
              activitiesToShow.length > 0
                ? styles.activitiesContainer
                : styles.doNotDisplay
            }`}
          >
            {activitiesToShow}
            <hr className={styles.modalSeparator} />
            <button className={styles.createButton} onClick={openModal}>
              <FontAwesomeIcon className={styles.icon} icon={faCirclePlus} />
              Créer une activité
            </button>
          </div>
        </div>
      </div>

      {/* Modal de création d'activité */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.firstContent}>
              <div className={styles.topModal}>
                <h2>Créer une activité</h2>
                <FontAwesomeIcon
                  icon={faXmark}
                  className={styles.closeButton}
                  onClick={() => setIsModalOpen(false)}
                />
              </div>
              <div className={styles.modalInputs}>
                <div className={styles.inputContainer}>
                  <label htmlFor="activityName">Nom de l'activité</label>
                  <input
                    type="text"
                    id="activityName"
                    placeholder="Choisir un nom d'activité"
                    value={activityName}
                    onChange={(e) => setActivityName(e.target.value)}
                  />
                  {formErrors.activityName && (
                    <p className={styles.errorText}>
                      {formErrors.activityName}
                    </p>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="activityDescription">
                    Description de l'activité
                  </label>
                  <textarea
                    id="activityDescription"
                    placeholder="Choisir une description"
                    value={activityDescription}
                    onChange={(e) => setActivityDescription(e.target.value)}
                  />
                  {formErrors.activityDescription && (
                    <p className={styles.errorText}>
                      {formErrors.activityDescription}
                    </p>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="activityPrice">Prix de l'activité</label>
                  <input
                    type="text"
                    id="activityPrice"
                    placeholder="Choisir un prix"
                    value={activityPrice}
                    onChange={(e) => setActivityPrice(e.target.value)}
                  />
                  {formErrors.activityPrice && (
                    <p className={styles.errorText}>
                      {formErrors.activityPrice}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.secondContent}>
              <hr className={styles.modalSeparator} />
              <div className={styles.modalButtons}>
                <button
                  className={`${styles.modalButton} ${styles.cancelButton}`}
                  onClick={() => setIsModalOpen(false)}
                >
                  Annuler
                </button>
                <button
                  className={`${styles.modalButton} ${styles.saveButton}`}
                  onClick={handleCreate}
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MyActivities;
