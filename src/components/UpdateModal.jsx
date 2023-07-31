import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import LandmarkForm from "./LandmarkForm";

function UpdateModal({ landmark, dismiss, reload }) {
  console.log(landmark.id);
  async function editLandmark(landmarkEdit) {
    const url = `https://ionic-trips-app-default-rtdb.europe-west1.firebasedatabase.app/landmarks/${landmark.id}.json`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ ...landmark, ...landmarkEdit }),
    });
    console.log(response);
    dismiss();
    reload();
  }
  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonButton onClick={() => dismiss()}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Edit Landmark</IonTitle>
        </IonToolbar>
      </IonHeader>
      <LandmarkForm landmark={landmark} handleSubmit={editLandmark} />
    </IonContent>
  );
}
export default UpdateModal;
