import React from "react";
import { useDropzone } from "react-dropzone";

// const getColor = (props) => {
//   if (props.isDragAccept) {
//     return "#00e676";
//   }
//   if (props.isDragReject) {
//     return "#ff1744";
//   }
//   if (props.isFocused) {
//     return "#2196f3";
//   }
//   return "#eeeeee";
// };

const styles = {
  backgroundColor: "blue",
  height: "40px",
  width: "40px",
};

export default function IamgeDrop(props) {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { "image/*": [] } });

  return (
    <div className="container" styles={styles}>
      <div {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </div>
  );
}
