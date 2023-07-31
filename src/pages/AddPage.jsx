import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import LandmarkForm from "../components/LandmarkForm";

const AddPage = () => {
  const history = useHistory();

  async function handleSubmit(newLandmark) {
    newLandmark.uid = "DUMMYUSERID";

    const url = `https://ionic-trips-app-default-rtdb.europe-west1.firebasedatabase.app/landmarks.json`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newLandmark),
    });
    if (response.ok) {
      history.replace("/landmarks");

      console.log("toast okay");
    } else {
      console.log("toast fail here");
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add a new Landmark</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add a new Landmark</IonTitle>
          </IonToolbar>
        </IonHeader>
        <LandmarkForm handleSubmit={handleSubmit} />
      </IonContent>
    </IonPage>
  );
};

export default AddPage;
