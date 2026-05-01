import React from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "components/error/ErrorPage.jsx";

const ErrorView = () => {
  const { code } = useParams();
  
  // High quality monitor error illustration similar to the one provided by user
  const monitorErrorImg = "https://cdn-icons-png.flaticon.com/512/595/595067.png";

  const errorDetails = {
    "400": {
      description: "Bad Request. Permintaan yang Anda kirimkan tidak dapat diproses oleh server.",
      image: monitorErrorImg
    },
    "401": {
      description: "Unauthorized. Anda tidak memiliki izin untuk mengakses halaman ini.",
      image: monitorErrorImg
    },
    "403": {
      description: "Forbidden. Akses ke sumber daya ini dilarang keras.",
      image: monitorErrorImg
    },
    "404": {
        description: "Not Found. Halaman yang Anda cari tidak ditemukan di server Resto Rustaf.",
        image: monitorErrorImg
    }
  };

  const currentError = errorDetails[code] || errorDetails["404"];

  return (
    <ErrorPage 
      errorCode={code || "404"} 
      description={currentError.description} 
      image={currentError.image}
    />
  );
};

export default ErrorView;
