import {
  IonButton,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  IonText,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";
import { camera, time } from "ionicons/icons";
import { Geolocation } from "@capacitor/geolocation";

const LandmarkForm = ({ landmark, handleSubmit }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState([
    {
      latitude: null,
      longitude: null,
    },
  ]);
  const [timestamp, setTimestamp] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (landmark) {
      setTitle(landmark.title);
      setLocation(landmark.location);
      setTimestamp(landmark.timestamp);
      setDescription(landmark.description);
      setImage(landmark.image);
    }
  }, [landmark]);

  function submitEvent(event) {
    event.preventDefault();
    const formData = {
      title: title,
      location: location,
      timestamp: timestamp,
      description: description,
      image: image,
    };
    handleSubmit(formData);
  }

  async function takePhoto() {
    const imageOptions = {
      quality: 10,
      width: 300,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    };
    const image = await Camera.getPhoto(imageOptions);
    const imageUrl = image.dataUrl;
    setImage(imageUrl);
  }
  const getDateAndLocation = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    setTimeout(() => {
      setLocation({
        longitude: coordinates.coords.latitude,
        latitude: coordinates.coords.longitude,
      });
      setTimestamp(new Date(coordinates.timestamp).toLocaleDateString("en-US"));

      console.log(location, timestamp);
    }),
      1000;
  };

  return (
    <form onSubmit={submitEvent}>
      <IonItem>
        <IonInput
          label="Title"
          labelPlacement="floating"
          value={title}
          placeholder="Landmark Post Title"
          onIonChange={(event) => setTitle(event.target.value)}
        />
      </IonItem>
      <IonItem>
        <IonTextarea
          label="Description"
          labelPlacement="floating"
          value={description}
          placeholder="Tell us more about your Landmark"
          onIonChange={(event) => setDescription(event.target.value)}
        ></IonTextarea>
      </IonItem>
      <IonItem>
        {location.longitude && location.latitude ? (
          <IonText label="Geolocation">
            Longitude: {location.longitude}, Latitude: {location.latitude}
          </IonText>
        ) : (
          <p>Set Time and Location</p>
        )}
        <IonButton slot="end" onClick={getDateAndLocation}>
          Set Time and Location
        </IonButton>
      </IonItem>
      <IonItem onClick={takePhoto}>
        <IonLabel>Chose Image</IonLabel>
        <IonButton>
          <IonIcon icon={camera} />
        </IonButton>
      </IonItem>
      {image && <IonImg src={image} />}
      <IonButton type="submit" expand="full">
        Save
      </IonButton>
    </form>
  );
};
export default LandmarkForm;
