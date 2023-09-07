import styles from "../styles/Activity.module.css";
import React, { useState, useEffect, useRef } from "react";

import { deleteActivity } from "../reducers/activities";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

function Activity(props) {
  const dispatch = useDispatch();
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + " ...";
    }
    return text;
  };

  const handleDelete = () => {
    fetch("https://naboo-back-nest-js.vercel.app/activities", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activityId: props._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        data.result && dispatch(deleteActivity(props._id));
      });
  };

  return (
    <table className={styles.activityTable}>
      <tbody>
        <tr>
          <td className={styles.image}>
            <Image
              src="https://res.cloudinary.com/djfrwyodt/image/upload/v1694082777/image_291_nd4unk.png"
              alt="Activity photo"
              width={178}
              height={133}
            />
          </td>
          <td className={styles.activityInfo}>
            <table className={styles.activityInfoTable}>
              <tbody>
                <tr>
                  <td className={styles.labelColumn}>
                    <p>Nom :</p>
                    <p>Description :</p>
                    <p>Prix :</p>
                  </td>
                  <td className={styles.valueColumn}>
                    <h3>{truncateText(props.name, 30)}</h3>
                    <h3>{truncateText(props.description, 150)}</h3>
                    <h3>{truncateText(props.price, 10)} €</h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td>
            <button className={styles.deleteButton} onClick={handleDelete}>
              Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Activity;
