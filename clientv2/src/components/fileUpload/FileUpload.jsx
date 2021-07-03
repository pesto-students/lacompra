import Resizer from "react-image-file-resizer";
import { useDispatch } from "react-redux";

import { uploadImages } from "./fileUpload.slice";

const FileUpload = () => {
  const dispatch = useDispatch();
  const handleFileUpload = (e) => {
    let files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            dispatch(uploadImages(uri));
          },
          "base64"
        );
      }
    }
  };
  return (
    <div>
      <label>
        Choose images
        <input
          type="file"
          hidden
          multiple
          accept="image/*"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
};

export default FileUpload;
