import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdCrop } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Icon from "../Elements/Icon";
import { MdPhotoCamera } from "react-icons/md";
import Button from "../Elements/Button";
import Alert from "../Elements/Alert";

export default function CropBanner({
  handleSetImage,
  error,
  handleCrop,
  edit = false,
  prevImage = null,
}) {
  const [crop, setCrop] = useState({
    unit: "px",
    width: 600,
    height: 200,
    aspect: 3,
    minWidth: 48,
    minHeight: 16,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(prevImage);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const imageRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    handleCrop(isEditing);
  }, [handleCrop, isEditing]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
        setIsEditing(true);
        setTimeout(() => {
          const imageWidth = imageRef.current.width;
          const imageHeight = imageRef.current.height;
          console.log(`File size: ${(file.size / 1024).toFixed(2)} KB`);
          let cropWidth;
          let cropHeight;
          if (imageWidth / 3 > imageHeight) {
            cropHeight = imageHeight - 30;
            cropWidth = cropHeight * 3;
          } else {
            cropWidth = imageWidth - 30;
            cropHeight = cropWidth / 3;
          }

          setCrop({
            unit: "px",
            width: cropWidth,
            height: cropHeight,
            aspect: 3,
            minWidth: 48,
            minHeight: 16,
            x: (imageWidth - cropWidth) / 2,
            y: (imageHeight - cropHeight) / 2,
          });

          setCompletedCrop({
            unit: "px",
            width: cropWidth,
            height: cropHeight,
            aspect: 3,
            minWidth: 48,
            minHeight: 16,
            x: (imageWidth - cropWidth) / 2,
            y: (imageHeight - cropHeight) / 2,
          });
        }, 0);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleSaveCrop = async () => {
    if (completedCrop && imageRef.current) {
      const image = imageRef.current;
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const pixelRatio = window.devicePixelRatio; // Adapts for high resolution screens

      canvas.width = completedCrop.width * pixelRatio;
      canvas.height = completedCrop.height * pixelRatio;
      const ctx = canvas.getContext("2d");

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      const base64Image = canvas.toDataURL("image/jpeg");
      setCroppedImageUrl(base64Image);
      const byteString = atob(base64Image.split(",")[1]);
      const byteLength = byteString.length;
      const fileSizeInKB = (byteLength / 1024).toFixed(2);
      console.log(`Cropped image size: ${fileSizeInKB} KB`);
      handleSetImage(base64Image);
      setIsEditing(false);
    }
  };
  const handleEditAgain = () => {
    setIsEditing(true);
    setCroppedImageUrl(null);
  };

  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDelete = () => {
    setImageSrc(null);
    setSelectedFile(null);
    setCroppedImageUrl(null);
    setCompletedCrop(null);
    setIsEditing(false);
    handleSetImage("");
  };

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [imageSrc]);

  return (
    <>
      <div className="w-full  border rounded-md  relative flex justify-center min-h-[18rem] items-center">
        {isEditing && imageSrc && (
          <>
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={3}
              minWidth={48}
              minHeight={16}
              keepSelection={true}
              className="max-w-full max-h-72"
            >
              <img
                className="max-h-72 max-w-full"
                ref={imageRef}
                src={imageSrc}
                alt="Crop preview"
              />
            </ReactCrop>
          </>
        )}
        {croppedImageUrl && !isEditing && (
          <img
            src={croppedImageUrl}
            alt="Preview"
            className="w-full border-2 border-slate-500 rounded-md"
          />
        )}
        {!isEditing && (
          <label
            htmlFor="fileInput"
            className="w-full border flex justify-center items-center h-full absolute rounded-md cursor-pointer top-0 "
          >
            {!croppedImageUrl && (
              <Icon active>
                <MdPhotoCamera />
              </Icon>
            )}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
          </label>
        )}
      </div>
      <div className="mt-2 flex justify-between items-start">
        <div className="flex gap-2">
          {isEditing && imageSrc && (
            <Button onClick={handleSaveCrop}>
              <MdCheck />
            </Button>
          )}
          {croppedImageUrl && !isEditing && (
            <>
              {!edit && croppedImageUrl !== prevImage && (
                <Button onClick={handleEditAgain}>
                  <MdCrop />
                </Button>
              )}
              <Button onClick={handleEditClick}>
                <MdEdit />
              </Button>
              <Button onClick={handleDelete}>
                <MdDelete />
              </Button>
            </>
          )}
        </div>
        <Alert message={error} />
      </div>
    </>
  );
}
