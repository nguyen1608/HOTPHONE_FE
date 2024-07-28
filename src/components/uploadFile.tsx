import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import UpgradeIcon from '@mui/icons-material/Upgrade';
interface UploadImageProps {
  name: string;
  setValue: (name: string, value: string) => void;
  defaultValue?: string;
}

const UploadImage: React.FC<UploadImageProps> = ({ name, setValue, defaultValue = '' }) => {
  const [image, setImage] = useState<string>(defaultValue);

  useEffect(() => {
    // Cập nhật ảnh khi defaultValue thay đổi
    setImage(defaultValue);
  }, [defaultValue]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setValue(name, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        id={`upload-button-${name}`}
        type="file"
        accept="image/*"
        style={{ display: 'none' }} // Ẩn input file
        onChange={handleImageChange}
      />
      <Box component={'div'} className='div_upload' sx={{display:'flex',justifyItems:'center', width:'150px' , alignItems:'center', my:'15px', border:'1px solid #ececec', borderRadius:'5px', height:'30px', pl:'25px', backgroundColor:'#ececec'}}>
      <label htmlFor={`upload-button-${name}`} style={{fontSize:'18px'}}>Tải ảnh lên</label>
      <UpgradeIcon/>
      </Box>
      <div>
      {image && <img src={image} alt="Preview" width="100"/>}
      </div>
    </div>
  );
};

export default UploadImage;
