import {
  IonCard,
  IonItem,
  useIonActionSheet,
  useIonAlert,
  useIonModal,
  IonAvatar,
  IonLabel,
  IonButton,
  IonIcon,
  IonImg,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/react";
import UpdateModal from "./UpdateModal";
import { menu } from "ionicons/icons";

const LandmarkCard = ({ landmark, user, reload }) => {
  const [presentActionSheet] = useIonActionSheet();
  const [presentDeleteAlert] = useIonAlert();
  const [presentUpdateModal, dismissUpdateModal] = useIonModal(
    <UpdateModal
      landmark={landmark}
      dismiss={handleDismissUpdateModal}
      reload={reload}
    />
  );
  const showActionSheet = (event) => {
    event.preventDefault();
    presentActionSheet({
      buttons: [
        { text: "Edit", handler: () => presentUpdateModal(landmark) },
        {
          text: "delete",
          role: "destructive",
          handler: showDeleteConfirmation,
        },
        { text: "close", role: "cancel" },
      ],
    });
  };

  const showDeleteConfirmation = () => {
    presentDeleteAlert({
      header: "Delete",
      message: "Sure delete?",
      buttons: [
        { text: "Ys", role: "destructive", handler: deleteLandmark },
        { text: "No" },
      ],
    });
  };

  function handleDismissUpdateModal() {
    dismissUpdateModal();
  }

  const deleteLandmark = async () => {
    const url = `https://ionic-trips-app-default-rtdb.europe-west1.firebasedatabase.app/landmarks/${landmark.id}.json`;
    const res = await fetch(url, {
      method: "DELETE",
    });
    console.log(res);
    reload();
  };

  return (
    <IonCard>
      <IonItem>
        <IonAvatar slot="start">
          <img src={user.image} alt={landmark.uid} />
        </IonAvatar>
        <IonLabel>{landmark.uid}</IonLabel>
        <IonButton onClick={showActionSheet}>
          <IonIcon slot="icon-only" icon={menu} />
        </IonButton>
      </IonItem>
      <IonImg className="landmark-image" src={landmark.image} />
      <IonCardHeader>
        <IonCardTitle>
          <h3>{landmark.title}</h3>
        </IonCardTitle>
        <IonCardSubtitle>
          <p>
            Longitude: {landmark.location.longitude}, Latitude:
            {landmark.location.latitude}, Date: {landmark.timestamp}
          </p>
        </IonCardSubtitle>
        <IonCardContent>
          <h4>{landmark.description}</h4>
        </IonCardContent>
      </IonCardHeader>
    </IonCard>
  );
};
export default LandmarkCard;
