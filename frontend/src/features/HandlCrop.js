const handleCropImage = () => {
    const canvas = document.createElement('canvas');
    const imageObj = new Image();
    imageObj.src = image ? image : user.image;
    imageObj.onload = function () {
      const ctx = canvas.getContext('2d');
      const scaleX = imageObj.naturalWidth / imageObj.width;
      const scaleY = imageObj.naturalHeight / imageObj.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      ctx.drawImage(
        imageObj,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
      const formData = new FormData();
      canvas.toBlob(blob => {
        formData.append('image', blob);
        formData.append('Content-Type', 'multipart/form-data');
        fetch('http://localhost:8000/api/addimage', {
          method: 'POST',
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwt')}`,
          },
          credentials: 'include',
          body: formData,
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            setImage(null);
          })
          .catch(err => console.log(err));
      });
    };
  };
  