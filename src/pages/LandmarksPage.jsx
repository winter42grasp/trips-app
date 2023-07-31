import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import { useState } from "react";
import LandmarkCard from "../components/LandmarkCard";

const LandmarksPage = () => {
  const [landmarks, setLandmarks] = useState([]);
  async function loadLandmarks() {
    const url =
      "https://ionic-trips-app-default-rtdb.europe-west1.firebasedatabase.app/landmarks.json";
    const response = await fetch(url);
    const data = await response.json();
    const landmarksArray = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
    setLandmarks(landmarksArray);
  }

  useIonViewWillEnter(() => {
    loadLandmarks();
  });

  async function handleRefesh(event) {
    await loadLandmarks();
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  }

  const user = {
    username: "Username",
    image: "https://place-hold.it/200",
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Discover Landmarks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Discover Landmarks</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRefresher slot="fixed" onIonRefresh={handleRefesh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonList>
          {landmarks.map((item) => (
            <LandmarkCard
              landmark={item}
              user={user}
              key={item.id}
              reload={loadLandmarks}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default LandmarksPage;
