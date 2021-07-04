import Resizer from "react-image-file-resizer";
import { useDispatch, useSelector } from "react-redux";
import "./fileupload.styles.scss";
import { uploadImages } from "./fileUpload.slice";

const FileUpload = () => {
  const dispatch = useDispatch();
  const { loading, error, images } = useSelector((state) => state.fileUpload);

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
  // if (loading === "loading") return <div>...loading...</div>;
  return (
    <div className="fileupload">
      <label
        className={`fileupload_choosecta ${
          loading === "loading" && "fileupload_choosecta-loading"
        }`}
      >
        {loading === "loading" ? "loading..." : "choose picture"}
        <input
          type="file"
          hidden
          multiple
          accept="image/*"
          onChange={handleFileUpload}
        />
      </label>
      <p className="fileupload_totalImg">total images : {images.length}</p>
      <div className="fileupload_images">
        {images.map((image) => (
          <img
            className="fileupload_image"
            key={image.public_id}
            src={image.url}
          />
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
