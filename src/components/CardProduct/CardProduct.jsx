import React from "react";
import { Link } from "react-router-dom";

// card
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";

const CardProduct = (props) => {
  return (
    <Card
      sx={{
        maxWidth: 245,
        maxHeight: "435px",
        minHeight: "330px",
        margin: "auto",
      }}
    >
      <CardActionArea>
        <Link to={'/products/' + props.link}>
          <CardMedia
            component="img"
            height="340"
            image={props.linkImage}
            alt="green iguana"
          />
        </Link>
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              ":hover": {
                color: "#DE294D",
              },
            }}
          >
            <Link to={'/products/' + props.link}>{props.Title}</Link>
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {props.price?.toLocaleString('it-IT')}
            <span>
              {" "}
              <b>
                <u>đ</u>
              </b>
            </span>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardProduct;
