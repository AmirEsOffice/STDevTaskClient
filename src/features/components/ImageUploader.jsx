import { useRef, useState } from 'react';
import {Box,Typography} from "@mui/material";
import styled from '@emotion/styled';
import PostImage from "../../assets/images/PostImage.png";
import Avatar from "../../assets/images/AvatarDefault.png";
import { useTheme } from "@emotion/react";
const ImageUploader = ({variant , size,onChange,helperText,error}) => {
  const [image, setImage] = useState(variant==="Avatar"?Avatar:PostImage);
  const inputRef = useRef();
  const theme = useTheme();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImage(url);
    onChange(e); 
  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const onAvatarClick = () => {
    inputRef.current.click();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2}>

      <img 
        src={image} 
        
        style={{width: size, height: size,cursor:"pointer" , borderRadius:10,
        border:error?"1px solid ":null,
        borderColor: "#d32f2f",
      }}
        onClick={onAvatarClick}
    
      /> 
        <VisuallyHiddenInput type="file" 
          accept="image/*"  id="fileInput" ref={inputRef}
          onChange={handleImageChange} />
      {error &&
        <Typography color="error" variant="caption">{helperText}</Typography>
      }    
    </Box>
  );
}

export default ImageUploader;