import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
const CostumCard = ({cardData,handleClickDelete}) => {
  const [hoveredCard, setHoveredCard] = useState(null);

 const navigate = useNavigate();

  return (
    <Card 
    onMouseEnter={() => setHoveredCard(cardData?.id)}
    onMouseLeave={() => setHoveredCard(null)}
    
    sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 200 }}
        //image="https://placehold.co/200"
        image =  {cardData?.image || "https://placehold.co/200"}
        alt="Post Title"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom color={"GrayText"} variant="h5" component="h4">
          Name
        </Typography>
        <Typography
          gutterBottom
          color={"GrayText"}
          variant="body1"
          component="h4"
        >
          {cardData?.name}
        </Typography>
        <Typography gutterBottom color={"GrayText"} variant="h5" component="h4">
          Description
        </Typography>
        <Typography
          gutterBottom
          color={"GrayText"}
          variant="body1"
          component="h4"
        >
           {cardData?.description}
        </Typography>
        <Typography gutterBottom color={"GrayText"} variant="h5" component="h4">
          Category
        </Typography>
        <Typography
          gutterBottom
          color={"GrayText"}
          variant="body1"
          component="h4"
        >
          {cardData?.title}
        </Typography>
      </CardContent>
      {hoveredCard === cardData?.id && (
       <CardActions sx={{ alignItems: "flex-start" }}>
        <IconButton aria-label="edit" onClick={()=>navigate(`/post/${cardData?.id}`)}>
            <EditIcon color="info" />
        </IconButton>
        <IconButton aria-label="delete" onClick={()=>handleClickDelete(cardData?.id)}>
            <DeleteIcon color="error" />
        </IconButton>
     </CardActions>
      )}
    </Card>
  );
};

export default CostumCard;
