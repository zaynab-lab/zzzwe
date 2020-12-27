import { useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  const [value, setValue] = useState("");
  const [file, setFile] = useState("");
  const [filesrc, setFilesrc] = useState("");
  const [completed, setCompleted] = useState(0);
  return (
    <div className={styles.container}>
      <h1>{completed}%</h1>
      <img width="200rem" src={filesrc} alt="" />
      <input
        className="number"
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => {
          const Tfile = e.target.files[0];
          const reader = new FileReader();
          reader.onload = () => {
            reader.readyState === 2 && setFilesrc(reader.result);
          };
          if (Tfile) {
            reader.readAsDataURL(Tfile);
            var blob = Tfile.slice(0, Tfile.size, "image/webp");
            var newFile = new File([blob], "id", { type: "image/webp" });
            setFile(newFile);
          }
        }}
      />
      <button
        onClick={async () => {
          const formData = new FormData();
          await formData.append("file", file, file.name);
          const config = {
            onUploadProgress: (progressEvent) => {
              setCompleted(
                Math.round((progressEvent.loaded / progressEvent.total) * 100)
              );
            }
          };

          axios
            .post("/api/hello", formData, config)
            .then((res) => {
              res && console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        send
      </button>
    </div>
  );
}
